<?php

namespace App\Policies;

use App\Enums\WorkItemStatus;
use App\Models\User;
use App\Models\WorkItem;

class WorkItemPolicy
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
    public function view(User $user, WorkItem $workItem): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $workItem->created_by === $user->id;
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
    public function update(User $user, WorkItem $workItem): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($workItem->status === WorkItemStatus::Done) {
            return false;
        }

        return $user->can('manage fields') || $workItem->created_by === $user->id;
    }
}
