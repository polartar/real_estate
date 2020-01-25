<?php

namespace App\Rules;

use App\BedroomType;
use Illuminate\Contracts\Validation\Rule;

class BedroomTypeIDValidator implements Rule
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
        $bedroomType = BedroomType::find($value);

        return $bedroomType instanceof BedroomType;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid bedroom value';
    }
}
