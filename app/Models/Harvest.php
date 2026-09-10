<?php

namespace App\Models;

use App\Enums\HarvestStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Harvest extends Model
{

    protected $fillable = [
        'name',
        'field_crop_assignment_id',
        'started_at',
        'ended_at',
        'status',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'status' => HarvestStatus::class,
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function fieldCropAssignment(): BelongsTo
    {
        return $this->belongsTo(FieldCropAssignment::class, 'field_crop_assignment_id');
    }

    public function harvestEntries(): HasMany
    {
        return $this->hasMany(HarvestEntry::class, 'harvest_id');
    }

    public function harvestLosses(): HasMany
    {
        return $this->hasMany(HarvestLoss::class, 'harvest_id');
    }
}
