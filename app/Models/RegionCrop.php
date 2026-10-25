<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegionCrop extends Model
{
    protected $fillable = [
        'region_id',
        'crop_id',
        'created_by',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class, 'crop_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
