<?php

namespace App\Policies;

use App\Enums\SeasonStatus;
use App\Models\Season;
use App\Models\User;

class SeasonPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage seasons');
    }

    public function view(User $user, Season $season): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage seasons')
            || $season->created_by === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage seasons');
    }

    public function update(User $user, Season $season): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($season->status === SeasonStatus::Closed) {
            return false;
        }

        return $user->can('manage seasons');
    }
}
