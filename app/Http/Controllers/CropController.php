<?php

namespace App\Http\Controllers;

use App\Enums\CropCategory;
use App\Enums\CropStatus;
use App\Http\Requests\StoreCropRequest;
use App\Http\Requests\UpdateCropRequest;
use App\Models\Crop;
use App\Services\CropService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class CropController extends Controller
{
    public function __construct(
        protected CropService $cropService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Crop::class);

        $crops = Crop::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (Crop $crop) => [
                'id' => $crop->id,
                'name' => $crop->name,
                'category' => $crop->category->value,
                'status' => $crop->status->value,
                'notes' => $crop->notes,
                'created_at' => $crop->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $crop->creator?->id,
                    'name' => $crop->creator?->name,
                    'email' => $crop->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $crop) ?? false,
                    'update' => $request->user()?->can('update', $crop) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('crops/index', [
            'crops' => $crops,
            'categories' => CropCategory::values(),
            'statuses' => CropStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Crop::class);

        return Inertia::render('crops/create', [
            'categories' => CropCategory::values(),
            'statuses' => CropStatus::values(),
        ]);
    }

    public function store(StoreCropRequest $request): RedirectResponse
    {
        $this->authorize('create', Crop::class);

        $this->cropService->create($request->validated(), $request->user());

        return redirect()
            ->route('crops.index')
            ->with('success', 'Die Kultur wurde erfolgreich angelegt.');
    }

    public function show(Crop $crop): Response
    {
        $this->authorize('view', $crop);

        $crop->load('creator:id,name,email');

        return Inertia::render('crops/show', [
            'crop' => [
                'id' => $crop->id,
                'name' => $crop->name,
                'category' => $crop->category->value,
                'status' => $crop->status->value,
                'notes' => $crop->notes,
                'created_at' => $crop->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $crop->creator?->id,
                    'name' => $crop->creator?->name,
                    'email' => $crop->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $crop) ?? false,
                ],
            ],
        ]);
    }

    public function edit(Crop $crop): Response
    {
        $this->authorize('update', $crop);

        return Inertia::render('crops/edit', [
            'categories' => CropCategory::values(),
            'statuses' => CropStatus::values(),
            'crop' => [
                'id' => $crop->id,
                'name' => $crop->name,
                'category' => $crop->category->value,
                'status' => $crop->status->value,
                'notes' => $crop->notes,
            ],
        ]);
    }

    public function update(UpdateCropRequest $request, Crop $crop): RedirectResponse
    {
        $this->authorize('update', $crop);

        $this->cropService->update($crop, $request->validated());

        return redirect()
            ->route('crops.show', $crop)
            ->with('success', 'Die Kultur wurde erfolgreich aktualisiert.');
    }
}
