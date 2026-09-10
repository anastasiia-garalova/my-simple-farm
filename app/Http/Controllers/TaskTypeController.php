<?php

namespace App\Http\Controllers;

use App\Enums\TaskTypeCategory;
use App\Enums\TaskTypeStatus;
use App\Http\Requests\StoreTaskTypeRequest;
use App\Http\Requests\UpdateTaskTypeRequest;
use App\Models\TaskType;
use App\Services\TaskTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TaskTypeController extends Controller
{
    public function __construct(
        protected TaskTypeService $taskTypeService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TaskType::class);

        $taskTypes = TaskType::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (TaskType $taskType) => [
                'id' => $taskType->id,
                'name' => $taskType->name,
                'category' => $taskType->category->value,
                'default_unit' => $taskType->default_unit,
                'status' => $taskType->status->value,
                'creator' => [
                    'id' => $taskType->creator?->id,
                    'name' => $taskType->creator?->name,
                    'email' => $taskType->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $taskType) ?? false,
                    'update' => $request->user()?->can('update', $taskType) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('task-types/index', [
            'taskTypes' => $taskTypes,
            'statuses' => TaskTypeStatus::values(),
            'categories' => TaskTypeCategory::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TaskType::class);

        return Inertia::render('task-types/create', [
            'statuses' => TaskTypeStatus::values(),
            'categories' => TaskTypeCategory::values(),
        ]);
    }

    public function store(StoreTaskTypeRequest $request): RedirectResponse
    {
        $this->authorize('create', TaskType::class);

        $this->taskTypeService->create($request->validated(), $request->user());

        return redirect()
            ->route('task-types.index')
            ->with('success', 'Die TaskType wurde erfolgreich angelegt.');
    }

    public function show(TaskType $taskType): Response
    {
        $this->authorize('view', $taskType);

        $taskType->load('creator:id,name,email');

        return Inertia::render('task-types/show', [
            'taskType' => [
                'id' => $taskType->id,
                'name' => $taskType->name,
                'category' => $taskType->category->value,
                'default_unit' => $taskType->default_unit,
                'status' => $taskType->status->value,
                'creator' => [
                    'id' => $taskType->creator?->id,
                    'name' => $taskType->creator?->name,
                    'email' => $taskType->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $taskType) ?? false,
                ],
            ],
        ]);
    }

    public function edit(TaskType $taskType): Response
    {
        $this->authorize('update', $taskType);

        return Inertia::render('task-types/edit', [
            'statuses' => TaskTypeStatus::values(),
            'categories' => TaskTypeCategory::values(),
            'taskType' => [
                'id' => $taskType->id,
                'name' => $taskType->name,
                'category' => $taskType->category->value,
                'default_unit' => $taskType->default_unit,
                'status' => $taskType->status->value,
            ],
        ]);
    }

    public function update(UpdateTaskTypeRequest $request, TaskType $taskType): RedirectResponse
    {
        $this->authorize('update', $taskType);

        $this->taskTypeService->update($taskType, $request->validated());

        return redirect()
            ->route('task-types.show', $taskType)
            ->with('success', 'Die Saison wurde erfolgreich aktualisiert.');
    }
}
