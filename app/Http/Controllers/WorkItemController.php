<?php

namespace App\Http\Controllers;

use App\Enums\WorkItemStatus;
use App\Http\Requests\StoreWorkItemRequest;
use App\Http\Requests\UpdateWorkItemRequest;
use App\Models\WorkItem;
use App\Services\WorkItemService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class WorkItemController extends Controller
{
    public function __construct(
        protected WorkItemService $workItemService
    ) {
    }

    /**
     * Display a listing of the work items.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', WorkItem::class);

        $workItems = WorkItem::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (WorkItem $workItem) => [
                'id' => $workItem->id,
                'title' => $workItem->title,
                'description' => $workItem->description,
                'status' => $workItem->status->value,
                'created_at' => $workItem->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $workItem->creator?->id,
                    'name' => $workItem->creator?->name,
                    'email' => $workItem->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $workItem) ?? false,
                    'update' => $request->user()?->can('update', $workItem) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('work-items/index', [
            'workItems' => $workItems,
        ]);
    }

    /**
     * Show the form for creating a new work item.
     */
    public function create(): Response
    {
        $this->authorize('create', WorkItem::class);

        return Inertia::render('work-items/create', [
            'statuses' => WorkItemStatus::values(),
        ]);
    }

    /**
     * Display the specified work item.
     */
    public function show(WorkItem $workItem): Response
    {
        $this->authorize('view', $workItem);

        $workItem->load('creator:id,name,email');

        return Inertia::render('work-items/show', [
            'workItem' => [
                'id' => $workItem->id,
                'title' => $workItem->title,
                'description' => $workItem->description,
                'status' => $workItem->status->value,
                'created_at' => $workItem->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $workItem->creator?->id,
                    'name' => $workItem->creator?->name,
                    'email' => $workItem->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $workItem) ?? false,
                ],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified work item.
     */
    public function edit(WorkItem $workItem): Response
    {
        $this->authorize('update', $workItem);

        return Inertia::render('work-items/edit', [
            'statuses' => WorkItemStatus::values(),
            'workItem' => [
                'id' => $workItem->id,
                'title' => $workItem->title,
                'description' => $workItem->description,
                'status' => $workItem->status->value,
            ],
        ]);
    }

    /**
     * Store a newly created work item.
     */
    public function store(StoreWorkItemRequest $request): RedirectResponse
    {
        $this->authorize('create', WorkItem::class);

        $this->workItemService->create(
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('work-items.index')
            ->with('success', 'Das Work Item wurde erfolgreich gespeichert.');
    }

    /**
     * Update the specified work item.
     */
    public function update(UpdateWorkItemRequest $request, WorkItem $workItem): RedirectResponse
    {
        $this->authorize('update', $workItem);

        $this->workItemService->update($workItem, $request->validated());

        return redirect()
            ->route('work-items.show', $workItem)
            ->with('success', 'Das Work Item wurde erfolgreich aktualisiert.');
    }
}
