<?php

namespace App\Services;

use App\Models\Farm;
use App\Models\User;

class FarmService
{
    public function create(array $data, User $user): Farm
    {
        return Farm::create([
            'name' => $data['name'],
            'location' => $data['location'],
            'contact_person' => $data['contact_person'] ?? null,
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(Farm $farm, array $data): Farm
    {
        $farm->update([
            'name' => $data['name'],
            'location' => $data['location'],
            'contact_person' => $data['contact_person'] ?? null,
            'status' => $data['status'],
        ]);

        return $farm->refresh();
    }
}
