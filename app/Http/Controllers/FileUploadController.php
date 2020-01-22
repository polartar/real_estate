<?php

namespace App\Http\Controllers;

use App\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class FileUploadController extends Controller
{
    //
    public function uploadImage(Request $request) {
        $this->authorize('create', ImageUpload::class);

        request()->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
        ]);

        Storage::makeDirectory('public/images/thumbs');

        $path_original = $request->file('file')->store('public/images');

        $fs_path = storage_path('app/' . $path_original);
        $filename = explode('public/images/', $path_original)[1];

        // get url from path_original
        $url = url(Storage::url($path_original));

        $sizes = ['small' => 300, 'medium' => 600, 'large' => 900];
        $path_small = $path_medium = $path_large = '';
        foreach ($sizes as $size => $width) {
            $img = Image::make($fs_path)->widen($width, function($constraint) {
                $constraint->upsize();
            });

            $thumbfile = $size . $filename;
            $thumbpath = storage_path('app/public/images/thumbs/' . $thumbfile);
            $img->save($thumbpath);

            ${"path_$size"} = 'public/images/thumbs/' . $thumbfile;
        }

        $imageUpload = new ImageUpload();
        $imageUpload->user_id = Auth::user()->id;
        $imageUpload->size_original = $path_original;
        $imageUpload->size_small = $path_small;
        $imageUpload->size_medium = $path_medium;
        $imageUpload->size_large = $path_large;
        $imageUpload->title = $request->title;
        $imageUpload->description = $request->description;
        $imageUpload->name = $request->name;

        $imageUpload->save();

        return $imageUpload;
    }

    public function deleteImage(ImageUpload $image) {
        $this->authorize('delete', $image);

        $image->delete();

        return ['success' => true];
    }
}
