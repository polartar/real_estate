<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Brick\Money\Money;
use Brick\Money\Context\CustomContext;

class Apt212ServiceProvider extends ServiceProvider
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

    public static function formatMoney($value, $precision = 0, $input_currency = 'USD', $output_format = 'en_US') {

        // use abs($value) to get a standard format we can prepend a `-` in front of for negative values
        // otherwise negative values are output in parenthesis, which they don't
        $formatted = Money::of(abs($value), $input_currency, new CustomContext($precision))->formatTo($output_format);

        if ($value < 0) {
            $formatted = '-' . $formatted;
        }

        return $formatted;
    }
}
