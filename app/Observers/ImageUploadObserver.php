<?php

namespace App\Observers;

use App\ImageUpload;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageUploadObserver
{
    /**
     * Handle the image upload "created" event.
     *
     * @param  \App\ImageUpload  $imageUpload
     * @return void
     */
    public function created(ImageUpload $imageUpload)
    {
        //
    }

    /**
     * Handle the image upload "updated" event.
     *
     * @param  \App\ImageUpload  $imageUpload
     * @return void
     */
    public function updated(ImageUpload $imageUpload)
    {
        //
    }

    /**
     * Handle the image upload "deleted" event.
     *
     * @param  \App\ImageUpload  $imageUpload
     * @return void
     */
    public function deleted(ImageUpload $imageUpload)
    {
        // clear out files
        Storage::delete($imageUpload->size_original);
        Storage::delete($imageUpload->size_large);
        Storage::delete($imageUpload->size_medium);
        Storage::delete($imageUpload->size_small);
    }

    /**
     * Handle the image upload "restored" event.
     *
     * @param  \App\ImageUpload  $imageUpload
     * @return void
     */
    public function restored(ImageUpload $imageUpload)
    {
        //
    }

    /**
     * Handle the image upload "force deleted" event.
     *
     * @param  \App\ImageUpload  $imageUpload
     * @return void
     */
    public function forceDeleted(ImageUpload $imageUpload)
    {
        //
    }
}
