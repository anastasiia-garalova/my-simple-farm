<?php

namespace App\Enums;

enum TaskTypeCategory: string
{
    case Soil = 'soil';
    case Sowing = 'sowing';
    case Care = 'care';
    case Harvest = 'harvest';
    case Logistics = 'logistics';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
