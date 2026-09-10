<?php

namespace App\Services;

use App\Models\FieldCropAssignment;
use App\Models\User;

class FieldCropAssignmentService
{
    public function create(array $data, User $user): FieldCropAssignment
    {
        return FieldCropAssignment::create([
            'field_id' => $data['field_id'],
            'crop_id' => $data['crop_id'],
            'season_id' => $data['season_id'],
            'status' => $data['status'],
            'planned_area_hectares' => $data['planned_area_hectares'],
            'notes' => $data['notes'] ?? null,
            'created_by' => $user->id,
        ]);
    }

    public function update(FieldCropAssignment $fieldCropAssignment, array $data): FieldCropAssignment
    {
        $fieldCropAssignment->update([
            'field_id' => $data['field_id'],
            'crop_id' => $data['crop_id'],
            'season_id' => $data['season_id'],
            'status' => $data['status'],
            'planned_area_hectares' => $data['planned_area_hectares'],
            'notes' => $data['notes'] ?? null,
        ]);

        return $fieldCropAssignment->refresh();
    }
}
