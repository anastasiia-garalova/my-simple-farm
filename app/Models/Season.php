<?php

namespace App\Models;

use App\Enums\SeasonStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Season extends Model
{
    protected $fillable = [
        'name',
        'year',
        'starts_on',
        'ends_on',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => SeasonStatus::class,
            'starts_on' => 'date',
            'ends_on' => 'date',
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
