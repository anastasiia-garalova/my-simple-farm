<?php

namespace App\Enums;

enum HarvestLossType: string
{
    case Storage = 'storage';
    case Transport = 'transport';
    case Weather = 'weather';
    case Pests = 'pests';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
