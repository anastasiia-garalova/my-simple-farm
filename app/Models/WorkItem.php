<?php

namespace App\Models;

use App\Enums\WorkItemStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkItem extends Model
{
    protected $table = 'work_items';
    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'created_by',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => WorkItemStatus::class,
        ];
    }

    /**
     * Get the user that created the work item.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
