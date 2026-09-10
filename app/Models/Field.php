<?php

namespace App\Models;

use App\Enums\FieldStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Field extends Model
{
    protected $fillable = [
        'farm_id',
        'name',
        'size_hectares',
        'soil_type',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => FieldStatus::class,
            'size_hectares' => 'decimal:2',
        ];
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function fieldCropAssignments(): HasMany
    {
        return $this->hasMany(FieldCropAssignment::class);
    }
}
