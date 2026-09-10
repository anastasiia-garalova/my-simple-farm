<?php

namespace App\Enums;

enum FieldStatus: string
{
    case Available = 'available';
    case Blocked = 'blocked';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
