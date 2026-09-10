<?php

namespace App\Http\Controllers;

use App\Enums\CombinedTaskStatus;
use App\Http\Requests\StoreCombinedTaskRequest;
use App\Http\Requests\UpdateCombinedTaskRequest;
use App\Models\CombinedTask;
use App\Models\TaskType;
use App\Services\CombinedTaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class CombinedTaskController extends Controller
{
    public function __construct(protected CombinedTaskService $combinedTaskService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', CombinedTask::class);

        $combinedTasks = CombinedTask::with([
            'taskTypes:id,name',
            'tasks:id,title,status,combined_task_id',
            'creator:id,name'
        ])
            ->latest()
            ->get()
            ->map(fn(CombinedTask $combinedTask) => [
                'id' => $combinedTask->id,
                'name' => $combinedTask->name,
                'description' => $combinedTask->description,
                'status' => $combinedTask->status->value,
                'task_types' => $combinedTask->taskTypes
                    ->map(fn($type) => [
                        'id' => $type->id,
                        'name' => $type->name,
                    ])
                ->values(),
                'tasks' => $combinedTask->tasks
                    ->map(fn($task) => [
                        'id' => $task->id,
                        'title' => $task->title,
                        'status' => $task->status->value,
                    ])
                    ->values(),
                'creator' => [
                    'id' => $combinedTask->creator?->id,
                    'name' => $combinedTask->creator?->name,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $combinedTask) ?? false,
                    'update' => $request->user()?->can('update', $combinedTask) ?? false,
                ],
            ]);

        return Inertia::render('combined-tasks/index', [
            'combinedTasks' => $combinedTasks,
            'statuses' => CombinedTaskStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', CombinedTask::class);

        return Inertia::render('combined-tasks/create', [
            'statuses' => CombinedTaskStatus::values(),
            'combinedTasks' => TaskType::query()
                ->latest()
                ->get()
                ->map(fn(TaskType $taskType) => [
                    'id' => $taskType->id,
                    'name' => $taskType->name,
                ])
        ]);
    }

    public function store(StoreCombinedTaskRequest $request): RedirectResponse
    {
        $this->authorize('create', CombinedTask::class);

        $this->combinedTaskService->create($request->validated(), $request->user());

        return redirect()->route('combined-tasks.index')->with('success', 'CombinedTask erfolgreich erstellt.');
    }

    public function show(CombinedTask $combinedTask): Response
    {
        $this->authorize('view', $combinedTask);

        $combinedTask->load(['taskTypes', 'tasks', 'creator']);

        return Inertia::render('combined-tasks/show', [
            'combinedTask' => [
                'id' => $combinedTask->id,
                'name' => $combinedTask->name,
                'description' => $combinedTask->description,
                'status' => $combinedTask->status->value,
                'task_types' => $combinedTask->taskTypes
                    ->map(fn($t) => ['id' => $t->id, 'name' => $t->name])
                    ->values(),
                'tasks' => $combinedTask->tasks
                    ->map(fn($task) => [
                    'id' => $task->id,
                    'name' => $task->title,
                    'status' => $task->status->value,
                ])
                    ->values(),
                'creator' => [
                    'id' => $combinedTask->creator?->id,
                    'name' => $combinedTask->creator?->name,
                ],
            ],
        ]);
    }

    public function edit(CombinedTask $combinedTask): Response
    {
        $this->authorize('update', $combinedTask);

        return Inertia::render('combined-tasks/edit', [
            'combinedTask' => [
                'id' => $combinedTask->id,
                'name' => $combinedTask->name,
                'description' => $combinedTask->description,
                'status' => $combinedTask->status->value,
                'task_type_ids' => $combinedTask->taskTypes->pluck('id'),
            ],
            'statuses' => CombinedTaskStatus::values(),
            'combinedTasks' => TaskType::query()
                ->latest()
                ->get()
                ->map(fn(TaskType $taskType) => [
                    'id' => $taskType->id,
                    'name' => $taskType->name,
                ])
        ]);
    }

    public function update(UpdateCombinedTaskRequest $request, CombinedTask $combinedTask): RedirectResponse
    {
        $this->authorize('update', $combinedTask);

        $this->combinedTaskService->update($combinedTask, $request->validated());

        return redirect()->route('combined-tasks.show', $combinedTask)
            ->with('success', 'CombinedTask erfolgreich aktualisiert.');
    }
}
