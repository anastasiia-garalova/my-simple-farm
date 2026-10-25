<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;
use App\Services\RegionService;
use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\UpdateRegionRequest;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;


class RegionController extends Controller
{
    public function __construct(
        protected RegionService $regionService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Region::class);

        $regions = Region::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (Region $region) => [
                'id' => $region->id,
                'name' => $region->name,
                'description' => $region->description,
                'creator' => [
                    'id' => $region->creator?->id,
                    'name' => $region->creator?->name,
                    'email' => $region->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $region) ?? false,
                    'update' => $request->user()?->can('update', $region) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('regions/index', [
            'regions' => $regions,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Region::class);

        return Inertia::render('regions/create');
    }

    public function store(StoreRegionRequest $request): RedirectResponse
    {
        $this->authorize('create', Region::class);

        $this->regionService->create($request->validated(), $request->user());

        return redirect()
            ->route('regions.index')
            ->with('success', 'Die Region wurde erfolgreich angelegt.');
    }

    public function edit(Region $region): Response
    {
        $this->authorize('update', $region);

        return Inertia::render('regions/edit', [
            'region' => [
                'id' => $region->id,
                'name' => $region->name,
                'description' => $region->description,
                'contact_person' => $region->contact_person,
            ],
        ]);
    }

    public function update(UpdateRegionRequest $request, Region $region): RedirectResponse
    {
        $this->authorize('update', $region);

        $this->regionService->update($region, $request->validated());

        return redirect()
            ->route('regions.index', $region)
            ->with('success', 'Die Region wurde erfolgreich aktualisiert.');
    }
}
