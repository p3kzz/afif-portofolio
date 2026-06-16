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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            // Menghubungkan ke user jika mereka login, set null jika anonim
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');

            $table->string('name'); // Tetap ada untuk menampung nama anonim / backup
            $table->text('comment');
            $table->unsignedTinyInteger('rating');
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
