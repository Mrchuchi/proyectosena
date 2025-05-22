<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('product_movements', function (Blueprint $table) {
            // Hacer la columna product_id nullable
            $table->foreignId('product_id')->nullable()->change();
            
            // Añadir la columna raw_material_id
            $table->foreignId('raw_material_id')->nullable()->after('product_id')
                ->constrained()->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::table('product_movements', function (Blueprint $table) {
            $table->foreignId('product_id')->nullable(false)->change();
            $table->dropForeign(['raw_material_id']);
            $table->dropColumn('raw_material_id');
        });
    }
};
