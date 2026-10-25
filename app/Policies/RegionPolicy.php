<?php

namespace App\Policies;

use App\Models\Region;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RegionPolicy
{

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage regions');
    }


    public function view(User $user, Region $region): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage regions')
            || $region->created_by === $user->id;
    }


    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('create regions');
    }


    public function update(User $user, Region $region): bool
    {
        return $user->hasRole('admin') || $user->can('update regions');
    }

}
