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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->decimal('price', 7, 2)->default(0.00);
            $table->decimal('total_price', 7, 2)->default(0.00);
            $table->string('fit')->nullable();
            $table->string('productLength')->nullable();
            $table->decimal('embroidery_lines_cost', 4, 2)->default(0.00);
            $table->decimal('embroidery_logo_cost', 4, 2)->default(0.00);
            $table->string('size')->nullable();
            $table->string('line1')->nullable();
            $table->string('line2')->nullable();
            $table->string('line3')->nullable();
            $table->string('wayne_logo')->nullable();
            $table->string('co_brand_logo')->nullable();
            $table->string('official_logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
