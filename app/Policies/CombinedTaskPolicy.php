<?php

namespace App\Policies;

use App\Enums\CombinedTaskStatus;
use App\Models\CombinedTask;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CombinedTaskPolicy
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
    public function view(User $user, CombinedTask $combinedTask): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $combinedTask->created_by === $user->id;
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
    public function update(User $user, CombinedTask $combinedTask): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($combinedTask->status === CombinedTaskStatus::Inactive) {
            return false;
        }

        return $user->can('manage fields');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CombinedTask $combinedTask): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CombinedTask $combinedTask): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CombinedTask $combinedTask): bool
    {
        return false;
    }
}
