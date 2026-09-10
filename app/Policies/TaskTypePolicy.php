<?php

namespace App\Policies;

use App\Enums\TaskTypeStatus;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskTypePolicy
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
    public function view(User $user, TaskType $taskType): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $taskType->created_by === $user->id;
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
    public function update(User $user, TaskType $taskType): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($taskType->status === TaskTypeStatus::Inactive) {
            return false;
        }

        return $user->can('manage fields');
    }
}
