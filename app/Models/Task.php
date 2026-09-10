<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\TaskStatus;

class Task extends Model
{
    protected $fillable = [
        'field_id',
        'season_id',
        'task_type_id',
        'combined_task_id',
        'title',
        'planned_for',
        'status',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'status' => TaskStatus::class, // привязываем enum TaskStatus
        'planned_for' => 'datetime',
    ];

    public function field(): BelongsTo
    {
        return $this->belongsTo(Field::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function taskType(): BelongsTo
    {
        return $this->belongsTo(TaskType::class);
    }

    public function combinedTask(): BelongsTo
    {
        return $this->belongsTo(CombinedTask::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
