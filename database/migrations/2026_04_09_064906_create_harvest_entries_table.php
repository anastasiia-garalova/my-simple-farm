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
        Schema::create('harvest_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_id')->constrained('harvests')->cascadeOnDelete();;
            $table->date('recorded_at');
            $table->decimal('quantity', 8, 2);
            $table->string('unit', 10);
            $table->string('quality_note', 50);
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_entries');
    }
};
