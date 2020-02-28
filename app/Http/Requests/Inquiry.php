<?php

namespace App\Http\Requests;

use App\Rules\BedroomTypeIDValidator;
use Illuminate\Foundation\Http\FormRequest;

class Inquiry extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['required', 'email:rfc'],
            'message' => ['required', 'string'],
            'phone' => ['sometimes', 'string'],
            'arrival' => ['sometimes', 'date'],
            'departure' => ['sometimes', 'date'],
            'size' => ['sometimes', 'string'],
            'budget' => ['sometimes', 'string']
        ];
    }
}
