<?php

namespace App\Http\Controllers;

use App\Enums\HarvestTeamStatus;
use App\Http\Requests\StoreHarvestTeamRequest;
use App\Http\Requests\UpdateHarvestTeamRequest;
use App\Models\HarvestTeam;
use App\Models\User;
use App\Services\HarvestTeamService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HarvestTeamController extends Controller
{
    public function __construct(
        protected HarvestTeamService $harvestTeamService
    ) {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', HarvestTeam::class);

        $harvestTeams = HarvestTeam::query()
            ->with([
                'creator:id,name,email',
                'members:id,name,email'
            ])
            ->latest()
            ->get()
            ->map(fn (HarvestTeam $harvestTeam) => [
                'id' => $harvestTeam->id,
                'name' => $harvestTeam->name,
                'lead_person' => $harvestTeam->lead_person,
                'status' => $harvestTeam->status->value,
                'members' => $harvestTeam->members->map(fn($member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                ]),
                'creator' => [
                    'id' => $harvestTeam->creator?->id,
                    'name' => $harvestTeam->creator?->name,
                    'email' => $harvestTeam->creator?->email,
                ],
                'can' => [
                    'view' => $request->user()?->can('view', $harvestTeam) ?? false,
                    'update' => $request->user()?->can('update', $harvestTeam) ?? false,
                ],
            ])
            ->values();

        return Inertia::render('harvest-teams/index', [
            'harvestTeams' => $harvestTeams,
            'statuses' => HarvestTeamStatus::values(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', HarvestTeam::class);

        $allUsers = User::select('id', 'name', 'email')->get();

        return Inertia::render('harvest-teams/create', [
            'statuses' => HarvestTeamStatus::values(),
            'members' => $allUsers->map(fn($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
            ]),
        ]);
    }

    public function store(StoreHarvestTeamRequest $request): RedirectResponse
    {
        $this->authorize('create', HarvestTeam::class);

        $team = $this->harvestTeamService->create($request->validated(), $request->user());

        $memberIds = $request->input('members', []);
        if (!is_array($memberIds)) {
            $memberIds = [];
        }
        $team->members()->sync($memberIds);

        return redirect()
            ->route('harvest-teams.index')
            ->with('success', 'Die Saison wurde erfolgreich angelegt.');
    }

    public function show(HarvestTeam $harvestTeam): Response
    {
        $this->authorize('view', $harvestTeam);

        $harvestTeam->load('creator:id,name,email');

        return Inertia::render('harvest-teams/show', [
            'harvestTeam' => [
                'id' => $harvestTeam->id,
                'name' => $harvestTeam->name,
                'lead_person' => $harvestTeam->lead_person,
                'status' => $harvestTeam->status->value,
                'members' => $harvestTeam->members->map(fn($member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                ]),
                'creator' => [
                    'id' => $harvestTeam->creator?->id,
                    'name' => $harvestTeam->creator?->name,
                    'email' => $harvestTeam->creator?->email,
                ],
                'can' => [
                    'update' => request()->user()?->can('update', $harvestTeam) ?? false,
                ],
            ],
        ]);
    }

    public function edit(HarvestTeam $harvestTeam): Response
    {
        $this->authorize('update', $harvestTeam);

        $allUsers = User::select('id', 'name', 'email')->get();

        return Inertia::render('harvest-teams/edit', [
            'statuses' => HarvestTeamStatus::values(),
            'members' => $allUsers->map(fn($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
            ]),
            'harvestTeam' => [
                'id' => $harvestTeam->id,
                'name' => $harvestTeam->name,
                'lead_person' => $harvestTeam->lead_person,
                'status' => $harvestTeam->status->value,
                'members' => $harvestTeam->members->pluck('id')->toArray(),
            ],
        ]);
    }

    public function update(UpdateHarvestTeamRequest $request, HarvestTeam $harvestTeam): RedirectResponse
    {
        $this->authorize('update', $harvestTeam);

        $team = $this->harvestTeamService->update($harvestTeam, $request->validated());

        $memberIds = $request->input('members', []);
        if (!is_array($memberIds)) {
            $memberIds = [];
        }
        $team->members()->sync($memberIds);

        return redirect()
            ->route('harvest-teams.show', $harvestTeam)
            ->with('success', 'Die Saison wurde erfolgreich aktualisiert.');
    }
}
