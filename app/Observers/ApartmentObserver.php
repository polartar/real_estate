<?php

namespace App\Observers;

use App\Apartment;
use App\Providers\AmenitiesServiceProvider;
use App\Providers\MapMarkerServiceProvider;
use App\Providers\NeighborhoodServiceProvider;
use App\Providers\ApartmentServiceProvider;

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

        // assign stuff for faked apartments
        ApartmentServiceProvider::assignFakedSubways($apartment);
        ApartmentServiceProvider::assignFakedAmenities($apartment);
        ApartmentServiceProvider::assignFakeRates($apartment);
        ApartmentServiceProvider::assignFakedImages($apartment);
        ApartmentServiceProvider::assignFakedBlockDates($apartment);
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
        $original_lat = $apartment->getOriginal('lat');
        $original_lng = $apartment->getOriginal('lng');

        if ($apartment->lat !== $original_lat || $apartment->lng !== $original_lng) {
            MapMarkerServiceProvider::assignMarkers($apartment);
            NeighborhoodServiceProvider::assignNeighborhoods($apartment);
        }
    }

    /**
     * Handle the apartment "saving" event.
     * @param \App\Apartment $apartment
     * @return void
     */
    public function saving(Apartment $apartment)
    {

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
