<?php

namespace App\Policies;

use App\Enums\FieldStatus;
use App\Models\Field;
use App\Models\User;

class FieldPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function view(User $user, Field $field): bool
    {
        return $user->hasRole('admin')
            || $user->can('manage fields')
            || $field->created_by === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->can('manage fields');
    }

    public function update(User $user, Field $field): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($field->status === FieldStatus::Blocked) {
            return false;
        }

        return $user->can('manage fields') || $field->created_by === $user->id;
    }
}
