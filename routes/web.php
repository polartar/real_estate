<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', ['as' => 'login', 'uses' => 'SPAController@serve']);

Route::get('/api/pdf/booking-details/{apartment}', 'ApartmentController@getBookingDetailsPDF');

$front_end_routes = [
    '/',
    '/search',
    '/listing/{id}',
    '/wishlist',
    '/404',
    '/private-rooms',

    '/admin',
    '/admin/listings',
    '/admin/listing/add',
    '/admin/listing/edit/{id}',
    '/admin/owner-global',

    '/neighborhoods',
    '/neighborhood/{id}'
];

foreach ($front_end_routes as $route) {
    Route::get($route, 'SPAController@serve');
}