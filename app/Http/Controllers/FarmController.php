<?php

namespace App\Http\Controllers;

use App\Enums\FarmStatus;
use App\Http\Requests\StoreFarmRequest;
use App\Http\Requests\UpdateFarmRequest;
use App\Models\Farm;
use App\Services\FarmService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class FarmController extends Controller
{
    public function __construct(
        protected FarmService $farmService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Farm::class);

        $farms = Farm::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (Farm $farm) => [
                'id' => $farm->id,
                'name' => $farm->name,
                'location' => $farm->location,
                'contact_person' => $farm->contact_person,
                'status' => $farm->status->value,
                'created_at' => $farm->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $farm->creator?->id,
                    'name' => $farm->creator?->name,
                    'email' => $farm->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $farm) ?? false,
                    'update' => $request->user()?->can('update', $farm) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('farms/index', [
            'farms' => $farms,
            'statuses' => FarmStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Farm::class);

        return Inertia::render('farms/create', [
            'statuses' => FarmStatus::values(),
        ]);
    }

    public function store(StoreFarmRequest $request): RedirectResponse
    {
        $this->authorize('create', Farm::class);

        $this->farmService->create($request->validated(), $request->user());

        return redirect()
            ->route('farms.index')
            ->with('success', 'Der Betrieb wurde erfolgreich angelegt.');
    }

    public function show(Farm $farm): Response
    {
        $this->authorize('view', $farm);

        $farm->load('creator:id,name,email');

        return Inertia::render('farms/show', [
            'farm' => [
                'id' => $farm->id,
                'name' => $farm->name,
                'location' => $farm->location,
                'contact_person' => $farm->contact_person,
                'status' => $farm->status->value,
                'created_at' => $farm->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $farm->creator?->id,
                    'name' => $farm->creator?->name,
                    'email' => $farm->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $farm) ?? false,
                ],
            ],
        ]);
    }

    public function edit(Farm $farm): Response
    {
        $this->authorize('update', $farm);

        return Inertia::render('farms/edit', [
            'statuses' => FarmStatus::values(),
            'farm' => [
                'id' => $farm->id,
                'name' => $farm->name,
                'location' => $farm->location,
                'contact_person' => $farm->contact_person,
                'status' => $farm->status->value,
            ],
        ]);
    }

    public function update(UpdateFarmRequest $request, Farm $farm): RedirectResponse
    {
        $this->authorize('update', $farm);

        $this->farmService->update($farm, $request->validated());

        return redirect()
            ->route('farms.show', $farm)
            ->with('success', 'Der Betrieb wurde erfolgreich aktualisiert.');
    }
}
