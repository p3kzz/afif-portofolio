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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Scholarship Lab
            $table->string('tagline'); // AI Scholarship Recommendation Platform
            $table->text('description'); // Deskripsi singkat kartu depan
            $table->json('tech_stack'); // Menyimpan array tech badge encodded JSON: ["React", "Node.js"]
            $table->string('status'); // Production Ready, Active Operational, dll
            $table->boolean('is_active_deployment')->default(true); // Membedakan warna badge status (hijau/abu-abu)

            // Kolom Spesifik Deep Case Study Modal
            $table->string('my_role'); // Contoh: Lead Systems Architect
            $table->text('problem_statement');
            $table->text('solution_design');
            $table->text('challenges_mitigation');
            $table->text('architecture_overview');

            // Link eksternal
            $table->string('live_demo_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('image_preview_path')->nullable(); // Tempat simpan screenshot web

            $table->integer('order_index')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
