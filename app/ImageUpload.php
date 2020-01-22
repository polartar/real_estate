<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageUpload extends Model
{
    // protected $appends = ['original', 'large', 'medium', 'small'];
    // protected $hidden = ['size_original', 'size_large', 'size_medium', 'size_small'];

    //
    public function getOriginalAttribute() {
        return url(Storage::url($this->attributes['size_original']));
    }

    public function getLargeAttribute() {
        return url(Storage::url($this->attributes['size_large']));
    }

    public function getMediumAttribute() {
        return url(Storage::url($this->attributes['size_medium']));
    }

    public function getSmallAttribute() {
        return url(Storage::url($this->attributes['size_small']));
    }
}
