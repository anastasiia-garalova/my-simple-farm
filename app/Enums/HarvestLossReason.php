<?php

namespace App\Enums;

enum HarvestLossReason: string
{
    case Rain = 'rain';
    case Rot = 'rot';
    case Heat = 'heat';
    case Disease = 'disease';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
