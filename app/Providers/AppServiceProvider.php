<?php

namespace App\Providers;

use App\Apartment;
use App\ImageUpload;
use App\Observers\ApartmentObserver;
use App\Observers\ImageUploadObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Apartment::observe(ApartmentObserver::class);
        ImageUpload::observe(ImageUploadObserver::class);
    }
}
