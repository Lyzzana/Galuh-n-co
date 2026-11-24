<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('landing_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section')->index(); // hero, about, why_us, corporate, how_to_order, faq, footer
            $table->string('key');
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, textarea, image
            $table->timestamps();

            $table->unique(['section', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_contents');
    }
};
