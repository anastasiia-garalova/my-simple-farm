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
        Schema::create('harvest_losses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_id')->constrained('harvests')->cascadeOnDelete();;
            $table->string('loss_type', 20);
            $table->decimal('quantity', 8, 2);
            $table->string('reason', 50);
            $table->string('unit', 10);
            $table->date('recorded_at');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_losses');
    }
};
