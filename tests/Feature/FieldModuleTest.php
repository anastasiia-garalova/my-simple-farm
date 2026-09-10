<?php

use App\Models\Farm;
use App\Models\Field;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $this->admin = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $this->user->givePermissionTo('manage fields');
    $this->admin->assignRole('admin');

    $this->farm = Farm::create([
        'name' => 'Musterhof Süd',
        'location' => 'München',
        'contact_person' => 'Lisa Kern',
        'status' => 'active',
        'created_by' => $this->admin->id,
    ]);
});

it('stores a field for a user with permission', function () {

    $this->actingAs($this->admin)
        ->post('/fields', [
            'farm_id' => $this->farm->id,
            'name' => 'Feld A',
            'size_hectares' => 12.5,
            'soil_type' => 'Lehm',
            'status' => 'available',
        ])
        ->assertRedirect('/fields');

    $this->assertDatabaseHas('fields', [
        'farm_id' => $this->farm->id,
        'name' => 'Feld A',
        'status' => 'available',
        'created_by' => $this->admin->id,
    ]);
});

it('validates that the selected farm exists', function () {



    $this->actingAs($this->user)
        ->from('/fields/create')
        ->post('/fields', [
            'farm_id' => 9999,
            'name' => 'Ungültiges Feld',
            'size_hectares' => 3.25,
            'soil_type' => 'Sand',
            'status' => 'available',
        ])
        //'farm_id' => $this->farm->id,
        ->assertRedirect('/fields/create')
        ->assertSessionHasErrors(['farm_id']);
});

it('forbids the creator from editing a blocked field', function () {

    $field = Field::create([
        'farm_id' => $this->farm->id,
        'name' => 'Feld Sperre',
        'size_hectares' => 8.4,
        'soil_type' => 'Ton',
        'status' => 'blocked',
        'created_by' => $this->user->id,
    ]);

    $this->actingAs($this->user)
        ->get("/fields/{$field->id}/edit")
        ->assertForbidden();
});
