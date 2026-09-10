<?php

namespace App\Policies;

use App\Enums\FieldCropAssignmentStatus;
use App\Models\FieldCropAssignment;
use App\Models\User;

class FieldCropAssignmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function view(User $user, FieldCropAssignment $fieldCropAssignment): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $fieldCropAssignment->created_by === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function update(User $user, FieldCropAssignment $fieldCropAssignment): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if (in_array($fieldCropAssignment->status, [
            FieldCropAssignmentStatus::Completed,
            FieldCropAssignmentStatus::Cancelled,
        ], true)) {
            return false;
        }

        return $user->can('manage fields');
    }
}
