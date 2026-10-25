<?php

namespace App\Policies;

use App\Models\RegionCrop;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RegionCropPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage regionCrop');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, RegionCrop $regionCrop): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage regions')
            || $regionCrop->created_by === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('create regionCrop');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, RegionCrop $regionCrop): bool
    {
        return $user->hasRole('admin') || $user->can('update regionCrop');
    }

}
