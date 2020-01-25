<?php

namespace App\Rules;

use App\BuildingType;
use Illuminate\Contracts\Validation\Rule;

class BuildingTypeIDValidator implements Rule
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
        $buildingType = BuildingType::find($value);

        return $buildingType instanceof BuildingType;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid Building Type';
    }
}
