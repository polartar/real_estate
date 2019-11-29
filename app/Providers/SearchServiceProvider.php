<?php

namespace App\Providers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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
    public static function getNamedSearch($name) {
        $results = [];
        switch ($name) {
            case 'homePageInit':
                $results = [
                    'uniqueList' => \App\Apartment::inRandomOrder()->take(8)->get(),
                    'privateRoomList' => \App\Apartment::inRandomOrder()->take(8)->get(),
                    'luxuryList' => \App\Apartment::inRandomOrder()->take(8)->get()
                ];
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

        // $results = Cache::remember('search-' . $filter_hash, 600, function() {
        //     $num_results = random_int(0, 60);

        //     return [
        //         'results' => \App\Apartment::inRandomOrder()->take($num_results)->get(),
        //         'total' => $num_results,
        //     ];
        // });

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
    }

    /**
     *  Search for map markers within a bounding box
     *  that have apartments matching filters
     *
     */
    public static function searchMapMarkers($params) {

        $markers = \App\MapMarker::where('zoom', $params['zoom']);

        return $markers->get();
    }

    public static function applySearchFilters($apartments, $filters) {
        if ($filters['beds']) {
            $apartments->whereIn('bedroom_type_id', $filters['beds']);
        }

        if ($filters['bathrooms']) {
            $apartments->whereIn('bathrooms', $filters['bathrooms']);
        }

        if ($filters['price']) {
            $min = (int) $filters['price']['min'];
            $max = (int) $filters['price']['max'];
            $apartments->whereBetween('rate', [$min, $max]);
        }

        if ($filters['moveInDate']) {
            $apartments->where('available_date', '<=', $filters['moveInDate']);
        }

        if ($filters['buildingTypes']) {
            $apartments->whereIn('building_type_id', $filters['buildingTypes']);
        }

        if ($filters['location']) {
            $apartments->whereHas('neighborhoods', function($query) use ($filters) {
                $query->whereIn('neighborhoods.id', $filters['location']);
            });
        }

        return $apartments;
    }

    public static function applySorts($apartments, $filters) {
        switch ($filters['sortBy']) {
            case 'price_asc':
                $apartments->orderBy('rate', 'ASC');
            break;

            case 'price_desc':
                $apartments->orderBy('rate', 'DESC');
            break;

            case 'size_asc':
                // @TODO
            break;

            case 'size_desc':
                // @TODO
            break;

            case 'availability':
            default:
                $apartments->orderBy('available_date', 'ASC');
            break;
        }

        return $apartments;
    }

    public static function applyLimitOffsets($apartments, $filters) {
        return $apartments->take(40);
    }
}
