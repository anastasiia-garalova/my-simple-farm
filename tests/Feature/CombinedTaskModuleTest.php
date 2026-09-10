<?php

namespace Tests\Feature;

use App\Enums\CombinedTaskStatus;
use App\Models\CombinedTask;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
// php artisan test tests/Feature/CombinedTaskModuleTest.php

class CombinedTaskModuleTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_combined_tasks(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $combinedTask = CombinedTask::factory()->create([
            'created_by' => $user->id,
        ]);

        $response = $this->get(route('combined-tasks.index'));
        $response->assertStatus(200);
        $response->assertSeeText($combinedTask->name);
    }

    public function test_store_creates_combined_task(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('combined-tasks.store'), [
            'name' => 'Neue Kombi-Aufgabe',
            'description' => 'Beschreibung',
            'status' => CombinedTaskStatus::Active->value,
        ]);

        $response->assertRedirect(route('combined-tasks.index'));
        $this->assertDatabaseHas('combined_tasks', ['name' => 'Neue Kombi-Aufgabe']);
    }

    public function test_unauthorized_user_cannot_create_combined_task(): void
    {
        $response = $this->post(route('combined-tasks.store'), []);
        $response->assertStatus(403);
    }
}
