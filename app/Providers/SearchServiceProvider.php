<?php

namespace App\Providers;

use App\Apartment;
use App\Neighborhood;
use App\FAQ;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SearchServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Get pre-defined search results for things like
     * sliders/lists
     */
    public static function getNamedSearch($name, $params) {
        $results = [];
        switch ($name) {
            case 'homePageInit':
                $results = Cache::remember('search-homePageInit', 600, function() {
                    return [
                        'uniqueList' => \App\Apartment::where('feature_1', true)->inRandomOrder()->take(8)->get(),
                        'privateRoomList' => \App\Apartment::where('feature_2', true)->inRandomOrder()->take(8)->get(),
                        'luxuryList' => \App\Apartment::where('feature_3', true)->inRandomOrder()->take(8)->get(),
                    ];
                });
            break;

            case 'apartmentsByNeighborhood':
                $results = Cache::remember('search-apartmentsByNeighborhood-' . $params['id'], 600, function() use ($params) {
                    $neighborhood = Neighborhood::findOrFail($params['id']);
                    return $neighborhood->apartments()->take(16)->get();
                });
            break;

            case 'nearbyApts':
                $results = Cache::remember('search-nearbyApts-' . $params['id'], 600, function() use ($params) {
                    $apt = Apartment::findOrFail($params['id']);

                    /**
                     * For true geospatial search
                     */
                    // $distance = 5;

                    // // to use km use 6371 instead of 3959
                    // $nearbyApts = Apartment::select()->addSelect(\DB::raw('( 3959 * acos( cos( radians(' . $apt->lat . ') )
                    //     * cos( radians( apartments.lat ) )
                    //     * cos( radians( apartments.lng ) - radians(' . $apt->lng . ') )
                    //     + sin( radians(' . $apt->lat . ') )
                    //     * sin( radians( apartments.lat ) ) ) ) AS distance'))
                    // ->having('distance', '<', $distance)
                    // ->orderBy('distance', 'ASC')
                    // ->take(4)
                    // ->get();

                    // same bedroom count
                    // same neighborhoods
                    // available within 30 days of listing available date
                    $nearbyApts = Apartment::where('bedroom_type_id', $apt->bedroom_type_id)
                                    ->where(function(Builder $query) use ($apt) {
                                        // date within 30 days
                                        // so 30 days in past or future
                                        // but if available date is already in the past, then it can be any time in the past
                                        $now = Carbon::now();
                                        $now->addDays(30);
                                        $available = new Carbon($apt->available_date);
                                        $upper_limit = $available->copy()->addDays(30);
                                        $lower_limit = $available->copy()->subDays(30);

                                        if ($now->greaterThanOrEqualTo($available)) {
                                            // any available date in the past is fine
                                            $query->where('available_date', '<', $upper_limit);
                                        }
                                        else {
                                            $query->whereBetween('available_date', [$lower_limit, $upper_limit]);
                                        }

                                    })
                                    ->whereHas('neighborhoods', function(Builder $query) use ($apt) {
                                        $query->whereIn('id', $apt->neighborhood_ids);
                                    })
                                    ->take(4)
                                    ->get();

                    return $nearbyApts;
                });
            break;

            case 'FAQPageInit':
                $results = Cache::remember('search-FAQPageInit', 600, function() {
                    $faq = FAQ::All();
                    return $faq;
                });
            break;

        }

        return $results;
    }


    /**
     *  Main search builder for apartments
     *
     *  @param $filters - an array of filters
     *
     */
    public static function search($filters) {
        $filter_hash = md5(json_encode($filters));

        return Cache::remember('search-' . $filter_hash, 600, function() use ($filters) {
            $apartments = \App\Apartment::where('is_active', 1);

            $apartments = self::applySearchFilters($apartments, $filters);

            $count = $apartments->count();

            $apartments = self::applySorts($apartments, $filters);
            $apartments = self::applyLimitOffsets($apartments, $filters);

            $results = [
                'results' => $apartments->get(),
                'total' => $count
            ];

            return $results;
        });
    }

    /**
     * Search listings both active and inactive
     */
    public static function adminSearch($filters) {
        $filter_hash = md5(json_encode($filters));

        // return Cache::remember('search-' . $filter_hash, 600, function() use ($filters) {

            // here's the important part
            $apartments = \App\Apartment::withoutGlobalScope('active');

            $apartments = self::applySearchFilters($apartments, $filters);

            $count = $apartments->count();

            $apartments = self::applySorts($apartments, $filters);
            $apartments = self::applyLimitOffsets($apartments, $filters);

            $results = [
                'results' => $apartments->get(),
                'total' => $count
            ];

            return $results;
        //});
    }

    /**
     *  Search for map markers within a bounding box
     *  that have apartments matching filters
     *
     */
    public static function searchMapMarkers($params) {
        $params_hash = md5(json_encode($params));

        return Cache::remember('markers-' . $params_hash, 600, function() use ($params) {
            $minlat = $params['bounds']['_sw']['lat'];
            $minlng = $params['bounds']['_sw']['lng'];
            $maxlat = $params['bounds']['_ne']['lat'];
            $maxlng = $params['bounds']['_ne']['lng'];

            $markers = \App\MapMarker::select()
                        ->withCount(['apartments' => function($query) use ($params) {
                            self::applySearchFilters($query, $params['filters']);
                        }])
                        ->where('zoom', $params['zoom'])
                        ->whereBetween('lat', [$minlat, $maxlat])
                        ->whereBetween('lng', [$minlng, $maxlng])
                        ->having('apartments_count', '>', 0)
                        ->get();


            $markers->map(function($m) use ($params) {

                if ($m->apartments_count === 1 || $params['zoom'] == 5) {
                    $apts = $m->apartments()->where(function($query) use ($params) {
                        self::applySearchFilters($query, $params['filters']);
                    })->get();

                    $m->apartments = $apts;

                    $m->max_rate = $apts->reduce(function($carry, $item) {
                        return max($carry, $item->rate);
                    }, 0);

                    $m->min_rate = $apts->reduce(function($carry, $item) {
                        if ($carry === null) {
                            return $item->rate;
                        }

                        return min($carry, $item->rate);
                    }, null);
                }
                else {
                    $max = $m->apartments()->where(function($query) use ($params) {
                        self::applySearchFilters($query, $params['filters']);
                    })
                    ->orderBy('rate', 'DESC')
                    ->take(1)->get()->get(0);

                    $min = $m->apartments()->where(function($query) use ($params) {
                        self::applySearchFilters($query, $params['filters']);
                    })
                    ->orderBy('rate', 'ASC')
                    ->take(1)->get()->get(0);

                    $m->max_rate = $max->rate;
                    $m->min_rate = $min->rate;
                }

                return $m;
            });

            return $markers;
        });
    }

    public static function applySearchFilters($apartments, $filters) {
        if (isset($filters['beds']) && $filters['beds']) {
            $apartments->whereIn('bedroom_type_id', $filters['beds']);
        }

        if (isset($filters['bathrooms']) && $filters['bathrooms']) {
            $apartments->whereIn('bathrooms', $filters['bathrooms']);
        }

        if (isset($filters['price']) && $filters['price']) {
            $min = (int) $filters['price']['min'];
            $max = (int) $filters['price']['max'];
            $apartments->whereBetween('rate', [$min, $max]);
        }

        if (isset($filters['moveInDate']) && $filters['moveInDate']) {
            $apartments->where('available_date', '<=', $filters['moveInDate']);
        }

        if (isset($filters['buildingTypes']) && $filters['buildingTypes']) {
            $apartments->whereIn('building_type_id', $filters['buildingTypes']);
        }

        if (isset($filters['location']) && $filters['location']) {
            $apartments->whereHas('neighborhoods', function($query) use ($filters) {
                $query->whereIn('neighborhoods.id', $filters['location']);
            });
        }

        if (isset($filters['text']) && $filters['text']) {
            $apartments->where(function($query) use ($filters) {
                $query->where('id', '=', $filters['text'])
                    ->orWhere('address', 'LIKE', '%' . $filters['text'] . '%')
                    ->orWhere('cross_streets', 'LIKE', '%' . $filters['text'] . '%')
                    ->orWhere('title', 'LIKE', '%' . $filters['text'] . '%')
                    ->orWhere('description', 'LIKE', '%' . $filters['text'] . '%');
            });
        }

        if (isset($filters['search_type']) && $filters['search_type'] && isset($filters['search_query']) && $filters['search_query']) {
            $apartments->where(function($query) use ($filters) {
                switch ($filters['search_type']) {
                    case 'webid':
                        $query->where('id', '=', $filters['search_query']);
                    break;
                    case 'owner':
                        $query->where('owner_name', 'LIKE', '%' . $filters['search_query'] . '%');
                    break;
                    case 'address':
                        $query->where('address', 'LIKE', '%' . $filters['search_query'] . '%');
                    break;
                }
            });
        }

        // note - only effective if withoutGlobalScope('active') was used as in admin search
        if (isset($filters['active']) && $filters['active']) {
            switch ($filters['active']) {
                case 'active':
                    $apartments->where('is_active', true);
                break;
                case 'inactive':
                    $apartments->where('is_active', false);
                break;
            }
        }

        return $apartments;
    }

    public static function applySorts($apartments, $filters) {
        if (!isset($filters['sortBy'])) {
            return $apartments;
        }

        switch ($filters['sortBy']) {
            case 'price_asc':
                $apartments->orderBy('rate', 'ASC');
            break;

            case 'price_desc':
                $apartments->orderBy('rate', 'DESC');
            break;

            case 'size_asc':
                $apartments->orderBy('size', 'ASC');
            break;

            case 'size_desc':
                $apartments->orderBy('size', 'DESC');
            break;

            case 'webid_asc':
                $apartments->orderBy('id', 'ASC');
            break;

            case 'webid_desc':
                $apartments->orderBy('id', 'DESC');
            break;

            case 'last_updated_asc':
                $apartments->orderBy('updated_at', 'ASC');
            break;

            case 'last_updated_desc':
                $apartments->orderBy('updated_at', 'DESC');
            break;

            case 'owner_asc':
                $apartments->orderBy('owner_name', 'ASC');
            break;

            case 'owner_desc':
                $apartments->orderBy('owner_name', 'DESC');
            break;

            case 'bathrooms_asc':
                $apartments->orderBy('bathrooms', 'ASC');
            break;

            case 'bathrooms_desc':
                $apartments->orderBy('bathrooms', 'DESC');
            break;

            // @TODO - is there a better way to sort these relationships?
            case 'bedrooms_asc':
                $apartments->select('apartments.*', DB::raw('(SELECT rooms_count from bedroom_types where bedroom_types.id = apartments.bedroom_type_id) as sort'))->orderBy('sort', 'ASC');
            break;

            case 'bedrooms_desc':
                $apartments->select('apartments.*', DB::raw('(SELECT rooms_count from bedroom_types where bedroom_types.id = apartments.bedroom_type_id) as sort'))->orderBy('sort', 'DESC');
            break;

            case 'price_month_asc':
                $month = (int) $filters['price_month'];
                $apartments->select('apartments.*', DB::raw('(SELECT monthly_rate from monthly_rates where monthly_rates.apartment_id = apartments.id and monthly_rates.month = \'' . $month . '\' limit 1) as sort'))->orderBy('sort', 'ASC');
            break;

            case 'price_month_desc':
                $month = (int) $filters['price_month'];
                $apartments->select('apartments.*', DB::raw('(SELECT monthly_rate from monthly_rates where monthly_rates.apartment_id = apartments.id and monthly_rates.month = \'' . $month . '\') as sort'))->orderBy('sort', 'DESC');
            break;

            case 'availability_desc':
                $apartments->orderBy('available_date', 'DESC');
            break;

            case 'availability':
            case 'availability_asc':
            default:
                $apartments->orderBy('available_date', 'ASC');
            break;
        }

        return $apartments;
    }

    public static function applyLimitOffsets($apartments, $filters) {
        $offset = isset($filters['offset']) ? (int) $filters['offset'] : 0;
        $limit = isset($filters['limit']) ? (int) $filters['limit'] : 20;

        return $apartments->skip($offset)->take($limit);
    }
}
