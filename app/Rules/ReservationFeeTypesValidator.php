<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ReservationFeeTypesValidator implements Rule
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

        $allowed_values = ['background_check', 'security_deposit', 'service_fee', 'days_due_on_checkin', 'months_due_on_checkin'];

        foreach ($value as $v) {
            if (!in_array($v, $allowed_values)) {
                return false;
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
        return 'Invalid :attribute value';
    }
}
