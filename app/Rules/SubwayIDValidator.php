<?php

namespace App\Rules;

use App\Subway;
use Illuminate\Contracts\Validation\Rule;

class SubwayIDValidator implements Rule
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
            $value = (array) $value;
        }

        $result = true;
        foreach ($value as $id) {
            $subway = Subway::find($id);

            if (!$subway instanceof Subway) {
                $result = false;
            }
        }

        return $result;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid Subway value';
    }
}
