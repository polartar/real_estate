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

class StoreApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create', Apartment::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'owner_name' => ['required', 'string'],
            'address' => ['required', 'string'],
            'city' => ['required', 'string'],
            'state' => ['required', 'string'],
            'zip' => ['required', 'string'],
            'cross_streets' => ['required', 'string'],
            'lat' => ['required', 'numeric'],
            'lng' => ['required', 'numeric'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'bedroom_type_id' => ['required', 'numeric', new BedroomTypeIDValidator],
            'bathrooms' => ['required', 'numeric'],
            'building_type_id' => ['required', 'numeric', new BuildingTypeIDValidator],
            'floor' => ['nullable', 'string'],
            'size' => ['required', 'numeric'],
            'subways' => ['nullable', new SubwayIDValidator],
            'amenities' => ['nullable', new AmenityIDValidator],
            'available_date' => ['required', 'date'],
            'block_dates' => ['nullable', new BlockDatesInputValidator],
            'rates' => ['required', new RatesInputValidator],
            'utility_cable' => ['required', 'numeric'],
            'utility_wifi' => ['required', 'numeric'],
            'utility_electricity' => ['required', 'numeric'],
            'utility_cleaning' => ['required', 'numeric'],
            'move_out_fee' => ['required', 'numeric'],
            'months_due_on_checkin' => ['required', 'numeric'],
            'days_due_on_checkin' => ['required', 'numeric'],
            'doci_advance_payment_days' => ['required', 'numeric'],
            'due_to_reserve' => ['nullable', new ReservationFeeTypesValidator],
            'due_by_checkin' => ['nullable', new ReservationFeeTypesValidator],
            'images_descriptions' => ['nullable', new UnKeyedOptionalStringArray, new ImageDescriptionsValidator],
            'images' => ['required', new UploadedImageInputValidator],
            'floor_plans' => ['nullable', new UploadedImageInputValidator],
            'video_url' => ['nullable', 'string', new YoutubeURL]
        ];
    }

}
