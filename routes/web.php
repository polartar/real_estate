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
    '/neighborhoods',
    '/neighborhood/{id}',
    '/faq',
    '/booking',
    '/privacy',

    '/private-rooms',
    '/corporate-rooms',
    '/about',
    '/referral',

    '/admin',
    '/admin/listings',
    '/admin/listing/add',
    '/admin/listing/edit/{id}',
    '/admin/owner-global',
    '/admin/referrals',
    '/admin/agents',
    '/admin/agent/add',
    '/admin/agent/edit{id}',
    '/admin/agent/{id}',
    '/admin/agent',

    '/404'
];

foreach ($front_end_routes as $route) {
    Route::get($route, 'SPAController@serve');
}
