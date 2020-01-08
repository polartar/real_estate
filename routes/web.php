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


Route::get('/', 'SPAController@serve');
Route::get('/search', 'SPAController@serve');
Route::get('/listing/{id}', 'SPAController@serve');
Route::get('/wishlist', 'SPAController@serve');
Route::get('/404', 'SPAController@serve');

Route::get('/login', ['as' => 'login', 'uses' => 'SPAController@serve']);

Route::get('/profile/{name}', 'SPAController@serve');

Route::get('/api/pdf/booking-details/{apartment}', 'ApartmentController@getBookingDetailsPDF');
