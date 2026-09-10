<?php

namespace App\Services;

use App\Models\Field;
use App\Models\User;

class FieldService
{
    public function create(array $data, User $user): Field
    {
        return Field::create([
            'farm_id' => $data['farm_id'],
            'name' => $data['name'],
            'size_hectares' => $data['size_hectares'],
            'soil_type' => $data['soil_type'] ?? null,
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(Field $field, array $data): Field
    {
        $field->update([
            'farm_id' => $data['farm_id'],
            'name' => $data['name'],
            'size_hectares' => $data['size_hectares'],
            'soil_type' => $data['soil_type'] ?? null,
            'status' => $data['status'],
        ]);

        return $field->refresh();
    }
}
