<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PartialRatesValidator implements Rule
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
        if (!is_array($value)) {
            return false;
        }

        $allowed_keys = ['tax_percent', 'background_check_rate', 'monthly_rate', 'service_fee_host', 'service_fee_client', 'security_deposit_percent'];
        $allowed_months = array_merge(['default'], range(0, 11));

        foreach ($value as $month => $rate) {
            if (!in_array($month, $allowed_months)) {
                return false;
            }

            if (!is_array($rate) && !is_null($rate)) {
                return false;
            }

            if (is_array($rate)) {
                foreach ($rate as $key => $val) {
                    if (!in_array($key, $allowed_keys)) {
                        return false;
                    }

                    if (!is_numeric($val)) {
                        return false;
                    }

                    if ($val < 0) {
                        return false;
                    }
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
        return 'Invalid rates value, values must be numeric and not less than 0';
    }
}
