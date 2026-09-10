<?php

namespace App\Enums;

enum HarvestStatus: string
{
    case Planned = 'planned';
    case Running = 'running';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
