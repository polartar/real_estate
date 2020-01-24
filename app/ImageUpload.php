<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageUpload extends Model
{
    protected $appends = ['original', 'large', 'medium', 'small'];
    protected $hidden = ['size_original', 'size_large', 'size_medium', 'size_small'];

    // Relationships
    public function attachment() {
        return $this->morphTo();
    }

    /**
     * @param $source - full path to the source file
     * @param $thumbdir - path relative to public storage where thumbs will be stored with a trailing slash
     */
    public static function createThumbnails($source, $thumbdir = null) {
        $filesystem = Storage::disk('public');

        if (!$thumbdir) {
            $thumbdir = 'images/';
        }

        $filename = basename($source);

        $result = [];
        $sizes = ['small' => 300, 'medium' => 600, 'large' => 900];
        foreach ($sizes as $size => $width) {
            $img = Image::make($source)->widen($width, function($constraint) {
                $constraint->upsize();
            });

            $thumbfile = $thumbdir . $size .  $filename;
            $thumbpath = $filesystem->path($thumbfile);
            $img->save($thumbpath);

            $result[$size] = $thumbfile;
        }

        return $result;
    }

    // Attributes
    public function getOriginalAttribute() {
        return Storage::disk('public')->url($this->attributes['size_original']);
    }

    public function getLargeAttribute() {
        return Storage::disk('public')->url($this->attributes['size_large']);
    }

    public function getMediumAttribute() {
        return Storage::disk('public')->url($this->attributes['size_medium']);
    }

    public function getSmallAttribute() {
        return Storage::disk('public')->url($this->attributes['size_small']);
    }
}
