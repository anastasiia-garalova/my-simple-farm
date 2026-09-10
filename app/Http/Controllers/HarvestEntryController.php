<?php

namespace App\Http\Controllers;

use App\Enums\HarvestEntryQualityNote;
use App\Enums\HarvestEntryUnit;
use App\Http\Requests\StoreHarvestEntryRequest;
use App\Http\Requests\UpdateHarvestEntryRequest;
use App\Models\Harvest;
use App\Models\HarvestEntry;
use App\Services\HarvestEntryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HarvestEntryController extends Controller
{
    public function __construct(
        protected HarvestEntryService $harvestEntryService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', HarvestEntry::class);

        $harvestEntrys = HarvestEntry::query()
            ->with([
                'harvest:id,name',
                'creator:id,name,email'
            ])
            ->latest()
            ->get()
            ->map(fn (HarvestEntry $harvestEntry) => [
                'id' => $harvestEntry->id,
                'quantity' => $harvestEntry->quantity,
                'unit' => $harvestEntry->unit?->value,
                'quality_note' => $harvestEntry->quality_note?->value,
                'recorded_at' => $harvestEntry->recorded_at?->toDateString(),
                'harvest' => [
                    'id' => $harvestEntry->harvest?->id,
                    'name' => $harvestEntry->harvest?->name,
                ],
                'creator' => [
                    'id' => $harvestEntry->creator?->id,
                    'name' => $harvestEntry->creator?->name,
                    'email' => $harvestEntry->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $harvestEntry) ?? false,
                    'update' => $request->user()?->can('update', $harvestEntry) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('harvest-entries/index', [
            'harvestEntrys' => $harvestEntrys,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', HarvestEntry::class);

        return Inertia::render('harvest-entries/create', [
            'units' => HarvestEntryUnit::values(),
            'quality_notes' => HarvestEntryQualityNote::values(),
            'harvests' => Harvest::query()
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Harvest $harvest) => [
                    'id' => $harvest->id,
                    'name' => $harvest->name,
                ])
                ->values(),
        ]);
    }

    public function store(StoreHarvestEntryRequest $request): RedirectResponse
    {
        $this->authorize('create', HarvestEntry::class);

        $this->harvestEntryService->create($request->validated(), $request->user());

        return redirect()
            ->route('harvest-entries.index')
            ->with('success', 'Das Feld wurde erfolgreich angelegt.');
    }

    public function show(HarvestEntry $harvestEntry): Response
    {
        $this->authorize('view', $harvestEntry);

        $harvestEntry->load(['harvest:id,name', 'creator:id,name,email']);

        return Inertia::render('harvest-entries/show', [
            'harvestEntry' => [
                'id' => $harvestEntry->id,
                'quantity' => $harvestEntry->quantity,
                'unit' => $harvestEntry->unit?->value,
                'quality_note' => $harvestEntry->quality_note?->value,
                'recorded_at' => $harvestEntry->recorded_at?->toDateString(),
                'harvest' => [
                    'id' => $harvestEntry->harvest?->id,
                    'name' => $harvestEntry->harvest?->name,
                ],
                'creator' => [
                    'id' => $harvestEntry->creator?->id,
                    'name' => $harvestEntry->creator?->name,
                    'email' => $harvestEntry->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $harvestEntry) ?? false,
                ],
            ],
        ]);
    }

    public function edit(HarvestEntry $harvestEntry): Response
    {
        $this->authorize('update', $harvestEntry);

        return Inertia::render('harvest-entries/edit', [
            'units' => HarvestEntryUnit::values(),
            'quality_notes' => HarvestEntryQualityNote::values(),
            'harvests' => Harvest::query()
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Harvest $harvest) => [
                    'id' => $harvest->id,
                    'name' => $harvest->name,
                ])
                ->values(),
            'harvestEntry' => [
                'id' => $harvestEntry->id,
                'quantity' => $harvestEntry->quantity,
                'unit' => $harvestEntry->unit?->value,
                'quality_note' => $harvestEntry->quality_note?->value,
                'recorded_at' => $harvestEntry->recorded_at?->toDateString(),
                'harvest' => [
                    'id' => $harvestEntry->farm?->id,
                    'name' => $harvestEntry->farm?->name,
                ],
            ],
        ]);
    }

    public function update(UpdateHarvestEntryRequest $request, HarvestEntry $harvestEntry): RedirectResponse
    {
        $this->authorize('update', $harvestEntry);

        $this->harvestEntryService->update($request->validated(), $harvestEntry);

        return redirect()
            ->route('harvest-entries.show', $harvestEntry)
            ->with('success', 'Das Feld wurde erfolgreich aktualisiert.');
    }
}
