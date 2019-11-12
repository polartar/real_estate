<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
                    'uniqueList' => factory(\App\Listing::class, 8)->make(['faked' => true]),
                    'privateRoomList' => factory(\App\Listing::class, 8)->make(['faked' => true]),
                    'luxuryList' => factory(\App\Listing::class, 8)->make(['faked' => true])
                ];
            break;
        }

        return $results;
    }
}
