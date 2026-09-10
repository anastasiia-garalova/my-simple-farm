<?php

use App\Models\User;
use App\Models\WorkItem;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('allows an authorized user to open the work item create page', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole('admin');

    $this->actingAs($user)
        ->get('/work-items/create')
        ->assertOk();
});

it('allows an authorized user to open the work item index page', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole('admin');

    $this->actingAs($user)
        ->get('/work-items')
        ->assertOk();
});

it('stores a work item for an authorized user', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->givePermissionTo('manage fields');

    $this->actingAs($user)
        ->post('/work-items', [
            'title' => 'Feldbegehung vorbereiten',
            'description' => 'Checkliste für die nächste Begehung erstellen.',
            'status' => 'planned',
        ])
        ->assertRedirect('/work-items');

    $this->assertDatabaseHas('work_items', [
        'title' => 'Feldbegehung vorbereiten',
        'status' => 'planned',
        'created_by' => $user->id,
    ]);
});

it('validates incoming work item data', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole('admin');

    $this->actingAs($user)
        ->from('/work-items/create')
        ->post('/work-items', [
            'title' => '',
            'description' => 'Ungültiger Testfall',
            'status' => 'invalid-status',
        ])
        ->assertRedirect('/work-items/create')
        ->assertSessionHasErrors(['title', 'status']);

    expect(WorkItem::count())->toBe(0);
});

it('forbids users without the required role or permission', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $this->actingAs($user)
        ->get('/work-items/create')
        ->assertForbidden();
});

it('allows the creator to view a single work item', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $workItem = WorkItem::create([
        'title' => 'Eigene Aufgabe',
        'description' => 'Nur der Ersteller darf sie ohne Sonderrechte öffnen.',
        'status' => 'draft',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/work-items/{$workItem->id}")
        ->assertOk();
});

it('forbids unrelated users from viewing a foreign work item', function () {
    $creator = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $workItem = WorkItem::create([
        'title' => 'Fremde Aufgabe',
        'description' => 'Soll nicht sichtbar sein.',
        'status' => 'planned',
        'created_by' => $creator->id,
    ]);

    $this->actingAs($otherUser)
        ->get("/work-items/{$workItem->id}")
        ->assertForbidden();
});

it('allows the creator to edit own work item while status is draft', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $workItem = WorkItem::create([
        'title' => 'Eigene Aufgabe',
        'description' => 'Bearbeitbar im Draft-Status.',
        'status' => 'draft',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/work-items/{$workItem->id}/edit")
        ->assertOk();

    $this->actingAs($user)
        ->patch("/work-items/{$workItem->id}", [
            'title' => 'Eigene Aufgabe aktualisiert',
            'description' => 'Neue Beschreibung',
            'status' => 'planned',
        ])
        ->assertRedirect("/work-items/{$workItem->id}");

    $this->assertDatabaseHas('work_items', [
        'id' => $workItem->id,
        'title' => 'Eigene Aufgabe aktualisiert',
        'status' => 'planned',
    ]);
});

it('forbids the creator to edit own work item when status is done', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $workItem = WorkItem::create([
        'title' => 'Abgeschlossene Aufgabe',
        'description' => 'Soll für normale Benutzer gesperrt sein.',
        'status' => 'done',
        'created_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->get("/work-items/{$workItem->id}/edit")
        ->assertForbidden();
});

it('allows an admin to edit a done work item', function () {
    $admin = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $admin->assignRole('admin');

    $creator = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $workItem = WorkItem::create([
        'title' => 'Fertig gemeldet',
        'description' => 'Darf nur von Admins geändert werden.',
        'status' => 'done',
        'created_by' => $creator->id,
    ]);

    $this->actingAs($admin)
        ->patch("/work-items/{$workItem->id}", [
            'title' => 'Fertig gemeldet und korrigiert',
            'description' => 'Admin hat korrigiert.',
            'status' => 'done',
        ])
        ->assertRedirect("/work-items/{$workItem->id}");

    $this->assertDatabaseHas('work_items', [
        'id' => $workItem->id,
        'title' => 'Fertig gemeldet und korrigiert',
        'status' => 'done',
    ]);
});
