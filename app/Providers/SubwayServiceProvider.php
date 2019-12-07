<?php

namespace App\Providers;

use App\Apartment;
use App\Subway;
use Illuminate\Support\ServiceProvider;

class SubwayServiceProvider extends ServiceProvider
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

    public static function assignFakedSubways(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        $num = random_int(0, 7);
        if (!$num) {
            return;
        }

        $subways = Subway::whereRaw('RAND()')->take($num)->get();

        $subways->each(function ($subway) use ($apartment) {
            $apartment->subways()->attach($subway);
        });
    }
}
