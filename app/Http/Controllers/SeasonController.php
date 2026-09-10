<?php

namespace App\Http\Controllers;

use App\Enums\SeasonStatus;
use App\Http\Requests\StoreSeasonRequest;
use App\Http\Requests\UpdateSeasonRequest;
use App\Models\Season;
use App\Services\SeasonService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class SeasonController extends Controller
{
    public function __construct(
        protected SeasonService $seasonService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Season::class);

        $seasons = Season::query()
            ->with('creator:id,name,email')
            ->latest()
            ->get()
            ->map(fn (Season $season) => [
                'id' => $season->id,
                'name' => $season->name,
                'year' => $season->year,
                'starts_on' => $season->starts_on?->toDateString(),
                'ends_on' => $season->ends_on?->toDateString(),
                'status' => $season->status->value,
                'created_at' => $season->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $season->creator?->id,
                    'name' => $season->creator?->name,
                    'email' => $season->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $season) ?? false,
                    'update' => $request->user()?->can('update', $season) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('seasons/index', [
            'seasons' => $seasons,
            'statuses' => SeasonStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Season::class);

        return Inertia::render('seasons/create', [
            'statuses' => SeasonStatus::values(),
        ]);
    }

    public function store(StoreSeasonRequest $request): RedirectResponse
    {
        $this->authorize('create', Season::class);

        $this->seasonService->create($request->validated(), $request->user());

        return redirect()
            ->route('seasons.index')
            ->with('success', 'Die Saison wurde erfolgreich angelegt.');
    }

    public function show(Season $season): Response
    {
        $this->authorize('view', $season);

        $season->load('creator:id,name,email');

        return Inertia::render('seasons/show', [
            'season' => [
                'id' => $season->id,
                'name' => $season->name,
                'year' => $season->year,
                'starts_on' => $season->starts_on?->toDateString(),
                'ends_on' => $season->ends_on?->toDateString(),
                'status' => $season->status->value,
                'created_at' => $season->created_at?->toDateTimeString(),
                'creator' => [
                    'id' => $season->creator?->id,
                    'name' => $season->creator?->name,
                    'email' => $season->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $season) ?? false,
                ],
            ],
        ]);
    }

    public function edit(Season $season): Response
    {
        $this->authorize('update', $season);

        return Inertia::render('seasons/edit', [
            'statuses' => SeasonStatus::values(),
            'season' => [
                'id' => $season->id,
                'name' => $season->name,
                'year' => $season->year,
                'starts_on' => $season->starts_on?->toDateString(),
                'ends_on' => $season->ends_on?->toDateString(),
                'status' => $season->status->value,
            ],
        ]);
    }

    public function update(UpdateSeasonRequest $request, Season $season): RedirectResponse
    {
        $this->authorize('update', $season);

        $this->seasonService->update($season, $request->validated());

        return redirect()
            ->route('seasons.show', $season)
            ->with('success', 'Die Saison wurde erfolgreich aktualisiert.');
    }
}
