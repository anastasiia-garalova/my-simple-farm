<?php

namespace App\Services;

use App\Models\HarvestTeam;
use App\Models\HarvestTeamMember;
use App\Models\User;
use Dflydev\DotAccessData\Data;

class HarvestTeamService
{
    /**
     * Create a new class instance.
     */
    public function create(array $data, User $user): HarvestTeam
    {
        return HarvestTeam::create([
            'name' => $data['name'],
            'lead_person' => $data['lead_person'],
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(HarvestTeam $harvestTeam, array $data): HarvestTeam
    {
        $harvestTeam->update([
            'name' => $data['name'],
            'lead_person' => $data['lead_person'],
            'status' => $data['status'],
        ]);

        return $harvestTeam->refresh();
    }
}
