<?php

namespace Tests\Feature;

use App\Enums\TaskTypeCategory;
use App\Enums\TaskTypeStatus;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTypeModuleTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_task_types(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $user->assignRole('admin');

        $taskType = TaskType::factory()->create([
            'category' => TaskTypeCategory::Soil->value,
            'status' => TaskTypeStatus::Active->value,
            'created_by' => $user->id,
        ]);

        $response = $this->get(route('task-types.index'));
        $response->assertStatus(200);
        $response->assertSeeText($taskType->name);
    }

    public function test_store_creates_task_type(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $user->assignRole('admin');

        $response = $this->post(route('task-types.store'), [
            'name' => 'Neue TaskType',
            'category' => TaskTypeCategory::Care->value,
            'default_unit' => 'kg',
            'status' => TaskTypeStatus::Active->value,
        ]);

        $response->assertRedirect(route('task-types.index'));
        $this->assertDatabaseHas('task_types', ['name' => 'Neue TaskType']);
    }

    public function test_unauthorized_user_cannot_create_task_type(): void
    {
        $user = User::factory()->create(); // обычный пользователь без роли
        $this->actingAs($user);

        $response = $this->post(route('task-types.store'), [
            'name' => 'Unauthorized TaskType',
            'category' => TaskTypeCategory::Soil->value,
            'default_unit' => 'kg',
            'status' => TaskTypeStatus::Active->value,
        ]);

        $response->assertStatus(403);
    }

    public function test_guest_is_redirected_to_login(): void
    {
        $response = $this->post(route('task-types.store'), []);
        $response->assertRedirect(route('login'));
    }
}
