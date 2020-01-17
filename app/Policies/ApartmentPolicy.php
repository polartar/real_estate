<?php

namespace App\Policies;

use App\Apartment;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class ApartmentPolicy
{
    use HandlesAuthorization;

    public function before($user, $ability) {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any apartments.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the apartment.
     *
     * @param  \App\User  $user
     * @param  \App\Apartment  $apartment
     * @return mixed
     */
    public function view(?User $user, Apartment $apartment)
    {
        //
        if ($apartment->is_active) {
            return true;
        }

        if (!$user) {
            return false;
        }

        return $user->id === $apartment->user_id;
    }

    /**
     * Determine whether the user can create apartments.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the apartment.
     *
     * @param  \App\User  $user
     * @param  \App\Apartment  $apartment
     * @return mixed
     */
    public function update(User $user, Apartment $apartment)
    {
        return $user->id === $apartment->user_id;
    }

    /**
     * Determine whether the user can delete the apartment.
     *
     * @param  \App\User  $user
     * @param  \App\Apartment  $apartment
     * @return mixed
     */
    public function delete(User $user, Apartment $apartment)
    {
        return $user->id === $apartment->user_id;
    }

    /**
     * Determine whether the user can restore the apartment.
     *
     * @param  \App\User  $user
     * @param  \App\Apartment  $apartment
     * @return mixed
     */
    public function restore(User $user, Apartment $apartment)
    {
        //
        return $user->id === $apartment->user_id;
    }

    /**
     * Determine whether the user can permanently delete the apartment.
     *
     * @param  \App\User  $user
     * @param  \App\Apartment  $apartment
     * @return mixed
     */
    public function forceDelete(User $user, Apartment $apartment)
    {
        //
        return $user->id === $apartment->user_id;
    }
}
