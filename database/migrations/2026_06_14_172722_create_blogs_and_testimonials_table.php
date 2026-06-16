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
        // Table Blog Journals
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt'); // Deskripsi pendek kartu depan
            $table->longText('content')->nullable(); // Jika nanti CMS dikembangkan dengan full markdown editor
            $table->string('cover_image_path')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Table Testimonials (Peer Appraisals Carousel)
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->string('author_name');
            $table->string('author_role'); // Contoh: Director of Informatics Systems
            $table->string('avatar_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('testimonials');
    }
};
