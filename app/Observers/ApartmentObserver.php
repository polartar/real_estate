<?php

namespace App\Observers;

use App\Apartment;
use App\Providers\MapMarkerServiceProvider;
use App\Providers\NeighborhoodServiceProvider;

class ApartmentObserver
{
    /**
     * Handle the apartment "created" event.
     *
     * @param  \App\Apartment  $apartment
     * @return void
     */
    public function created(Apartment $apartment)
    {
        // find mapMarkers for each zoom level
        MapMarkerServiceProvider::assignMarkers($apartment);
        NeighborhoodServiceProvider::assignNeighborhoods($apartment);
    }

    /**
     * Handle the apartment "updated" event.
     *
     * @param  \App\Apartment  $apartment
     * @return void
     */
    public function updated(Apartment $apartment)
    {
        // lat/lng may have changed, reassign markers just in case
        MapMarkerServiceProvider::assignMarkers($apartment);
        NeighborhoodServiceProvider::assignNeighborhoods($apartment);
    }

    /**
     * Handle the apartment "deleted" event.
     *
     * @param  \App\Apartment  $apartment
     * @return void
     */
    public function deleted(Apartment $apartment)
    {
        //
    }

    /**
     * Handle the apartment "restored" event.
     *
     * @param  \App\Apartment  $apartment
     * @return void
     */
    public function restored(Apartment $apartment)
    {
        //
    }

    /**
     * Handle the apartment "force deleted" event.
     *
     * @param  \App\Apartment  $apartment
     * @return void
     */
    public function forceDeleted(Apartment $apartment)
    {
        //
    }
}
