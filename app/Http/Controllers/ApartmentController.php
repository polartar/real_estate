<?php

namespace App\Http\Controllers;

use App\Apartment;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function show(Apartment $apartment)
    {
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
