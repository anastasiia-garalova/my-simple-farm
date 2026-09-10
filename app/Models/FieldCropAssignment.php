<?php

namespace App\Models;

use App\Enums\FieldCropAssignmentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FieldCropAssignment extends Model
{
    protected $fillable = [
        'field_id',
        'crop_id',
        'season_id',
        'status',
        'planned_area_hectares',
        'notes',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => FieldCropAssignmentStatus::class,
            'planned_area_hectares' => 'decimal:2',
        ];
    }

    public function field(): BelongsTo
    {
        return $this->belongsTo(Field::class);
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
