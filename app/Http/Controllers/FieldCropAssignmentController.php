<?php

namespace App\Http\Controllers;

use App\Enums\FieldCropAssignmentStatus;
use App\Http\Requests\StoreFieldCropAssignmentRequest;
use App\Http\Requests\UpdateFieldCropAssignmentRequest;
use App\Models\Crop;
use App\Models\Field;
use App\Models\FieldCropAssignment;
use App\Models\Season;
use App\Services\FieldCropAssignmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class FieldCropAssignmentController extends Controller
{
    public function __construct(
        protected FieldCropAssignmentService $fieldCropAssignmentService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', FieldCropAssignment::class);

        $assignments = FieldCropAssignment::query()
            ->with([
                'field:id,farm_id,name',
                'field.farm:id,name,location',
                'crop:id,name',
                'season:id,name,year',
                'creator:id,name,email',
            ])
            ->latest()
            ->get()
            ->map(fn (FieldCropAssignment $fieldCropAssignment) => [
                'id' => $fieldCropAssignment->id,
                'status' => $fieldCropAssignment->status->value,
                'planned_area_hectares' => $fieldCropAssignment->planned_area_hectares,
                'notes' => $fieldCropAssignment->notes,
                'created_at' => $fieldCropAssignment->created_at?->toDateTimeString(),
                'field' => [
                    'id' => $fieldCropAssignment->field?->id,
                    'name' => $fieldCropAssignment->field?->name,
                    'farm' => [
                        'id' => $fieldCropAssignment->field?->farm?->id,
                        'name' => $fieldCropAssignment->field?->farm?->name,
                        'location' => $fieldCropAssignment->field?->farm?->location,
                    ],
                ],
                'crop' => [
                    'id' => $fieldCropAssignment->crop?->id,
                    'name' => $fieldCropAssignment->crop?->name,
                ],
                'season' => [
                    'id' => $fieldCropAssignment->season?->id,
                    'name' => $fieldCropAssignment->season?->name,
                    'year' => $fieldCropAssignment->season?->year,
                ],
                'creator' => [
                    'id' => $fieldCropAssignment->creator?->id,
                    'name' => $fieldCropAssignment->creator?->name,
                    'email' => $fieldCropAssignment->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $fieldCropAssignment) ?? false,
                    'update' => $request->user()?->can('update', $fieldCropAssignment) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('field-crop-assignments/index', [
            'assignments' => $assignments,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FieldCropAssignment::class);

        return Inertia::render('field-crop-assignments/create', [
            'statuses' => FieldCropAssignmentStatus::values(),
            'fields' => Field::query()
                ->with('farm:id,name,location')
                ->orderBy('name')
                ->get(['id', 'farm_id', 'name'])
                ->map(fn (Field $field) => [
                    'id' => $field->id,
                    'name' => $field->name,
                    'farm_name' => $field->farm?->name,
                    'farm_location' => $field->farm?->location,
                ])
                ->values(),
            'crops' => Crop::query()
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Crop $crop) => [
                    'id' => $crop->id,
                    'name' => $crop->name,
                ])
                ->values(),
            'seasons' => Season::query()
                ->orderByDesc('year')
                ->orderBy('name')
                ->get(['id', 'name', 'year'])
                ->map(fn (Season $season) => [
                    'id' => $season->id,
                    'name' => $season->name,
                    'year' => $season->year,
                ])
                ->values(),
        ]);
    }

    public function store(StoreFieldCropAssignmentRequest $request): RedirectResponse
    {
        $this->authorize('create', FieldCropAssignment::class);

        $this->fieldCropAssignmentService->create($request->validated(), $request->user());

        return redirect()
            ->route('field-crop-assignments.index')
            ->with('success', 'Die Feld-Kultur-Zuordnung wurde erfolgreich angelegt.');
    }

    public function show(FieldCropAssignment $fieldCropAssignment): Response
    {
        $this->authorize('view', $fieldCropAssignment);

        $fieldCropAssignment->load([
            'field:id,farm_id,name,size_hectares',
            'field.farm:id,name,location',
            'crop:id,name,category',
            'season:id,name,year,starts_on,ends_on',
            'creator:id,name,email',
        ]);

        return Inertia::render('field-crop-assignments/show', [
            'assignment' => [
                'id' => $fieldCropAssignment->id,
                'status' => $fieldCropAssignment->status->value,
                'planned_area_hectares' => $fieldCropAssignment->planned_area_hectares,
                'notes' => $fieldCropAssignment->notes,
                'created_at' => $fieldCropAssignment->created_at?->toDateTimeString(),
                'field' => [
                    'id' => $fieldCropAssignment->field?->id,
                    'name' => $fieldCropAssignment->field?->name,
                    'size_hectares' => $fieldCropAssignment->field?->size_hectares,
                    'farm' => [
                        'id' => $fieldCropAssignment->field?->farm?->id,
                        'name' => $fieldCropAssignment->field?->farm?->name,
                        'location' => $fieldCropAssignment->field?->farm?->location,
                    ],
                ],
                'crop' => [
                    'id' => $fieldCropAssignment->crop?->id,
                    'name' => $fieldCropAssignment->crop?->name,
                    'category' => $fieldCropAssignment->crop?->category?->value,
                ],
                'season' => [
                    'id' => $fieldCropAssignment->season?->id,
                    'name' => $fieldCropAssignment->season?->name,
                    'year' => $fieldCropAssignment->season?->year,
                    'starts_on' => $fieldCropAssignment->season?->starts_on?->toDateString(),
                    'ends_on' => $fieldCropAssignment->season?->ends_on?->toDateString(),
                ],
                'creator' => [
                    'id' => $fieldCropAssignment->creator?->id,
                    'name' => $fieldCropAssignment->creator?->name,
                    'email' => $fieldCropAssignment->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $fieldCropAssignment) ?? false,
                ],
            ],
        ]);
    }

    public function edit(FieldCropAssignment $fieldCropAssignment): Response
    {
        $this->authorize('update', $fieldCropAssignment);

        return Inertia::render('field-crop-assignments/edit', [
            'statuses' => FieldCropAssignmentStatus::values(),
            'fields' => Field::query()
                ->with('farm:id,name,location')
                ->orderBy('name')
                ->get(['id', 'farm_id', 'name'])
                ->map(fn (Field $field) => [
                    'id' => $field->id,
                    'name' => $field->name,
                    'farm_name' => $field->farm?->name,
                    'farm_location' => $field->farm?->location,
                ])
                ->values(),
            'crops' => Crop::query()
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Crop $crop) => [
                    'id' => $crop->id,
                    'name' => $crop->name,
                ])
                ->values(),
            'seasons' => Season::query()
                ->orderByDesc('year')
                ->orderBy('name')
                ->get(['id', 'name', 'year'])
                ->map(fn (Season $season) => [
                    'id' => $season->id,
                    'name' => $season->name,
                    'year' => $season->year,
                ])
                ->values(),
            'assignment' => [
                'id' => $fieldCropAssignment->id,
                'field_id' => $fieldCropAssignment->field_id,
                'crop_id' => $fieldCropAssignment->crop_id,
                'season_id' => $fieldCropAssignment->season_id,
                'status' => $fieldCropAssignment->status->value,
                'planned_area_hectares' => $fieldCropAssignment->planned_area_hectares,
                'notes' => $fieldCropAssignment->notes,
            ],
        ]);
    }

    public function update(UpdateFieldCropAssignmentRequest $request, FieldCropAssignment $fieldCropAssignment): RedirectResponse
    {
        $this->authorize('update', $fieldCropAssignment);

        $this->fieldCropAssignmentService->update($fieldCropAssignment, $request->validated());

        return redirect()
            ->route('field-crop-assignments.show', $fieldCropAssignment)
            ->with('success', 'Die Feld-Kultur-Zuordnung wurde erfolgreich aktualisiert.');
    }
}
