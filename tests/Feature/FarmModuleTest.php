<?php

use App\Models\Farm;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('allows an admin to open the farm index page', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole('admin');

    $this->actingAs($user)
        ->get('/farms')
        ->assertOk();
});

it('stores a farm for a user with permission', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->givePermissionTo('manage fields');

    $this->actingAs($user)
        ->post('/farms', [
            'name' => 'Musterhof Nord',
            'location' => 'Hamburg',
            'contact_person' => 'Anna Becker',
            'status' => 'active',
        ])
        ->assertRedirect('/farms');

    $this->assertDatabaseHas('farms', [
        'name' => 'Musterhof Nord',
        'status' => 'active',
        'created_by' => $user->id,
    ]);
});

it('forbids the creator from editing an inactive farm', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $farm = Farm::create([
        'name' => 'Stillgelegter Hof',
        'location' => 'Lüneburg',
        'contact_person' => 'Max Beispiel',
        'status' => 'inactive',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/farms/{$farm->id}/edit")
        ->assertForbidden();
});
