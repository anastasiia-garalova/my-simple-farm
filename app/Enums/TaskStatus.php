<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Planned = 'planned';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    /**
     * Возвращает все возможные значения enum
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
