<?php

namespace App\Http\Controllers;

use App\Enums\HarvestStatus;
use App\Http\Requests\StoreHarvestRequest;
use App\Http\Requests\UpdateHarvestRequest;
use App\Models\FieldCropAssignment;
use App\Models\Harvest;
use App\Models\HarvestEntry;
use App\Models\HarvestLoss;
use App\Services\HarvestService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HarvestController extends Controller
{
    public function __construct(
        protected HarvestService $harvestService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Harvest::class);

        // Подгружаем все необходимые связи
        $harvests = Harvest::query()
            ->with([
                'creator:id,name,email',
                'fieldCropAssignment.field.farm:id,name',
                'fieldCropAssignment.crop:id,name',
                'fieldCropAssignment.season:id,year,name',
                'harvestEntries:id,harvest_id,quantity,unit,quality_note',
                'harvestLosses:id,harvest_id,quantity,unit',
            ])
            ->latest()
            ->get()
            ->map(fn(Harvest $harvest) => [
                'id' => $harvest->id,
                'name' => $harvest->name,
                'started_at' => $harvest->started_at?->toDateString(),
                'ended_at' => $harvest->ended_at?->toDateString(),
                'status' => $harvest->status->value,
                'notes' => $harvest->notes,
                'harvestEntries' => $harvest->harvestEntries->map(fn($entry) => [
                    'quantity' => $entry->quantity,
                    'unit' => $entry->unit,
                    'quality_note' => $entry->quality_note,
                ]),
                'harvestLosses' => $harvest->harvestLosses->map(fn($loss) => [
                    'quantity' => $loss->quantity,
                    'unit' => $loss->unit,
                ]),
                'fieldCropAssignment' => [
                    'field' => [
                        'id' => $harvest->fieldCropAssignment?->field?->id,
                        'name' => $harvest->fieldCropAssignment?->field?->name,
                        'farm' => [
                            'id' => $harvest->fieldCropAssignment?->field?->farm?->id,
                            'name' => $harvest->fieldCropAssignment?->field?->farm?->name,
                        ],
                    ],
                    'crop' => [
                        'id' => $harvest->fieldCropAssignment?->crop?->id,
                        'name' => $harvest->fieldCropAssignment?->crop?->name,
                    ],
                    'season' => [
                        'id' => $harvest->fieldCropAssignment?->season?->id,
                        'name' => $harvest->fieldCropAssignment?->season?->name,
                        'year' => $harvest->fieldCropAssignment?->season?->year,
                    ],
                ],
                'creator' => [
                    'id' => $harvest->creator?->id,
                    'name' => $harvest->creator?->name,
                    'email' => $harvest->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $harvest) ?? false,
                    'update' => $request->user()?->can('update', $harvest) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('harvests/index', [
            'harvests' => $harvests,
            'statuses' => HarvestStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Harvest::class);

        return Inertia::render('harvests/create', [
            'statuses' => HarvestStatus::values(),
            'fieldCropAssignments' => FieldCropAssignment::query()
                ->with([
                    'field:id,farm_id,name',
                    'field.farm:id,name,location',
                    'crop:id,name',
                    'season:id,name,year',
                ])
                ->latest()
                ->get()
                ->map(fn(FieldCropAssignment $fca) => [
                    'id' => $fca->id,
                    'label' => sprintf(
                        '%s / %s / %s %s',
                        $fca->field?->name,
                        $fca->crop?->name,
                        $fca->season?->name,
                        $fca->season?->year
                    ),
                ])
                ->values(),
        ]);
    }

    public function store(StoreHarvestRequest $request): RedirectResponse
    {
        $this->authorize('create', Harvest::class);

        $this->harvestService->create($request->validated(), $request->user());

        return redirect()
            ->route('harvests.index')
            ->with('success', 'Die Ernte wurde erfolgreich angelegt.');
    }

    public function show(Harvest $harvest): Response
    {
        $this->authorize('view', $harvest);

        $harvest->load([
            'creator:id,name,email',
            'fieldCropAssignment.field.farm:id,name',
            'fieldCropAssignment.crop:id,name,category',
            'fieldCropAssignment.season:id,year,name,starts_on,ends_on',
            'harvestEntries:id,harvest_id,quantity,unit,quality_note',
            'harvestLosses:id,harvest_id,quantity,unit',
        ]);

        return Inertia::render('harvests/show', [
            'harvest' => [
                'id' => $harvest->id,
                'name' => $harvest->name,
                'started_at' => $harvest->started_at?->toDateString(),
                'ended_at' => $harvest->ended_at?->toDateString(),
                'status' => $harvest->status->value,
                'notes' => $harvest->notes,
                'harvestEntries' => $harvest->harvestEntries->map(fn($entry) => [
                    'quantity' => $entry->quantity,
                    'unit' => $entry->unit,
                    'quality_note' => $entry->quality_note,
                ]),
                'harvestLosses' => $harvest->harvestLosses->map(fn($loss) => [
                    'quantity' => $loss->quantity,
                    'unit' => $loss->unit,
                ]),
                'fieldCropAssignment' => [
                    'field' => [
                        'id' => $harvest->fieldCropAssignment?->field?->id,
                        'name' => $harvest->fieldCropAssignment?->field?->name,
                        'size_hectares' => $harvest->fieldCropAssignment?->field?->size_hectares,
                        'farm' => [
                            'id' => $harvest->fieldCropAssignment?->field?->farm?->id,
                            'name' => $harvest->fieldCropAssignment?->field?->farm?->name,
                        ],
                    ],
                    'crop' => [
                        'id' => $harvest->fieldCropAssignment?->crop?->id,
                        'name' => $harvest->fieldCropAssignment?->crop?->name,
                        'category' => $harvest->fieldCropAssignment?->crop?->category?->value,
                    ],
                    'season' => [
                        'id' => $harvest->fieldCropAssignment?->season?->id,
                        'name' => $harvest->fieldCropAssignment?->season?->name,
                        'year' => $harvest->fieldCropAssignment?->season?->year,
                        'starts_on' => $harvest->fieldCropAssignment?->season?->starts_on?->toDateString(),
                        'ends_on' => $harvest->fieldCropAssignment?->season?->ends_on?->toDateString(),
                    ],
                ],
                'creator' => [
                    'id' => $harvest->creator?->id,
                    'name' => $harvest->creator?->name,
                    'email' => $harvest->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $harvest) ?? false,
                ],
            ],
        ]);
    }

    public function edit(Harvest $harvest): Response
    {
        $this->authorize('update', $harvest);

        return Inertia::render('harvests/edit', [
            'statuses' => HarvestStatus::values(),
            'fieldCropAssignments' => FieldCropAssignment::query()
                ->with([
                    'field:id,farm_id,name',
                    'field.farm:id,name',
                    'crop:id,name',
                    'season:id,name',
                ])
                ->latest()
                ->get()
                ->map(fn(FieldCropAssignment $fca) => [
                    'id' => $fca->id,
                    'label' => sprintf(
                        '%s / %s / %s %s',
                        $fca->field?->name,
                        $fca->crop?->name,
                        $fca->season?->name,
                        $fca->season?->year
                    ),
                ])
                ->values(),
            'harvest' => [
                'id' => $harvest->id,
                'name' => $harvest->name,
                'field_crop_assignment_id' => $harvest->field_crop_assignment_id,
                'started_at' => $harvest->started_at?->toDateString(),
                'ended_at' => $harvest->ended_at?->toDateString(),
                'status' => $harvest->status->value,
                'notes' => $harvest->notes,
            ],
        ]);
    }

    public function update(UpdateHarvestRequest $request, Harvest $harvest): RedirectResponse
    {
        $this->authorize('update', $harvest);

        $this->harvestService->update($harvest, $request->validated());

        return redirect()
            ->route('harvests.show', $harvest)
            ->with('success', 'Die Ernte wurde erfolgreich aktualisiert.');
    }
}
