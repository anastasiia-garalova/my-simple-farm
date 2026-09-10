<?php

namespace App\Enums;

enum HarvestTeamStatus: string
{
    case Pending = 'pending';
    case Completed = 'completed';
    case Inactive = 'inactive';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
