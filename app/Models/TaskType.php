<?php

namespace App\Models;

use App\Enums\TaskTypeCategory;
use App\Enums\TaskTypeStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskType extends Model
{
    protected $fillable = [
        'name',
        'category',
        'default_unit',
        'status',
        'created_by',
    ];

    protected $casts = [
        'status' => TaskTypeStatus::class,
        'category' => TaskTypeCategory::class,
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
