<?php

namespace App\Rules;

use App\ImageUpload;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UploadedImageInputValidator implements Rule
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

        foreach ($value as $id) {
            $upload = ImageUpload::find($id);
            if (!$upload instanceof ImageUpload) {
                return false;
            }

            if (Auth::user()->cant('update', $upload)) {
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
        return 'Invalid uploaded image';
    }
}
