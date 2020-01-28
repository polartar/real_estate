<?php

namespace App\Rules;

use App\ImageUpload;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ImageDescriptionsValidator implements Rule
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
        $id_attr = explode('_descriptions', $attribute)[0];
        $ids = request()->{$id_attr};

        if (!is_array($ids)) {
            return false;
        }

        foreach ($ids as $key => $id) {
            $img = ImageUpload::find($id);
            if (!$img) {
                return false;
            }

            if (Auth::user()->cant('update', $img)) {
                return false;
            }

            if (!is_string($value[$key])) {
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
        return 'You do not have permission to update these image descriptions';
    }
}
