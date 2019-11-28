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

    public static function search($filters) {
        $filter_hash = md5(json_encode($filters));

        // $results = Cache::remember('search-' . $filter_hash, 600, function() {
        //     $num_results = random_int(0, 60);

        //     return [
        //         'results' => \App\Apartment::inRandomOrder()->take($num_results)->get(),
        //         'total' => $num_results,
        //     ];
        // });

        // dd($filters);

        $apartments = \App\Apartment::where('is_active', 1);

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

        $r = $apartments->get();

        $results = [
            'results' => $r,
            'total' => $r->count()
        ];

        return $results;
    }

    public static function searchMarkers($filters) {
        $filter_hash = md5(json_encode($filters));


    }
}
