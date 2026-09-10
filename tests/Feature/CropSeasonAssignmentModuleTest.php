<?php

use App\Models\Crop;
use App\Models\Farm;
use App\Models\Field;
use App\Models\FieldCropAssignment;
use App\Models\Season;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('stores a crop for a user with permission', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->givePermissionTo('manage fields');

    $this->actingAs($user)
        ->post('/crops', [
            'name' => 'Weizen',
            'category' => 'grain',
            'status' => 'active',
            'notes' => 'Winterweizen für die Feldplanung.',
        ])
        ->assertRedirect('/crops');

    $this->assertDatabaseHas('crops', [
        'name' => 'Weizen',
        'category' => 'grain',
        'status' => 'active',
        'created_by' => $user->id,
    ]);
});

it('forbids editing a closed season for non admins', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $season = Season::create([
        'name' => 'Herbst',
        'year' => 2027,
        'starts_on' => '2027-09-01',
        'ends_on' => '2027-11-30',
        'status' => 'closed',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/seasons/{$season->id}/edit")
        ->assertForbidden();
});

it('stores a field crop assignment with valid relations', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->givePermissionTo('manage fields');

    $farm = Farm::create([
        'name' => 'Hof West',
        'location' => 'Kiel',
        'contact_person' => 'Nina Bauer',
        'status' => 'active',
        'created_by' => $user->id,
    ]);

    $field = Field::create([
        'farm_id' => $farm->id,
        'name' => 'Feld 3',
        'size_hectares' => 14.3,
        'soil_type' => 'Lehm',
        'status' => 'available',
        'created_by' => $user->id,
    ]);

    $crop = Crop::create([
        'name' => 'Karotten',
        'category' => 'vegetable',
        'status' => 'active',
        'notes' => 'Frühjahrsanbau',
        'created_by' => $user->id,
    ]);

    $season = Season::create([
        'name' => 'Frühjahr',
        'year' => 2027,
        'starts_on' => '2027-03-01',
        'ends_on' => '2027-06-30',
        'status' => 'active',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->post('/field-crop-assignments', [
            'field_id' => $field->id,
            'crop_id' => $crop->id,
            'season_id' => $season->id,
            'status' => 'planned',
            'planned_area_hectares' => 10.5,
            'notes' => 'Erste Saisonplanung',
        ])
        ->assertRedirect('/field-crop-assignments');

    $this->assertDatabaseHas('field_crop_assignments', [
        'field_id' => $field->id,
        'crop_id' => $crop->id,
        'season_id' => $season->id,
        'status' => 'planned',
        'created_by' => $user->id,
    ]);
});

it('validates that the selected season exists on assignments', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole('admin');

    $farm = Farm::create([
        'name' => 'Hof Ost',
        'location' => 'Rostock',
        'contact_person' => 'Mila Stern',
        'status' => 'active',
        'created_by' => $user->id,
    ]);

    $field = Field::create([
        'farm_id' => $farm->id,
        'name' => 'Feld 5',
        'size_hectares' => 9.75,
        'soil_type' => 'Sand',
        'status' => 'available',
        'created_by' => $user->id,
    ]);

    $crop = Crop::create([
        'name' => 'Mais',
        'category' => 'grain',
        'status' => 'active',
        'notes' => null,
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->from('/field-crop-assignments/create')
        ->post('/field-crop-assignments', [
            'field_id' => $field->id,
            'crop_id' => $crop->id,
            'season_id' => 999999,
            'status' => 'planned',
            'planned_area_hectares' => 4.5,
            'notes' => null,
        ])
        ->assertRedirect('/field-crop-assignments/create')
        ->assertSessionHasErrors(['season_id']);
});

it('forbids editing a completed assignment for non admins', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $farm = Farm::create([
        'name' => 'Hof Süd',
        'location' => 'Augsburg',
        'contact_person' => 'Leon Brandt',
        'status' => 'active',
        'created_by' => $user->id,
    ]);

    $field = Field::create([
        'farm_id' => $farm->id,
        'name' => 'Feld 8',
        'size_hectares' => 6.2,
        'soil_type' => 'Ton',
        'status' => 'available',
        'created_by' => $user->id,
    ]);

    $crop = Crop::create([
        'name' => 'Roggen',
        'category' => 'grain',
        'status' => 'active',
        'notes' => null,
        'created_by' => $user->id,
    ]);

    $season = Season::create([
        'name' => 'Sommer',
        'year' => 2028,
        'starts_on' => '2028-06-01',
        'ends_on' => '2028-08-31',
        'status' => 'active',
        'created_by' => $user->id,
    ]);

    $assignment = FieldCropAssignment::create([
        'field_id' => $field->id,
        'crop_id' => $crop->id,
        'season_id' => $season->id,
        'status' => 'completed',
        'planned_area_hectares' => 5.0,
        'notes' => 'Bereits abgeschlossen',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/field-crop-assignments/{$assignment->id}/edit")
        ->assertForbidden();
});
