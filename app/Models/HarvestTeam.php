<?php

namespace App\Models;

use App\Enums\HarvestTeamStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HarvestTeam extends Model
{

    protected $fillable = [
        'name',
        'lead_person',
        'status',
        'created_by',
    ];

    protected $casts = [
      'status' => HarvestTeamStatus::class,
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->belongsToMany(
            User::class,
            'harvest_team_members',  // pivot table
            'harvest_team_id',
            'user_id'
        );
    }
}
