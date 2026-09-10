<?php

namespace App\Models;

use App\Enums\FarmStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Farm extends Model
{
    protected $fillable = [
        'name',
        'location',
        'contact_person',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => FarmStatus::class,
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function fields(): HasMany
    {
        return $this->hasMany(Field::class);
    }
}
