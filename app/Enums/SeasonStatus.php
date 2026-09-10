<?php

namespace App\Enums;

enum SeasonStatus: string
{
    case Planned = 'planned';
    case Active = 'active';
    case Closed = 'closed';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
