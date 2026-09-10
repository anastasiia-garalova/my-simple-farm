<?php

namespace App\Policies;

use App\Enums\CropStatus;
use App\Models\Crop;
use App\Models\User;

class CropPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function view(User $user, Crop $crop): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $crop->created_by === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function update(User $user, Crop $crop): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($crop->status === CropStatus::Inactive) {
            return false;
        }

        return $user->can('manage fields');
    }
}
