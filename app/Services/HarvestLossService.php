<?php

namespace App\Services;

use App\Models\HarvestLoss;
use App\Models\User;

class HarvestLossService
{
    public function create(array $data, User $user): HarvestLoss
    {
        return HarvestLoss::create([
            'harvest_id' => $data['harvest_id'],
            'loss_type' => $data['loss_type'],
            'quantity' => $data['quantity'],
            'reason' => $data['reason'],
            'unit' => $data['unit'],
            'recorded_at' => $data['recorded_at'],
            'created_by' => $user->id,
        ]);
    }

    public function update(array $data, HarvestLoss $harvestLoss): HarvestLoss
    {
        $harvestLoss->update([
            'harvest_id' => $data['harvest_id'],
            'loss_type' => $data['loss_type'],
            'quantity' => $data['quantity'],
            'reason' => $data['reason'],
            'unit' => $data['unit'],
            'recorded_at' => $data['recorded_at'],
        ]);

        return $harvestLoss->refresh();
    }
}
