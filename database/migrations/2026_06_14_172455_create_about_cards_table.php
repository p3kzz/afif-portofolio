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
        Schema::create('about_cards', function (Blueprint $table) {
            $table->id();
            $table->string('icon'); // Class font-awesome, misal: 'fa-graduation-cap'
            $table->string('title'); // Education, Current Focus, dll
            $table->text('description');
            $table->integer('order_index')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_cards');
    }
};
