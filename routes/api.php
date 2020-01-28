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

    // Neighborhoods
    Route::get('neighborhoods/fromPoint/{lng}/{lat}', 'NeighborhoodsController@neighborhoodsFromPoint');
});


// authenticated endpoints
Route::group(['middleware' => ['auth:api', 'cors']], function() {

    // Auth
    Route::post('logout', 'SPAAuthController@logout');
    Route::get('user', function() {
        return response(Auth::user());
    });

    // Apartments
    Route::patch('apartments/{apartment_id}', 'ApartmentController@update');
    Route::delete('apartments/{apartment_id}', 'ApartmentController@destroy');
    Route::post('apartments', 'ApartmentController@store');
    Route::get('admin/dashboard_counts', 'AdminController@dashboardCounts');
    Route::get('admin/listings', 'AdminController@listings');

    // image uploads
    Route::post('image-upload', 'FileUploadController@uploadImage');
    Route::delete('image-upload/{image}', 'FileUploadController@deleteImage');

    // Misc
    Route::get('neighborhoods/geocode/{address}', 'NeighborhoodsController@geocodeAddress');
});
