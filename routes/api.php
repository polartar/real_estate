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

    Route::post('auth', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken')->middleware('throttle');

});


// authenticated endpoints
Route::group(['middleware' => ['auth:api', 'cors']], function() {

    Route::get('user', function() {
        return response(Auth::user());
    });
});
