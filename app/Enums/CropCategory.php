<?php

namespace App\Enums;

enum CropCategory: string
{
    case Grain = 'grain';
    case Vegetable = 'vegetable';
    case Fruit = 'fruit';
    case Other = 'other';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
