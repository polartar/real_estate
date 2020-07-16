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

// route name => path
$front_end_routes = [
    '/' => '/',
    'booking' => '/booking',
    'private-rooms' => '/rooms-for-rent',
    'corporate-rooms' => '/corporate-housing',
    'search' => '/search-apartments',
    'listing' => '/listing/{id}/{neighborhood_slug?}/{slug?}',
    'wishlist' => '/wishlist',
    'neighborhoods' => '/nyc-neighborhoods',
    'neightborhood' => '/nyc-neighborhood/{id}',
    'faq' => '/faq',

    'privacy' => '/privacy-policy',
    'coming-soon' => '/coming-soon',


    'about' => '/about',
    'referral' => '/referral',

    'admin' => '/admin',
    'admin-listings' => '/admin/listings',
    'admin-add-listing' => '/admin/listing/add',
    'admin-edit-listing' => '/admin/listing/edit/{id}',
    'admin-owner-global' => '/admin/owner-global',
    'admin-referrals' => '/admin/referrals',
    'admin-agents' => '/admin/agents',
    'admin-agent-add' => '/admin/agent/add',
    'admin-agent-edit' => '/admin/agent/edit{id}',
    'admin-agent-view' => '/admin/agent/{id}',
    'admin-agent' => '/admin/agent',

    '404' => '/404'
];

/* Return 404s for the neighborhood pages that APT212 doesn't want to display */

Route::get('/nyc-neighborhood/civic-center', function(){
    return abort(404);
 });
Route::get('/nyc-neighborhood/fort-george', function(){
    return abort(404);
 });
Route::get('/nyc-neighborhood/hudson-heights', function(){
    return abort(404);
 });

foreach ($front_end_routes as $route) {
    Route::get($route, 'SPAController@serve');
}


