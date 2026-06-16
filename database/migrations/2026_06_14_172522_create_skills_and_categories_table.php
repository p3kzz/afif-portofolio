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
        Schema::create('skill_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Contoh: Core Engineering, Cloud Infrastructure
            $table->string('icon')->nullable(); // fa-terminal, fa-server
            $table->integer('order_index')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('skill_category_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Nama skill atau tag (e.g., Laravel, Docker)
            $table->integer('proficiency_percentage')->nullable(); // 0 - 100 untuk progress bar (opsional jika hanya berupa tag)
            $table->boolean('is_featured_tag')->default(false); // True jika masuk ke barisan tag "Other Skills" di bawah
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('skill_categories');
    }
};
