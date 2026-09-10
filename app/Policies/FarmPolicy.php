<?php

namespace App\Policies;

use App\Enums\FarmStatus;
use App\Models\Farm;
use App\Models\User;

class FarmPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function view(User $user, Farm $farm): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $farm->created_by === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function update(User $user, Farm $farm): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($farm->status === FarmStatus::Inactive) {
            return false;
        }

        return $user->can('manage fields') || $farm->created_by === $user->id;
    }
}
