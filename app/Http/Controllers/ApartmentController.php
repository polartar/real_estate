<?php

namespace App\Http\Controllers;

use App\Apartment;
use App\Http\Requests\StoreApartmentRequest;
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

        return $apt;
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
    public function update(Request $request, Apartment $apartment)
    {
        //
        dd($apartment);
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
