<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->foreignId('client_id')->nullable()->constrained()->onDelete('restrict');
            $table->enum('type', ['entrada', 'salida', 'ajuste']);
            $table->integer('quantity');
            $table->integer('previous_stock');
            $table->integer('new_stock');
            $table->string('reason')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });

        // Modificar la tabla inventory_movements para agregar el campo supplier
        Schema::table('inventory_movements', function (Blueprint $table) {
            $table->string('supplier')->nullable()->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_movements');
        
        Schema::table('inventory_movements', function (Blueprint $table) {
            $table->dropColumn('supplier');
        });
    }
};
