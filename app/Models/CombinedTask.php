<?php

namespace App\Models;

use App\Enums\CombinedTaskStatus;
use App\Enums\TaskTypeStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CombinedTask extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'created_by',
    ];

    protected $casts = [
        'status' => CombinedTaskStatus::class,
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function taskTypes(): BelongsToMany
    {
        return $this->belongsToMany(TaskType::class, 'combined_task_task_type');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
