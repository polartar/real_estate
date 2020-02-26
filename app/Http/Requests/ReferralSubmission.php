<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReferralSubmission extends FormRequest
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
            'referrer_name' => ['required', 'string'],
            'referrer_email' => ['required', 'email:rfc'],
            'referrer_phone' => ['sometimes', 'string'],
            'referral_name' => ['required', 'string'],
            'referral_email' => ['required', 'email:rfc'],
            'referral_phone' => ['sometimes', 'string']
        ];
    }
}