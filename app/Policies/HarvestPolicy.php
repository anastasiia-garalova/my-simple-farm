<?php

namespace App\Policies;

use App\Enums\HarvestStatus;
use App\Models\Harvest;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HarvestPolicy
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
    public function view(User $user, Harvest $harvest): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $harvest->created_by === $user->id;
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
    public function update(User $user, Harvest $harvest): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($harvest->status === HarvestStatus::Completed) {
            return false;
        }

        if ($harvest->status === HarvestStatus::Cancelled) {
            return false;
        }

        return $user->can('manage fields');
    }


}
