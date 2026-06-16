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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title'); // Contoh: Informatics Student | Fullstack Developer
            $table->string('tagline'); // Kalimat di bawah nama
            $table->text('short_introduction');
            $table->json('typing_effects'); // Menyimpan array teks animasi mengetik dalam bentuk JSON
            $table->string('cv_file_path')->nullable(); // Lokasi file PDF CV
            $table->string('avatar_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
