<?php

namespace App\Enums;

enum Permission: string
{
    case ManageUsers = 'manage users';
    case ManageFields = 'manage fields';
    case ManageInventory = 'manage inventory';
    case ManageSales = 'manage sales';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
