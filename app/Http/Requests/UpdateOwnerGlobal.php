<?php

namespace App\Http\Requests;

use App\Rules\PartialRatesValidator;
use App\Rules\ReservationFeeTypesValidator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOwnerGlobal extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rates' => ['sometimes', new PartialRatesValidator],
            'utility_cable' => ['sometimes', 'numeric'],
            'utility_wifi' => ['sometimes', 'numeric'],
            'utility_electricity' => ['sometimes', 'numeric'],
            'utility_cleaning' => ['sometimes', 'numeric'],
            'move_out_fee' => ['sometimes', 'numeric'],
            'months_due_on_checkin' => ['sometimes', 'numeric'],
            'days_due_on_checkin' => ['sometimes', 'numeric'],
            'doci_advance_payment_days' => ['sometimes', 'numeric'],
            'due_to_reserve' => ['sometimes', new ReservationFeeTypesValidator],
            'due_by_checkin' => ['sometimes', new ReservationFeeTypesValidator],
        ];
    }
}
