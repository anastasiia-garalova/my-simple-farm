<?php

namespace App\Services;

use App\Models\HarvestEntry;
use App\Models\User;

class HarvestEntryService
{
    /**
     * Create a new class instance.
     */
    public function create(array $data, User $user): HarvestEntry
    {
        return HarvestEntry::create([
            'harvest_id' => $data['harvest_id'],
            'recorded_at' => $data['recorded_at'],
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'quality_note' => $data['quality_note'],
            'created_by' => $user->id,
        ]);
    }

    public function update(array $data, HarvestEntry $harvestEntry): HarvestEntry
    {
        $harvestEntry->update([
            'harvest_id' => $data['harvest_id'],
            'recorded_at' => $data['recorded_at'],
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'quality_note' => $data['quality_note'],
        ]);

        return $harvestEntry->refresh();
    }
}
