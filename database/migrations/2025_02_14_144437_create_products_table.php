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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('item_code')->unique()->nullable();
            $table->string('manufacturer');
            $table->text('multiline_description');
            $table->string('product_image')->nullable();
            $table->string('product_stitching_image')->nullable();
            $table->text('embroidery_lines')->nullable();
            $table->text('embroidery_lines_position')->nullable();
            $table->string('wayne_logo')->nullable();
            $table->decimal('wayne_logo_price', 4, 2);
            $table->string('wayne_logo_position')->nullable();
            $table->json('co_brand_logo_price')->nullable();
            $table->string('co_brand_logo_position')->nullable();
            $table->json('official_logo_price')->nullable();
            $table->string('official_logo_position')->nullable();
            $table->string('colors')->nullable();
            $table->string('starts_at')->nullable();
            $table->boolean('is_discontinued')->default(false);
            $table->text('link')->nullable();
            $table->json('product_sizes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
