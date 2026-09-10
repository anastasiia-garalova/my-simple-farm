<?php

namespace App\Services;

use App\Models\TaskType;
use App\Models\User;

class TaskTypeService
{

    public function create(array $data, User $user): TaskType
    {
        return TaskType::create([
            'name' => $data['name'],
            'category' => $data['category'],
            'default_unit' => $data['default_unit'],
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(TaskType $taskType, array $data): TaskType
    {
        $taskType->update([
            'name' => $data['name'],
            'category' => $data['category'],
            'default_unit' => $data['default_unit'],
            'status' => $data['status'],
        ]);

        return $taskType->refresh();
    }
}
