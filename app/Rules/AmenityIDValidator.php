<?php

namespace App\Rules;

use App\Amenity;
use Illuminate\Contracts\Validation\Rule;

class AmenityIDValidator implements Rule
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
            $amenity = Amenity::find($id);

            if (!$amenity instanceof Amenity) {
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
        return 'Invalid amenities value';
    }
}
