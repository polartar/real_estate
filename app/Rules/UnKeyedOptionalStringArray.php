<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class UnKeyedOptionalStringArray implements Rule
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
        // value must be an array of string | null

        if (!is_array($value)) {
            return false;
        }

        foreach ($value as $v) {
            if ($v === null) {
                continue;
            }

            if (!is_string($v)) {
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
        return 'The :attribute entries must be strings';
    }
}
