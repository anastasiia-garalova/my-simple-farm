<?php

use App\Http\Controllers\CombinedTaskController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\FieldCropAssignmentController;
use App\Http\Controllers\HarvestController;
use App\Http\Controllers\HarvestEntryController;
use App\Http\Controllers\HarvestLossController;
use App\Http\Controllers\HarvestTeamController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTypeController;
use App\Http\Controllers\Teaching\PermissionDemoController;
use App\Http\Controllers\WorkItemController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('teaching/permissions', [PermissionDemoController::class, 'show'])
        ->name('teaching.permissions');

    Route::get('teaching/examples/admin', [PermissionDemoController::class, 'adminOnly'])
        ->middleware('role:admin')
        ->name('teaching.examples.admin');

    Route::get('teaching/examples/fields', [PermissionDemoController::class, 'fieldsPermission'])
        ->middleware('permission:manage fields')
        ->name('teaching.examples.fields');

    Route::get('teaching/examples/inventory', [PermissionDemoController::class, 'inventoryRoleOrPermission'])
        ->middleware('role_or_permission:admin|manage inventory')
        ->name('teaching.examples.inventory');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('farms', [FarmController::class, 'index'])
        ->name('farms.index');

    Route::get('farms/create', [FarmController::class, 'create'])
        ->name('farms.create');

    Route::post('farms', [FarmController::class, 'store'])
        ->name('farms.store');

    Route::get('farms/{farm}', [FarmController::class, 'show'])
        ->name('farms.show');

    Route::get('farms/{farm}/edit', [FarmController::class, 'edit'])
        ->name('farms.edit');

    Route::patch('farms/{farm}', [FarmController::class, 'update'])
        ->name('farms.update');

    Route::get('fields', [FieldController::class, 'index'])
        ->name('fields.index');

    Route::get('fields/create', [FieldController::class, 'create'])
        ->name('fields.create');

    Route::post('fields', [FieldController::class, 'store'])
        ->name('fields.store');

    Route::get('fields/{field}', [FieldController::class, 'show'])
        ->name('fields.show');

    Route::get('fields/{field}/edit', [FieldController::class, 'edit'])
        ->name('fields.edit');

    Route::patch('fields/{field}', [FieldController::class, 'update'])
        ->name('fields.update');

    Route::get('crops', [CropController::class, 'index'])
        ->name('crops.index');

    Route::get('crops/create', [CropController::class, 'create'])
        ->name('crops.create');

    Route::post('crops', [CropController::class, 'store'])
        ->name('crops.store');

    Route::get('crops/{crop}', [CropController::class, 'show'])
        ->name('crops.show');

    Route::get('crops/{crop}/edit', [CropController::class, 'edit'])
        ->name('crops.edit');

    Route::patch('crops/{crop}', [CropController::class, 'update'])
        ->name('crops.update');

    Route::get('seasons', [SeasonController::class, 'index'])
        ->name('seasons.index');

    Route::get('seasons/create', [SeasonController::class, 'create'])
        ->name('seasons.create');

    Route::post('seasons', [SeasonController::class, 'store'])
        ->name('seasons.store');

    Route::get('seasons/{season}', [SeasonController::class, 'show'])
        ->name('seasons.show');

    Route::get('seasons/{season}/edit', [SeasonController::class, 'edit'])
        ->name('seasons.edit');

    Route::patch('seasons/{season}', [SeasonController::class, 'update'])
        ->name('seasons.update');

    Route::get('field-crop-assignments', [FieldCropAssignmentController::class, 'index'])
        ->name('field-crop-assignments.index');

    Route::get('field-crop-assignments/create', [FieldCropAssignmentController::class, 'create'])
        ->name('field-crop-assignments.create');

    Route::post('field-crop-assignments', [FieldCropAssignmentController::class, 'store'])
        ->name('field-crop-assignments.store');

    Route::get('field-crop-assignments/{fieldCropAssignment}', [FieldCropAssignmentController::class, 'show'])
        ->name('field-crop-assignments.show');

    Route::get('field-crop-assignments/{fieldCropAssignment}/edit', [FieldCropAssignmentController::class, 'edit'])
        ->name('field-crop-assignments.edit');

    Route::patch('field-crop-assignments/{fieldCropAssignment}', [FieldCropAssignmentController::class, 'update'])
        ->name('field-crop-assignments.update');

    Route::get('work-items', [WorkItemController::class, 'index'])
        ->name('work-items.index');

    Route::get('work-items/create', [WorkItemController::class, 'create'])
        ->name('work-items.create');

    Route::post('work-items', [WorkItemController::class, 'store'])
        ->name('work-items.store');

    Route::get('work-items/{workItem}', [WorkItemController::class, 'show'])
        ->name('work-items.show');

    Route::get('work-items/{workItem}/edit', [WorkItemController::class, 'edit'])
        ->name('work-items.edit');

    Route::patch('work-items/{workItem}', [WorkItemController::class, 'update'])
        ->name('work-items.update');

    Route::get('task-types', [TaskTypeController::class, 'index'])
        ->name('task-types.index');

    Route::get('task-types/create', [TaskTypeController::class, 'create'])
        ->name('task-types.create');

    Route::post('task-types', [TaskTypeController::class, 'store'])
        ->name('task-types.store');

    Route::get('task-types/{taskType}', [TaskTypeController::class, 'show'])
        ->name('task-types.show');

    Route::get('task-types/{taskType}/edit', [TaskTypeController::class, 'edit'])
        ->name('task-types.edit');

    Route::patch('task-types/{taskType}', [TaskTypeController::class, 'update'])
        ->name('task-types.update');

    Route::get('combined-tasks', [CombinedTaskController::class, 'index'])
        ->name('combined-tasks.index');

    Route::get('combined-tasks/create', [CombinedTaskController::class, 'create'])
        ->name('combined-tasks.create');

    Route::post('combined-tasks', [CombinedTaskController::class, 'store'])
        ->name('combined-tasks.store');

    Route::get('combined-tasks/{combinedTask}', [CombinedTaskController::class, 'show'])
        ->name('combined-tasks.show');

    Route::get('combined-tasks/{combinedTask}/edit', [CombinedTaskController::class, 'edit'])
        ->name('combined-tasks.edit');

    Route::patch('combined-tasks/{combinedTask}', [CombinedTaskController::class, 'update'])
        ->name('combined-tasks.update');

    Route::get('tasks', [TaskController::class, 'index'])
        ->name('tasks.index');

    Route::get('tasks/create', [TaskController::class, 'create'])
        ->name('tasks.create');

    Route::post('tasks', [TaskController::class, 'store'])
        ->name('tasks.store');

    Route::get('tasks/{task}', [TaskController::class, 'show'])
        ->name('tasks.show');

    Route::get('tasks/{task}/edit', [TaskController::class, 'edit'])
        ->name('tasks.edit');

    Route::patch('tasks/{task}', [TaskController::class, 'update'])
        ->name('tasks.update');

    Route::get('harvests', [HarvestController::class, 'index'])
        ->name('harvests.index');

    Route::get('harvests/create', [HarvestController::class, 'create'])
        ->name('harvests.create');

    Route::post('harvests', [HarvestController::class, 'store'])
        ->name('harvests.store');

    Route::get('harvests/{harvest}', [HarvestController::class, 'show'])
        ->name('harvests.show');

    Route::get('harvests/{harvest}/edit', [HarvestController::class, 'edit'])
        ->name('harvests.edit');

    Route::patch('harvests/{harvest}', [HarvestController::class, 'update'])
        ->name('harvests.update');

    Route::get('harvest-teams', [HarvestTeamController::class, 'index'])
        ->name('harvest-teams.index');

    Route::get('harvest-teams/create', [HarvestTeamController::class, 'create'])
        ->name('harvest-teams.create');

    Route::post('harvest-teams', [HarvestTeamController::class, 'store'])
        ->name('harvest-teams.store');

    Route::get('harvest-teams/{harvestTeam}', [HarvestTeamController::class, 'show'])
        ->name('harvest-teams.show');

    Route::get('harvest-teams/{harvestTeam}/edit', [HarvestTeamController::class, 'edit'])
        ->name('harvest-teams.edit');

    Route::patch('harvest-teams/{harvestTeam}', [HarvestTeamController::class, 'update'])
        ->name('harvest-teams.update');

    Route::get('harvest-entries', [HarvestEntryController::class, 'index'])
        ->name('harvest-entries.index');

    Route::get('harvest-entries/create', [HarvestEntryController::class, 'create'])
        ->name('harvest-entries.create');

    Route::post('harvest-entries', [HarvestEntryController::class, 'store'])
        ->name('harvest-entries.store');

    Route::get('harvest-entries/{harvestEntry}', [HarvestEntryController::class, 'show'])
        ->name('harvest-entries.show');

    Route::get('harvest-entries/{harvestEntry}/edit', [HarvestEntryController::class, 'edit'])
        ->name('harvest-entries.edit');

    Route::patch('harvest-entries/{harvestEntry}', [HarvestEntryController::class, 'update'])
        ->name('harvest-entries.update');

    Route::get('harvest-losses', [HarvestLossController::class, 'index'])
            ->name('harvest-losses.index');

    Route::get('harvest-losses/create', [HarvestLossController::class, 'create'])
        ->name('harvest-losses.create');

    Route::post('harvest-losses', [HarvestLossController::class, 'store'])
        ->name('harvest-losses.store');

    Route::get('harvest-losses/{harvestLoss}', [HarvestLossController::class, 'show'])
        ->name('harvest-losses.show');

    Route::get('harvest-losses/{harvestLoss}/edit', [HarvestLossController::class, 'edit'])
        ->name('harvest-losses.edit');

    Route::patch('harvest-losses/{harvestLoss}', [HarvestLossController::class, 'update'])
        ->name('harvest-losses.update');

});

require __DIR__.'/settings.php';
