<?php

use App\Models\CombinedTask;
use App\Models\Crop;
use App\Models\Farm;
use App\Models\Field;
use App\Models\FieldCropAssignment;
use App\Models\Harvest;
use App\Models\Season;
use App\Models\Task;
use App\Models\TaskType;
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

   // $this->field = Field::factory()->create([
    $this->field = Field::create([
        'farm_id' => $this->farm->id,
        'name' => 'Schoenes Feld',
        'size_hectares' => 8,
        'status' => 'available',
        'created_by' => $this->user->id,
    ]);

    $this->crop = Crop::create([
        'name' => 'Crop1',
        'category' => 'fruit',
        'status' => 'active',
        'created_by' => $this->admin->id,
    ]);

    $this->season = Season::create([
        'name' => 'Sommer',
        'year' => 2026,
        'starts_on' => '2026-06-10',
        'ends_on' => '2026-08-31',
        'status' => 'active',
        'created_by' => $this->admin->id,
    ]);

    $this->fieldCropAssignment = FieldCropAssignment::create([
        'field_id' => $this->field->id,
        'crop_id' => $this->crop->id,
        'season_id' => $this->season->id,
        'status' => 'active',
        'planned_area_hectares' => 500,
        'notes' => 'Notes fuer Test',
        'created_by' => $this->admin->id,
    ]);

    $this->taskType = TaskType::create([
        'name' => 'Test Task',
        'category' => 'harvest',
        'default_unit' => ' test unit',
        'status' => 'active',
        'created_by' => $this->admin->id,
    ]);

    $this->combinedTask = CombinedTask::create([
        'name' => 'Test Combined Task',
        'status' => 'active',
        'description' => 'Test description',
        'created_by' => $this->admin->id,
    ]);

});

it('stores a harvest for an admin', function () {

    $this->actingAs($this->admin)
        ->post('/harvests', [
            'name' => 'Test Harvest Task',
            'field_crop_assignment_id' => $this->fieldCropAssignment->id,
            'started_at' => '2026-09-15',
            'ended_at' => '2026-10-02',
            'notes' => 'Test notes',
            'status' => 'running',
        ])
        ->assertRedirect('/harvests');

    $this->assertDatabaseHas('harvests', [
        'name' => 'Test Harvest Task',
        'field_crop_assignment_id' => $this->fieldCropAssignment->id,
        'created_by' => $this->admin->id,
    ]);
});

it('returns 404 if harvest does not exist', function () {

    $this->actingAs($this->admin)
        ->get('/harvests/999999')
        ->assertNotFound();

});

it('forbids creator from editing a blocked harvest', function () {

    $harvest = Harvest::create([
        'name' => 'Test Harvest Task',
        'field_crop_assignment_id' => $this->fieldCropAssignment->id,
        'started_at' => '2026-09-15',
        'ended_at' => '2026-10-02',
        'status' => 'completed',
        'notes' => 'Test notes',
        'created_by' => $this->user->id,
    ]);

    $this->actingAs($this->user)
        ->get("/harvests/{$harvest->id}/edit")
        ->assertForbidden();
});

