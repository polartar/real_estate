<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// unauthenticated endpoints
Route::group(['middleware' => ['api', 'cors', 'apiUser']], function () {

    Route::post('auth', 'SPAAuthController@login')->middleware('throttle');

    Route::get('taxonomy', 'TaxonomyController@taxonomy');

    // Searches
    Route::get('search', 'SearchController@search');
    Route::get('search/named/{name}', 'SearchController@named');
    Route::get('search/map_markers', 'SearchController@mapMarkers');

    // Apartments
    Route::get('apartments/list', 'ApartmentController@getList');
    Route::get('apartments/{apartment}', 'ApartmentController@show');
    Route::get('apartments/booking_details/{apartment}', 'ApartmentController@bookingDetails');

    // Neighborhoods
    Route::get('neighborhoods/fromPoint/{lng}/{lat}', 'NeighborhoodsController@neighborhoodsFromPoint');

    Route::get('booking/payment_intent', 'BookingController@paymentIntent');
    Route::post('booking/checkout_ach', 'BookingController@checkoutACH');
    Route::post('booking/stripe_webhook', 'BookingController@stripeWebhook');
    Route::post('booking/referral', 'BookingController@referral');
    Route::post('booking/share_apartment', 'BookingController@shareApartment');
    Route::post('booking/check_password', 'BookingController@checkPassword');
    Route::post('booking/inquiry', 'BookingController@inquiry');
    // Route::get('booking/preview_mail', 'BookingController@previewMail');

    // Agents
    Route::get('admin/agents', 'AdminController@agents');
});


// authenticated endpoints
Route::group(['middleware' => ['cors', 'auth:api']], function() {

    // Auth
    Route::post('logout', 'SPAAuthController@logout');
    Route::get('user', function() {
        return response(Auth::user());
    });

    // Apartments
    Route::patch('apartments/{apartment_id}', 'ApartmentController@update');
    Route::delete('apartments/{apartment_id}', 'ApartmentController@destroy');
    Route::post('apartments', 'ApartmentController@store');

    // Admin
    Route::get('admin/dashboard_counts', 'AdminController@dashboardCounts');
    Route::get('admin/listings', 'AdminController@listings');
    Route::get('admin/apt-owners', 'AdminController@aptOwners');
    Route::get('admin/referrals', 'AdminController@referrals');
    Route::delete('admin/referral/{referral}', 'AdminController@deleteReferral');
    
    Route::get('admin/agent/{id}', 'AdminController@showAgent');
    Route::patch('admin/agent/{id}', 'AdminController@updateAgent');
    Route::post('admin/agent', 'AdminController@storeAgent');
    Route::delete('admin/agents/{agent}', 'AdminController@deleteAgent');

    Route::get('admin/owner-global/{owner_name}', 'AdminController@ownerStats');
    Route::post('admin/owner-global/{owner_name}', 'AdminController@ownerGlobal');

    // image uploads
    Route::post('image-upload', 'FileUploadController@uploadImage');
    Route::delete('image-upload/{image}', 'FileUploadController@deleteImage');

    // Misc
    Route::get('neighborhoods/geocode/{address}', 'NeighborhoodsController@geocodeAddress');

    Route::post('admin/booking/set_password', 'BookingController@setPassword');
});

Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found'], 404);
});
