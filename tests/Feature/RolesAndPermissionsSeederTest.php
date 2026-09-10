<?php

use App\Enums\Permission;
use App\Enums\Role;
use Database\Seeders\RolesAndPermissionsSeeder;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as PermissionRole;

it('seeds the default application roles', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $seededRoles = PermissionRole::query()
        ->orderBy('name')
        ->pluck('name')
        ->all();

    $expectedRoles = Role::values();
    sort($expectedRoles);

    expect($seededRoles)->toBe($expectedRoles);
});

it('seeds the default application permissions', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $seededPermissions = PermissionModel::query()
        ->orderBy('name')
        ->pluck('name')
        ->all();

    $expectedPermissions = Permission::values();
    sort($expectedPermissions);

    expect($seededPermissions)->toBe($expectedPermissions);
});
