<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Apartment;
use App\MonthlyRate;

class MonthlyRateServiceProvider extends ServiceProvider
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

    public static function assignFakeRates(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        // set a different rate per quarter
        $rate_q1 = random_int(1000, 15000);
        $rate_q2 = random_int(1000, 15000);
        $rate_q3 = random_int(1000, 15000);
        $rate_q4 = random_int(1000, 15000);

        $months = range(1, 12);
        foreach($months as $month) {
            $rate = $rate_q4;
            if ($month < 10) {
                $rate = $rate_q3;
            }

            if ($month < 7) {
                $rate = $rate_q2;
            }

            if ($month < 4) {
                $rate = $rate_q1;
            }

            MonthlyRate::create([
                'apartment_id' => $apartment->id,
                'month' => $month,
                'rate' => $rate
            ]);
        }
    }
}
