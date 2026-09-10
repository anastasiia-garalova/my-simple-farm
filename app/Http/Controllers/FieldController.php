<?php

namespace App\Http\Controllers;

use App\Enums\FieldStatus;
use App\Http\Requests\StoreFieldRequest;
use App\Http\Requests\UpdateFieldRequest;
use App\Models\Farm;
use App\Models\Field;
use App\Services\FieldService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class FieldController extends Controller
{
    public function __construct(
        protected FieldService $fieldService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Field::class);

        $fields = Field::query()
            ->with(['farm:id,name,location', 'creator:id,name,email'])
            ->latest()
            ->get()
            ->map(fn (Field $field) => [
                'id' => $field->id,
                'name' => $field->name,
                'size_hectares' => $field->size_hectares,
                'soil_type' => $field->soil_type,
                'status' => $field->status->value,
                'created_at' => $field->created_at?->toDateTimeString(),
                'farm' => [
                    'id' => $field->farm?->id,
                    'name' => $field->farm?->name,
                    'location' => $field->farm?->location,
                ],
                'creator' => [
                    'id' => $field->creator?->id,
                    'name' => $field->creator?->name,
                    'email' => $field->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $field) ?? false,
                    'update' => $request->user()?->can('update', $field) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('fields/index', [
            'fields' => $fields,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Field::class);

        return Inertia::render('fields/create', [
            'statuses' => FieldStatus::values(),
            'farms' => Farm::query()
                ->orderBy('name')
                ->get(['id', 'name', 'location'])
                ->map(fn (Farm $farm) => [
                    'id' => $farm->id,
                    'name' => $farm->name,
                    'location' => $farm->location,
                ])
                ->values(),
        ]);
    }

    public function store(StoreFieldRequest $request): RedirectResponse
    {
        $this->authorize('create', Field::class);

        $this->fieldService->create($request->validated(), $request->user());

        return redirect()
            ->route('fields.index')
            ->with('success', 'Das Feld wurde erfolgreich angelegt.');
    }

    public function show(Field $field): Response
    {
        $this->authorize('view', $field);

        $field->load(['farm:id,name,location', 'creator:id,name,email']);

        return Inertia::render('fields/show', [
            'field' => [
                'id' => $field->id,
                'name' => $field->name,
                'size_hectares' => $field->size_hectares,
                'soil_type' => $field->soil_type,
                'status' => $field->status->value,
                'created_at' => $field->created_at?->toDateTimeString(),
                'farm' => [
                    'id' => $field->farm?->id,
                    'name' => $field->farm?->name,
                    'location' => $field->farm?->location,
                ],
                'creator' => [
                    'id' => $field->creator?->id,
                    'name' => $field->creator?->name,
                    'email' => $field->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $field) ?? false,
                ],
            ],
        ]);
    }

    public function edit(Field $field): Response
    {
        $this->authorize('update', $field);

        return Inertia::render('fields/edit', [
            'statuses' => FieldStatus::values(),
            'farms' => Farm::query()
                ->orderBy('name')
                ->get(['id', 'name', 'location'])
                ->map(fn (Farm $farm) => [
                    'id' => $farm->id,
                    'name' => $farm->name,
                    'location' => $farm->location,
                ])
                ->values(),
            'field' => [
                'id' => $field->id,
                'farm_id' => $field->farm_id,
                'name' => $field->name,
                'size_hectares' => $field->size_hectares,
                'soil_type' => $field->soil_type,
                'status' => $field->status->value,
            ],
        ]);
    }

    public function update(UpdateFieldRequest $request, Field $field): RedirectResponse
    {
        $this->authorize('update', $field);

        $this->fieldService->update($field, $request->validated());

        return redirect()
            ->route('fields.show', $field)
            ->with('success', 'Das Feld wurde erfolgreich aktualisiert.');
    }
}
