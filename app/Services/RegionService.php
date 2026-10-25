<?php

namespace App\Services;
use App\Models\User;
use App\Models\Region;

class RegionService
{
    public function create(array $data, User $user): Region
    {
        return Region::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'created_by' => $user->id,
        ]);
    }

    public function update(Region $region, array $data): Region
    {
        $region->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        return $region->refresh();
    }
}
