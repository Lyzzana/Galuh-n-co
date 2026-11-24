<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique(); // INV-GC-2026XXXX
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->json('address_snapshot');
            $table->decimal('total_amount', 14, 2);
            $table->string('status')->default('verification'); // verification, packing, shipping, delivered
            $table->string('tracking_number')->nullable();
            $table->text('greeting_note')->nullable();
            $table->string('payment_proof_path')->nullable();
            $table->string('b2b_video_path')->nullable();
            $table->string('b2b_video_token')->unique()->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('packed_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name');
            $table->boolean('is_custom_b2b')->default(false);
            $table->json('custom_config')->nullable();
            $table->unsignedInteger('quantity');
            $table->decimal('unit_price', 14, 2);
            $table->decimal('subtotal', 14, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
