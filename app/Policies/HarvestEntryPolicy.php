<?php

namespace App\Policies;

use App\Models\HarvestEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HarvestEntryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, HarvestEntry $harvestEntry): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $harvestEntry->created_by === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, HarvestEntry $harvestEntry): bool
    {
        if ($user->hasRole('admin')
            || $user->can('manage fields')
            || $harvestEntry->created_by === $user->id)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
