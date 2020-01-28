<?php

namespace App\Http\Controllers;

use App\Apartment;
use App\BlockDates;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use App\ImageUpload;
use App\Providers\ApartmentServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use PDF;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApartmentRequest $request)
    {
        $data = $request->validated();

        $apt_data = Apartment::extractAptAttributes($data);
        $apt_data['user_id'] = Auth::user()->id;

        $apt = Apartment::create($apt_data);

        // attach images/floor_plans
        if (isset($data['images'])) {
            ApartmentServiceProvider::claimImages($apt, $data['images'], 'images');

            // update any image descriptions
            foreach ($data['images'] as $key => $id) {
                $img = ImageUpload::find($id);
                if ($img && isset($data['images_descriptions'][$key])) {
                    $img->description = $data['images_descriptions'][$key];
                    $img->save();
                }
            }
        }

        if (isset($data['floor_plans'])) {
            ApartmentServiceProvider::claimImages($apt, $data['floor_plans'], 'floor_plans');
        }

        $apt->setRates($data['rates']);

        // add any block_dates
        if (isset($data['block_dates'])) {
            foreach ($data['block_dates']['start'] as $key => $date) {
                BlockDates::create([
                    'apartment_id' => $apt->id,
                    'start' => date('Y-m-j', strtotime($date)),
                    'end' => date('Y-m-j', strtotime($data['block_dates']['end'][$key]))
                ]);
            }
        }

        // sync taxonomy
        if (isset($data['subways'])) {
            $apt->subways()->sync($data['subways']);
        }

        if (isset($data['amenities'])) {
            $apt->amenities()->sync($data['amenities']);
        }

        return $apt->fresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $apartment = Apartment::withoutGlobalScope('active')->findOrFail($id);

        $this->authorize('view', $apartment);

        return $apartment;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApartmentRequest $request, $apartment_id)
    {
        //
        $data = $request->validated();
        $apt_data = Apartment::extractAptAttributes($data);

        $apt = Apartment::withoutGlobalScope('active')->find($apartment_id);
        $apt->update($apt_data);

        // attach images/floor_plans
        if (isset($data['images'])) {
            ApartmentServiceProvider::claimImages($apt, $data['images'], 'images');

            // update any image descriptions
            foreach ($data['images'] as $key => $id) {
                $img = ImageUpload::find($id);
                if ($img && isset($data['images_descriptions'][$key])) {
                    $img->description = $data['images_descriptions'][$key];
                    $img->save();
                }
            }
        }

        if (isset($data['floor_plans'])) {
            ApartmentServiceProvider::claimImages($apt, $data['floor_plans'], 'floor_plans');
        }

        if (isset($data['rates'])) {
            $apt->setRates($data['rates']);
        }

        // add any block_dates
        if ($request->block_dates_update) {

            // delete all existing
            $apt->block_dates()->delete();

            if (isset($data['block_dates'])) {
                foreach ($data['block_dates']['start'] as $key => $date) {
                    BlockDates::create([
                        'apartment_id' => $apt->id,
                        'start' => date('Y-m-j', strtotime($date)),
                        'end' => date('Y-m-j', strtotime($data['block_dates']['end'][$key]))
                    ]);
                }
            }
        }

        // sync taxonomy
        if (isset($data['subways'])) {
            $apt->subways()->sync($data['subways']);
        }

        if (isset($data['amenities'])) {
            $apt->amenities()->sync($data['amenities']);
        }

        return $apt->fresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Apartment $apartment)
    {
        //
    }

    public function getList() {
        $ids = request()->ids;

        return Apartment::find($ids);
    }

    /**
     * Get a pdf of the booking details
     */
    public function getBookingDetailsPDF(Apartment $apartment) {

        $pdf = PDF::loadView('pdfs.booking-details', [
            'checkin' => request()->checkin,
            'checkout' => request()->checkout,
            'guests' => request()->guests,
            'apartment' => $apartment
        ]);

        return $pdf->download('booking-details-' . $apartment->id . '.pdf');

        // return view('pdfs.booking-details', [
        //     'checkin' => request()->checkin,
        //     'checkout' => request()->checkout,
        //     'guests' => request()->guests,
        //     'apartment' => $apartment
        // ]);
    }
}
