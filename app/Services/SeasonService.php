<?php

namespace App\Services;

use App\Models\Season;
use App\Models\User;

class SeasonService
{
    public function create(array $data, User $user): Season
    {
        return Season::create([
            'name' => $data['name'],
            'year' => $data['year'],
            'starts_on' => $data['starts_on'],
            'ends_on' => $data['ends_on'],
            'status' => $data['status'],
            'created_by' => $user->id,
        ]);
    }

    public function update(Season $season, array $data): Season
    {
        $season->update([
            'name' => $data['name'],
            'year' => $data['year'],
            'starts_on' => $data['starts_on'],
            'ends_on' => $data['ends_on'],
            'status' => $data['status'],
        ]);

        return $season->refresh();
    }
}
