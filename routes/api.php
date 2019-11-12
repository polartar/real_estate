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
Route::group(['middleware' => ['api', 'cors']], function () {

    Route::post('auth', 'SPAAuthController@login')->middleware('throttle');

    Route::get('taxonomy', 'NeighborhoodsController@taxonomy');

    Route::get('search/named/{name}', 'SearchController@named');

});


// authenticated endpoints
Route::group(['middleware' => ['auth:api', 'cors']], function() {

    Route::post('logout', 'SPAAuthController@logout');

    Route::get('user', function() {
        return response(Auth::user());
    });
});
