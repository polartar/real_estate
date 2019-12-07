<?php

namespace App\Providers;

use App\Amenity;
use App\Apartment;
use Illuminate\Support\ServiceProvider;

class AmenitiesServiceProvider extends ServiceProvider
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

    public static function assignFakedAmenities(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        $num = random_int(0, 15);
        if (!$num) {
            return;
        }

        $amenities = Amenity::inRandomOrder()->take($num)->get();

        $amenities->each(function ($amenity) use ($apartment) {
            $apartment->amenities()->attach($amenity);
        });
    }
}
