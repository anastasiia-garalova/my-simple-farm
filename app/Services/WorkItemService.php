<?php

namespace App\Services;

use App\Models\User;
use App\Models\WorkItem;

class WorkItemService
{
    /**
     * Create a new work item for the given user.
     *
     * @param array<string, mixed> $data
     */
    public function create(array $data, User $user): WorkItem
    {
        return WorkItem::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    /**
     * Update the given work item.
     *
     * @param array<string, mixed> $data
     */
    public function update(WorkItem $workItem, array $data): WorkItem
    {
        $workItem->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
        ]);

        return $workItem->refresh();
    }
}
