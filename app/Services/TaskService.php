<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;

class TaskService
{

    public function create(array $data, User $user): Task
    {
        return Task::create([
            'field_id' => $data['field_id'],
            'season_id' => $data['season_id'],
            'task_type_id' => $data['task_type_id'],
            'combined_task_id' => $data['combined_task_id'] ?? null,
            'title' => $data['title'],
            'planned_for' => $data['planned_for'],
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
            'created_by' => $user->id,
        ]);
    }

    public function update(Task $task, array $data): Task
    {
        $task->update([
            'field_id' => $data['field_id'],
            'season_id' => $data['season_id'],
            'task_type_id' => $data['task_type_id'],
            'combined_task_id' => $data['combined_task_id'] ?? null,
            'title' => $data['title'],
            'planned_for' => $data['planned_for'],
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
        ]);

        return $task->refresh();
    }
}
