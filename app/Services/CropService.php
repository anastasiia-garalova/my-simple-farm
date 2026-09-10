<?php

namespace App\Services;

use App\Models\Crop;
use App\Models\User;

class CropService
{
    public function create(array $data, User $user): Crop
    {
        return Crop::create([
            'name' => $data['name'],
            'category' => $data['category'],
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
            'created_by' => $user->id,
        ]);
    }

    public function update(Crop $crop, array $data): Crop
    {
        $crop->update([
            'name' => $data['name'],
            'category' => $data['category'],
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
        ]);

        return $crop->refresh();
    }
}
