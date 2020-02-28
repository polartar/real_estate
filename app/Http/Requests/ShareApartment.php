<?php

namespace App\Http\Requests;

use App\Rules\ApartmentIDValidator;
use Illuminate\Foundation\Http\FormRequest;

class ShareApartment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email:rfc'],
            'message' => ['sometimes', 'string'],
            'ids' => ['required', new ApartmentIDValidator],
            'urls.*' => ['required', 'string']
        ];
    }
}
