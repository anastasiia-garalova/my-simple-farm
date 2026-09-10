<?php

namespace App\Policies;

use App\Enums\HarvestStatus;
use App\Models\HarvestLoss;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HarvestLossPolicy
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
    public function view(User $user, HarvestLoss $harvestLoss): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $harvestLoss->created_by === $user->id;
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
    public function update(User $user, HarvestLoss $harvestLoss): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $harvestLoss->created_by === $user->id;
    }
}
