<?php

namespace App\Models;

use App\Enums\HarvestEntryQualityNote;
use App\Enums\HarvestEntryUnit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HarvestEntry extends Model
{
    protected $fillable = [
        'harvest_id',
        'recorded_at',
        'quantity',
        'unit',
        'quality_note',
        'created_by',
    ];

    protected $casts = [
        'recorded_at' => 'date',
        'unit' => HarvestEntryUnit::class,
        'quality_note' => HarvestEntryQualityNote::class,
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
