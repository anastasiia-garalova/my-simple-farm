<?php

namespace App\Enums;

enum HarvestEntryQualityNote: string
{
    case Excellent = 'excellent';
    case Good = 'good';
    case Average = 'average';
    case Poor = 'poor';
    case Damaged = 'damaged';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
