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
        Schema::create('combined_task_task_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('combined_task_id')->constrained('combined_tasks')->cascadeOnDelete();
            $table->foreignId('task_type_id')->constrained('task_types')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('combined_task_task_type');
    }
};
