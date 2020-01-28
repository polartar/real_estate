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
            'owner_name' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'state' => ['string'],
            'zip' => ['string'],
            'cross_streets' => ['string'],
            'lat' => ['numeric'],
            'lng' => ['numeric'],
            'title' => ['string', 'max:255'],
            'description' => ['string', 'min:10'],
            'bedroom_type_id' => ['numeric', new BedroomTypeIDValidator],
            'bathrooms' => ['numeric'],
            'building_type_id' => ['numeric', new BuildingTypeIDValidator],
            'floor' => ['string'],
            'size' => ['numeric'],
            'subways' => [new SubwayIDValidator],
            'amenities' => [new AmenityIDValidator],
            'available_date' => ['date'],
            'block_dates' => [new BlockDatesInputValidator],
            'rates' => [new RatesInputValidator],
            'utility_cable' => ['numeric'],
            'utility_wifi' => ['numeric'],
            'utility_electricity' => ['numeric'],
            'utility_cleaning' => ['numeric'],
            'move_out_fee' => ['numeric'],
            'months_due_on_checkin' => ['numeric'],
            'days_due_on_checkin' => ['numeric'],
            'duci_advance_payment_days' => ['numeric'],
            'due_to_reserve' => [new ReservationFeeTypesValidator],
            'due_by_checkin' => [new ReservationFeeTypesValidator],
            'images_descriptions' => [new UnKeyedOptionalStringArray, new ImageDescriptionsValidator],
            'images' => [new UploadedImageInputValidator],
            'floor_plans' => [new UploadedImageInputValidator],
            'video_url' => ['string', new YoutubeURL],
            'is_active' => ['nullable', 'boolean']
        ];
    }
}
