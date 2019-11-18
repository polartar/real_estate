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
                    'uniqueList' => factory(\App\Apartment::class, 8)->make(['faked' => true]),
                    'privateRoomList' => factory(\App\Apartment::class, 8)->make(['faked' => true]),
                    'luxuryList' => factory(\App\Apartment::class, 8)->make(['faked' => true])
                ];
            break;
        }

        return $results;
    }

    public static function search($filters) {
        $filter_hash = md5(json_encode($filters));

        $results = Cache::remember('search-' . $filter_hash, 600, function() {
            $num_results = random_int(0, 60);

            $faked = factory(\App\Apartment::class, $num_results)->make(['faked' => true]);
            $id = 0;
            foreach ($faked as $k => $v) {
                $faked[$k]['id'] = $id++;
            }

            return [
                'results' => $faked,
                'total' => $num_results
            ];
        });

        return $results;
    }
}
