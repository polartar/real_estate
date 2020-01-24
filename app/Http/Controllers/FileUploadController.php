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

        $filesystem = Storage::disk('public');

        $path_original = $request->file('file')->store('images', ['disk' => 'public']);
        $fs_path = $filesystem->path($path_original);

        $thumbs = ImageUpload::createThumbnails($fs_path, 'images/');

        $imageUpload = new ImageUpload();
        $imageUpload->user_id = Auth::user()->id;
        $imageUpload->size_original = $path_original;
        $imageUpload->size_small = $thumbs['small'];
        $imageUpload->size_medium = $thumbs['medium'];
        $imageUpload->size_large = $thumbs['large'];
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
