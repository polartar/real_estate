<?php

namespace App\Providers;

use App\Neighborhood;
use Illuminate\Support\ServiceProvider;

class NeighborhoodServiceProvider extends ServiceProvider
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
     * Assigns markers for each zoom level to an apartment
     * Creates markers at the apartment location if none are in range
     */
    public static function assignNeighborhoods($apartment) {
        // remove any existing neighborhoods
        $apartment->neighborhoods()->detach();

        $neighborhoods = Neighborhood::all();

        foreach ($neighborhoods as $neighborhood) {
            if ($neighborhood->containsPoint($apartment->lng, $apartment->lat)) {
                $apartment->neighborhoods()->attach($neighborhood);
            }
        }
    }
}
