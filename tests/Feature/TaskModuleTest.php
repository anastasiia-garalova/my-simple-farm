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

it('stores a task for an admin', function () {

    $this->actingAs($this->admin)
        ->post('/tasks', [
            'field_id' => $this->field->id,
            'season_id' => $this->season->id,
            'task_type_id' => $this->taskType->id,
            'combined_task_id' => $this->combinedTask->id,
            'title' => 'Aufgabe Sommer',
            'planned_for' => '2026-08-31 00:00:00',
            'status' => 'in_progress',
        ])
        ->assertRedirect('/tasks');

    $this->assertDatabaseHas('tasks', [
        'title' => 'Aufgabe Sommer',
        'field_id' => $this->field->id,
        'season_id' => $this->season->id,
        'task_type_id' => $this->taskType->id,
        'combined_task_id' => $this->combinedTask->id,
        'created_by' => $this->admin->id,
    ]);
});

it('validates that the selected combined task exists', function () {

    $this->actingAs($this->admin)
        ->from('/tasks/create')
        ->post('/tasks', [
            'field_id' => $this->field->id,
            'season_id' => $this->season->id,
            'task_type_id' => $this->taskType->id,
            'combined_task_id' => 999999, // не существует
            'title' => 'Aufgabe Sommer',
            'planned_for' => '2026-08-31 00:00:00',
            'status' => 'in_progress',
        ])
        ->assertRedirect('/tasks/create')
        ->assertSessionHasErrors(['combined_task_id']);
});

it('returns 404 if task does not exist', function () {

    $this->actingAs($this->admin)
        ->get('/tasks/999999')
        ->assertNotFound();
});

it('forbids creator from editing a completed task', function () {

    $task = Task::create([
        'field_id' => $this->field->id,
        'season_id' => $this->season->id,
        'task_type_id' => $this->taskType->id,
        'combined_task_id' => $this->combinedTask->id,
        'title' => 'Aufgabe Sommer',
        'planned_for' => '2026-08-31 00:00:00',
        'status' => 'completed',
        'created_by' => $this->user->id,
    ]);

    $this->actingAs($this->user)
        ->get("/tasks/{$task->id}/edit")
        ->assertForbidden();
});

