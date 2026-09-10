<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'admin';
    case Betriebsleiter = 'betriebsleiter';
    case Feldverantwortlicher = 'feldverantwortlicher';
    case Lagerverantwortlicher = 'lagerverantwortlicher';
    case Vertrieb = 'vertrieb';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
