<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RatesInputValidator implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        foreach ($value as $month => $rate) {
            if ($month === 'default') {
                $required = ['tax_percent', 'background_check_rate'];

                foreach ($required as $r) {
                    if (!is_numeric($rate[$r])) {
                        return false;
                    }

                    if ($rate[$r] < 0) {
                        return false;
                    }
                }

                continue;
            }


            $months = range(0, 11);
            if (!in_array((int) $month, $months)) {
                return false;
            }

            $required = ['monthly_rate', 'service_fee_host', 'service_fee_client', 'security_deposit_percent'];
            foreach ($required as $r) {
                if (!is_numeric($rate[$r])) {
                    return false;
                }

                if ($rate[$r] < 0) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Please fill out all rates, values must not be less than 0';
    }
}
