<?php

namespace App\Models;

use App\Enums\CropCategory;
use App\Enums\CropStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Crop extends Model
{
    protected $fillable = [
        'name',
        'category',
        'status',
        'notes',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'category' => CropCategory::class,
            'status' => CropStatus::class,
        ];
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
