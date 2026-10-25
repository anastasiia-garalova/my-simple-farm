<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegionCrop;
use App\Models\Region;
use App\Models\Crop;
use App\Services\RegionCropService;
use App\Http\Requests\StoreRegionCropRequest;
use App\Http\Requests\UpdateRegionCropRequest;


use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class RegionCropController extends Controller
{
    public function __construct(
        protected RegionCropService $regionCropService
    )
    {
        
    }
    
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', RegionCrop::class);

        $regionCrops = RegionCrop::query()
            ->with([
                'crop:id,name',
                'region:id,name,',
                'creator:id,name,email'
            ])
            ->latest()
            ->get()
            ->map(fn (RegionCrop $region) => [
                'id' => $region->id,
                'region_id' => $region->region_id,
                'crop_id' => $region->crop_id,
                'region_name' => $region->region->name,
                'crop_name' => $region->crop->name,
                'contact_person' => $region->contact_person,
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

        return Inertia::render('region-crops/index', [
            'regionCrops' => $regionCrops,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', RegionCrop::class);

        return Inertia::render('region-crops/create', [
            'regions' => Region::select('id', 'name')->orderBy('name')->get(),
            'crops' => Crop::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreRegionCropRequest $request): RedirectResponse
    {
        $this->authorize('create', RegionCrop::class);

        $this->regionCropService->create($request->validated(), $request->user());

        return redirect()
            ->route('region-crops.index')
            ->with('success', 'Die RegionCrops wurde erfolgreich angelegt.');
    }

public function edit(RegionCrop $regionCrop): Response // ИСПРАВЛЕНО: $regionCrop для Route Model Binding
    {
        $this->authorize('update', $regionCrop);

        return Inertia::render('region-crops/edit', [
            'regionCrops' => [
                'id' => $regionCrop->id,
                'region_id' => $regionCrop->region_id, 
                'crop_id' => $regionCrop->crop_id,     
            ],
            'regions' => Region::select('id', 'name')->orderBy('name')->get(),
            'crops' => Crop::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateRegionCropRequest $request, RegionCrop $regionCrop): RedirectResponse 
    {
        $this->authorize('update', $regionCrop);

        $this->regionCropService->update($regionCrop, $request->validated());

        return redirect()
            ->route('region-crops.index')
            ->with('success', 'Die RegionCrops wurde erfolgreich aktualisiert.');
    }
}
