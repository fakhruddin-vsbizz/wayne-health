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
        Schema::table('shipping_addresses', function (Blueprint $table) {
            $table->string('ship_to_name')->nullable();
            $table->string('ship_to_company')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shipping_address', function (Blueprint $table) {
            $table->dropColumn('ship_to_name');
            $table->dropColumn('ship_to_company');
        });
    }
};
