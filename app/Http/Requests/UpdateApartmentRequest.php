<?php

namespace App\Http\Requests;

use App\Apartment;
use App\Rules\AmenityIDValidator;
use App\Rules\BedroomTypeIDValidator;
use App\Rules\BlockDatesInputValidator;
use App\Rules\BuildingTypeIDValidator;
use App\Rules\ImageDescriptionsValidator;
use App\Rules\RatesInputValidator;
use App\Rules\ReservationFeeTypesValidator;
use App\Rules\SubwayIDValidator;
use App\Rules\UnKeyedOptionalStringArray;
use App\Rules\UploadedImageInputValidator;
use App\Rules\YoutubeURL;
use Illuminate\Foundation\Http\FormRequest;

class UpdateApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update', Apartment::withoutGlobalScope('active')->find($this->route('apartment_id')));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'owner_name' => ['sometimes', 'required', 'string'],
            'address' => ['sometimes', 'required', 'string'],
            'city' => ['sometimes', 'required', 'string'],
            'state' => ['sometimes', 'required', 'string'],
            'zip' => ['sometimes', 'required', 'string'],
            'cross_streets' => ['sometimes', 'required', 'string'],
            'lat' => ['sometimes', 'required', 'numeric'],
            'lng' => ['sometimes', 'required', 'numeric'],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string', 'min:10'],
            'bedroom_type_id' => ['sometimes', 'numeric', new BedroomTypeIDValidator],
            'bathrooms' => ['sometimes', 'numeric'],
            'building_type_id' => ['sometimes', 'required', 'numeric', new BuildingTypeIDValidator],
            'floor' => ['sometimes', 'string'],
            'size' => ['sometimes', 'numeric'],
            'subways' => ['sometimes', new SubwayIDValidator],
            'amenities' => ['sometimes', new AmenityIDValidator],
            'available_date' => ['sometimes', 'required', 'date'],
            'block_dates' => ['sometimes', new BlockDatesInputValidator],
            'rates' => ['sometimes', new RatesInputValidator],
            'utility_cable' => ['sometimes', 'required', 'numeric'],
            'utility_wifi' => ['sometimes', 'required', 'numeric'],
            'utility_electricity' => ['sometimes', 'required', 'numeric'],
            'utility_cleaning' => ['sometimes', 'required', 'numeric'],
            'move_out_fee' => ['sometimes', 'required', 'numeric'],
            'months_due_on_checkin' => ['sometimes', 'required', 'numeric'],
            'days_due_on_checkin' => ['sometimes', 'required', 'numeric'],
            'doci_advance_payment_days' => ['sometimes', 'required', 'numeric'],
            'due_to_reserve' => ['sometimes', new ReservationFeeTypesValidator],
            'due_by_checkin' => ['sometimes', new ReservationFeeTypesValidator],
            'images_descriptions' => ['sometimes', new UnKeyedOptionalStringArray, new ImageDescriptionsValidator],
            'images' => ['sometimes', new UploadedImageInputValidator],
            'floor_plans' => ['sometimes', new UploadedImageInputValidator],
            'video_url' => ['sometimes', 'string', new YoutubeURL],
            'is_active' => ['sometimes', 'nullable', 'boolean'],
            'feature_1' => ['sometimes', 'nullable', 'boolean'],
            'feature_2' => ['sometimes', 'nullable', 'boolean'],
            'feature_3' => ['sometimes', 'nullable', 'boolean']
        ];
    }
}
