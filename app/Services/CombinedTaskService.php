<?php

namespace App\Services;

use App\Models\CombinedTask;
use App\Models\User;

class CombinedTaskService
{
    /**
     * Создание нового CombinedTask
     */
    public function create(array $data, User $user): CombinedTask
    {
        $combinedTask = CombinedTask::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);

        if (!empty($data['task_type_ids'])) {
            $combinedTask->taskTypes()->attach($data['task_type_ids']);
        }

        return $combinedTask;
    }

    /**
     * Обновление существующего CombinedTask
     */
    public function update(CombinedTask $combinedTask, array $data): CombinedTask
    {
        $combinedTask->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'status' => $data['status'],
        ]);

        $combinedTask->taskTypes()->sync($data['task_type_ids'] ?? []);

        return $combinedTask->refresh();
    }
}
