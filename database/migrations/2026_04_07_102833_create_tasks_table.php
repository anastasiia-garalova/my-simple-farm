<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')->constrained('fields')->cascadeOnDelete();
            $table->foreignId('season_id')->constrained('seasons')->onDelete('set null');
            $table->foreignId('task_type_id')->constrained('task_types')->onDelete('set null');
            $table->foreignId('combined_task_id')->nullable()->constrained('combined_tasks')->onDelete('set null');

            $table->string('title', 150);
            $table->dateTime('planned_for');
            $table->string('status', 20);
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
