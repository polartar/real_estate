<?php

namespace App\Policies;

use App\ImageUpload;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ImageUploadPolicy
{
    use HandlesAuthorization;

    public function before($user, $ability) {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any image uploads.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(?User $user)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can view the image upload.
     *
     * @param  \App\User  $user
     * @param  \App\ImageUpload  $imageUpload
     * @return mixed
     */
    public function view(User $user, ImageUpload $imageUpload)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create image uploads.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can update the image upload.
     *
     * @param  \App\User  $user
     * @param  \App\ImageUpload  $imageUpload
     * @return mixed
     */
    public function update(User $user, ImageUpload $imageUpload)
    {
        //
        return $user->id === $imageUpload->user_id;
    }

    /**
     * Determine whether the user can delete the image upload.
     *
     * @param  \App\User  $user
     * @param  \App\ImageUpload  $imageUpload
     * @return mixed
     */
    public function delete(User $user, ImageUpload $imageUpload)
    {
        //
        return $user->id === $imageUpload->user_id;
    }

    /**
     * Determine whether the user can restore the image upload.
     *
     * @param  \App\User  $user
     * @param  \App\ImageUpload  $imageUpload
     * @return mixed
     */
    public function restore(User $user, ImageUpload $imageUpload)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the image upload.
     *
     * @param  \App\User  $user
     * @param  \App\ImageUpload  $imageUpload
     * @return mixed
     */
    public function forceDelete(User $user, ImageUpload $imageUpload)
    {
        //
        return $user->id === $imageUpload->user_id;
    }
}
