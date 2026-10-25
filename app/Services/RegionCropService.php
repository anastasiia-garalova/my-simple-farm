<?php

namespace App\Services;
use App\Models\User;
use App\Models\RegionCrop;

class RegionCropService
{
    
    public function create(array $data, User $user): RegionCrop
    {
        return RegionCrop::create([
            'region_id' => $data['region_id'],
            'crop_id' => $data['crop_id'],
            'created_by' => $user->id,
        ]);
    }

    public function update(RegionCrop $regionCrop, array $data): RegionCrop
    {
        $regionCrop->update([
            'region_id' => $data['region_id'],
            'crop_id' => $data['crop_id'],
        ]);

        return $regionCrop->refresh();
    }
}
