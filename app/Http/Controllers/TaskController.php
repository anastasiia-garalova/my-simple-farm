<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\CombinedTask;
use App\Models\Field;
use App\Models\Season;
use App\Models\Task;
use App\Models\TaskType;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TaskController extends Controller
{
    public function __construct(protected TaskService $taskService)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Task::class);

        $tasks = Task::with([
            'field:id,name',
            'season:id,name',
            'taskType:id,name',
            'combinedTask:id,name',
            'creator:id,name'
        ])
            ->orderBy('planned_for', 'asc')
            ->latest()
            ->get()
            ->map(fn(Task $task) => [
                'id' => $task->id,
                'title' => $task->title,
                'field' => $task->field?->name,
                'season' => $task->season?->name,
                'task_type' => $task->taskType?->name,
                'combined_task' => $task->combinedTask?->name,
                'status' => $task->status->value,
                'planned_for' => $task->planned_for->format('Y-m-d H:i'),
                'creator' => [
                    'id' => $task->creator?->id,
                    'name' => $task->creator?->name,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $task) ?? false,
                    'update' => $request->user()?->can('update', $task) ?? false,
                ],
            ]);

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'statuses' => TaskStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Task::class);

        return Inertia::render('tasks/create', [
            'statuses' => TaskStatus::values(),

            'fields' => Field::select('id', 'name')->get(),
            'seasons' => Season::select('id', 'name')->get(),
            'taskTypes' => TaskType::select('id', 'name')->get(),
            'combinedTasks' => CombinedTask::select('id', 'name')->get(),
        ]);
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $this->authorize('create', Task::class);

        $this->taskService->create($request->validated(), $request->user());

        return redirect()->route('tasks.index')->with('success', 'Task wurde erfolgreich erstellt.');
    }

    public function show(Task $task): Response
    {
        $this->authorize('view', $task);

        $task->load(['field', 'season', 'taskType', 'combinedTask', 'creator']);

        return Inertia::render('tasks/show', [
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'field' => $task->field?->name,
                'season' => $task->season?->name,
                'task_type' => $task->taskType?->name,
                'combined_task' => $task->combinedTask?->name,
                'status' => $task->status->value,
                'planned_for' => $task->planned_for->format('Y-m-d H:i'),
                'notes' => $task->notes,
                'creator' => [
                    'id' => $task->creator?->id,
                    'name' => $task->creator?->name,
                ],
            ],
        ]);
    }

    public function edit(Task $task): Response
    {
        $this->authorize('update', $task);

        return Inertia::render('tasks/edit', [
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'field_id' => $task->field_id,
                'season_id' => $task->season_id,
                'task_type_id' => $task->task_type_id,
                'combined_task_id' => $task->combined_task_id,
                'status' => $task->status->value,
                'planned_for' => $task->planned_for->format('Y-m-d H:i'),
                'notes' => $task->notes,
            ],
            'statuses' => TaskStatus::values(),

            'fields' => Field::select('id', 'name')->get(),
            'seasons' => Season::select('id', 'name')->get(),
            'taskTypes' => TaskType::select('id', 'name')->get(),
            'combinedTasks' => CombinedTask::select('id', 'name')->get(),
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $this->taskService->update($task, $request->validated());

        return redirect()->route('tasks.show', $task)->with('success', 'Task wurde erfolgreich aktualisiert.');
    }
}
