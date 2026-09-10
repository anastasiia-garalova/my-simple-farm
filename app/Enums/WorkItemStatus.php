<?php

namespace App\Enums;

enum WorkItemStatus: string
{
    case Draft = 'draft';
    case Planned = 'planned';
    case Done = 'done';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
