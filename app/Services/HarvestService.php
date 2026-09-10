<?php

namespace App\Services;

use App\Models\Harvest;
use App\Models\User;

class HarvestService
{

    public function create(array $data, User $user): Harvest
    {
        return Harvest::create([
            'name' => $data['name'],
            'field_crop_assignment_id' => $data['field_crop_assignment_id'],
            'started_at' => $data['started_at'],
            'ended_at' => $data['ended_at'],
            'status' => $data['status'],
            'notes' => $data['notes'],
            'created_by' => $user->id,
        ]);
    }

    public function update(Harvest $harvest, array $data ): Harvest
    {
        $harvest->update([
            'name' => $data['name'],
            'field_crop_assignment_id' => $data['field_crop_assignment_id'],
            'started_at' => $data['started_at'],
            'ended_at' => $data['ended_at'],
            'status' => $data['status'],
            'notes' => $data['notes'],
        ]);

        return $harvest->refresh();
    }
}
