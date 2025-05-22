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
        Schema::table('product_movements', function (Blueprint $table) {
            // Primero hacemos product_id nullable
            $table->foreignId('product_id')->nullable()->change();
            
            // Luego agregamos raw_material_id
            $table->foreignId('raw_material_id')->nullable()->after('product_id')->constrained()->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_movements', function (Blueprint $table) {
            $table->dropForeign(['raw_material_id']);
            $table->dropColumn('raw_material_id');
            $table->foreignId('product_id')->change();
        });
    }
};
