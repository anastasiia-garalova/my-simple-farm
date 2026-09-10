<?php

namespace App\Http\Controllers;

use App\Enums\HarvestEntryUnit;
use App\Enums\HarvestLossReason;
use App\Enums\HarvestLossType;
use App\Enums\HarvestStatus;
use App\Http\Requests\StoreHarvestLossRequest;
use App\Http\Requests\UpdateHarvestLossRequest;
use App\Models\Harvest;
use App\Models\HarvestLoss;
use App\Services\HarvestLossService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HarvestLossController extends Controller
{
    public function __construct(
        protected HarvestLossService $harvestLossService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', HarvestLoss::class);

        $harvestLosses = HarvestLoss::query()
            ->with(['harvest:id,name', 'creator:id,name,email'])
            ->latest()
            ->get()
            ->map(fn (HarvestLoss $harvestLoss) => [
                'id' => $harvestLoss->id,
                'loss_type' => $harvestLoss->loss_type?->value,
                'quantity' => $harvestLoss->quantity,
                'reason' => $harvestLoss->reason?->value,
                'unit' => $harvestLoss->unit?->value,
                'recorded_at' => $harvestLoss->recorded_at?->toDateString(),
                'harvest' => [
                    'id' => $harvestLoss->harvest?->id,
                    'name' => $harvestLoss->harvest?->name,
                ],
                'creator' => [
                    'id' => $harvestLoss->creator?->id,
                    'name' => $harvestLoss->creator?->name,
                    'email' => $harvestLoss->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $harvestLoss) ?? false,
                    'update' => $request->user()?->can('update', $harvestLoss) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('harvest-losses/index', [
            'harvestLosses' => $harvestLosses,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', HarvestLoss::class);

        return Inertia::render('harvest-losses/create', [
            'loss_types' => HarvestLossType::values(),
            'reasons' => HarvestLossReason::values(),
            'units' => HarvestEntryUnit::values(),
            'harvests' => Harvest::query()
                ->whereIn('status', [
                    HarvestStatus::Running,
                    HarvestStatus::Completed,
                ])
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Harvest $harvest) => [
                    'id' => $harvest->id,
                    'name' => $harvest->name,
                ])
                ->values(),
        ]);
    }

    public function store(StoreHarvestLossRequest $request): RedirectResponse
    {
        $this->authorize('create', HarvestLoss::class);

        $this->harvestLossService->create($request->validated(), $request->user());

        return redirect()
            ->route('harvest-losses.index')
            ->with('success', 'Das Feld wurde erfolgreich angelegt.');
    }

    public function show(HarvestLoss $harvestLoss): Response
    {
        $this->authorize('view', $harvestLoss);

        $harvestLoss->load(['harvest:id,name', 'creator:id,name,email']);

        return Inertia::render('harvest-losses/show', [
            'harvestLoss' => [
                'id' => $harvestLoss->id,
                'loss_type' => $harvestLoss->loss_type?->value,
                'quantity' => $harvestLoss->quantity,
                'reason' => $harvestLoss->reason?->value,
                'unit' => $harvestLoss->unit?->value,
                'recorded_at' => $harvestLoss->recorded_at?->toDateString(),
                'harvest' => [
                    'id' => $harvestLoss->harvest?->id,
                    'name' => $harvestLoss->harvest?->name,
                ],
                'creator' => [
                    'id' => $harvestLoss->creator?->id,
                    'name' => $harvestLoss->creator?->name,
                    'email' => $harvestLoss->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $harvestLoss) ?? false,
                ],
            ],
        ]);
    }

    public function edit(HarvestLoss $harvestLoss): Response
    {
        $this->authorize('update', $harvestLoss);

        return Inertia::render('harvest-losses/edit', [
            'loss_types' => HarvestLossType::values(),
            'reasons' => HarvestLossReason::values(),
            'units' => HarvestEntryUnit::values(),
            'harvests' => Harvest::query()
                ->whereIn('status', [
                    HarvestStatus::Running,
                    HarvestStatus::Completed,
                ])
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Harvest $harvest) => [
                    'id' => $harvest->id,
                    'name' => $harvest->name,
                ])
                ->values(),

            'harvestLoss' => [
                'id' => $harvestLoss->id,
                'harvest_id' => $harvestLoss->harvest_id,
                'loss_type' => $harvestLoss->loss_type?->value,
                'quantity' => $harvestLoss->quantity,
                'reason' => $harvestLoss->reason?->value,
                'recorded_at' => $harvestLoss->recorded_at?->toDateString(),
            ],
        ]);
    }

    public function update(UpdateHarvestLossRequest $request, HarvestLoss $harvestLoss): RedirectResponse
    {
        $this->authorize('update', $harvestLoss);

        $this->harvestLossService->update($request->validated(), $harvestLoss);

        return redirect()
            ->route('harvest-losses.show', $harvestLoss)
            ->with('success', 'Das Feld wurde erfolgreich aktualisiert.');
    }
}
