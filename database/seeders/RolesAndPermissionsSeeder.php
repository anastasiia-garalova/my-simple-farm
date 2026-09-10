<?php

namespace Database\Seeders;

use App\Enums\Permission;
use App\Enums\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as PermissionRole;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Seed the application's roles and permissions.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        foreach (Permission::values() as $permission) {
            PermissionModel::findOrCreate($permission, 'web');
        }

        foreach (Role::values() as $role) {
            PermissionRole::findOrCreate($role, 'web');
        }

        PermissionRole::findByName(Role::Admin->value, 'web')
            ->syncPermissions(Permission::values());

        PermissionRole::findByName(Role::Betriebsleiter->value, 'web')
            ->syncPermissions([
                Permission::ManageFields->value,
                Permission::ManageInventory->value,
                Permission::ManageSales->value,
            ]);

        PermissionRole::findByName(Role::Feldverantwortlicher->value, 'web')
            ->syncPermissions([Permission::ManageFields->value]);

        PermissionRole::findByName(Role::Lagerverantwortlicher->value, 'web')
            ->syncPermissions([Permission::ManageInventory->value]);

        PermissionRole::findByName(Role::Vertrieb->value, 'web')
            ->syncPermissions([Permission::ManageSales->value]);
    }
}
