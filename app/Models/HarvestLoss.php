<?php

namespace App\Models;

use App\Enums\HarvestEntryUnit;
use App\Enums\HarvestLossReason;
use App\Enums\HarvestLossType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HarvestLoss extends Model
{
    protected $fillable = [
        'harvest_id',
        'loss_type',
        'quantity',
        'unit',
        'reason',
        'recorded_at',
        'created_by',
    ];

    protected $casts = [
        'recorded_at' => 'date',
        'unit' => HarvestEntryUnit::class,
        'loss_type' => HarvestLossType::class,
        'reason' => HarvestLossReason::class,
    ];

    public function harvest(): BelongsTo
    {
        return $this->belongsTo(Harvest::class, 'harvest_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
