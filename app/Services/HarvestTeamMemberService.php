<?php

namespace App\Services;

use App\Models\HarvestTeamMember;
use App\Models\User;
use Dflydev\DotAccessData\Data;

class HarvestTeamMemberService
{

    public function create(Data $data, User $user): HarvestTeamMember
    {
        return HarvestTeamMember::create([
            'harvest_team_id' => $data['harvest_team_id'],
            'user_id' => $data['user_id'],
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(HarvestTeamMember $harvestTeamMember, Data $data): HarvestTeamMember
    {
        $harvestTeamMember->update([
            'harvest_team_id' => $data['harvest_team_id'],
            'user_id' => $data['user_id'],
            'status' => $data['status'],
        ]);

        return $harvestTeamMember->refresh();
    }
}
