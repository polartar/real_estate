<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class BlockDatesInputValidator implements Rule
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

        if (!isset($value['start']) || !isset($value['end'])) {
            return false;
        }

        if (!is_array($value['start']) || !is_array($value['end'])) {
            return false;
        }

        if (count($value['start']) !== count($value['end'])) {
            return false;
        }

        foreach ($value['start'] as $key => $date) {
            if (strtotime($date) === false) {
                return false;
            }

            if (strtotime($value['end'][$key]) === false)  {
                return false;
            }

            if (strtotime($date) > strtotime($value['end'][$key])) {
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
        return 'Invalid blocked dates input';
    }
}
