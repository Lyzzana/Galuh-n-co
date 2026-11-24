<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('event_category')->default('All Occasion')->after('short_description');
            $table->string('season_tag')->nullable()->after('event_category');
            $table->boolean('is_best_seller')->default(false)->after('season_tag');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['event_category', 'season_tag', 'is_best_seller']);
        });
    }
};
