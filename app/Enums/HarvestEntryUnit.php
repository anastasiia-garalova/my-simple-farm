<?php

namespace App\Enums;

enum HarvestEntryUnit: string
{
    case Kilogram = 'kg';
    case Gram = 'g';
    case Ton = 't';
    case Piece = 'pcs';
    case Liter = 'l';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
