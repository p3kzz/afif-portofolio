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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('time_period'); // Contoh: 2025 - Present
            $table->string('company'); // Contoh: Enterprise Tech Stack Lab
            $table->string('title'); // Contoh: Fullstack Developer Intern
            $table->text('description');
            $table->timestamps();
        });

        // Table Certifications (Slider)
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->year('year');
            $table->string('credential_url')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('certifications');
    }
};
