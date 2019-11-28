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

        $results = Cache::remember('search-' . $filter_hash, 600, function() {
            $num_results = random_int(0, 60);

            return [
                'results' => \App\Apartment::inRandomOrder()->take($num_results)->get(),
                'total' => $num_results,
            ];
        });

        return $results;
    }

    public static function searchMarkers($filters) {
        $filter_hash = md5(json_encode($filters));


    }
}
