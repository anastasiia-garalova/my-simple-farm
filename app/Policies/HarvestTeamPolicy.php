<?php

namespace App\Policies;

use App\Enums\HarvestTeamStatus;
use App\Models\HarvestTeam;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HarvestTeamPolicy
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
    public function view(User $user, HarvestTeam $harvestTeam): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $harvestTeam->status === HarvestTeamStatus::Inactive;
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
    public function update(User $user, HarvestTeam $harvestTeam): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ( $harvestTeam->status === HarvestTeamStatus::Inactive) {
            return false;
        }

        return $user->can('manage fields');
    }
}
