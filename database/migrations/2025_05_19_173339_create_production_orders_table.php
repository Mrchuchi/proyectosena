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
        Schema::create('production_orders', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Código único de la orden
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->foreignId('recipe_id')->constrained()->onDelete('restrict');
            $table->decimal('quantity', 10, 2); // Cantidad a producir
            $table->decimal('completed_quantity', 10, 2)->default(0); // Cantidad producida
            $table->date('planned_date'); // Fecha planificada de producción
            $table->date('start_date')->nullable(); // Fecha real de inicio
            $table->date('end_date')->nullable(); // Fecha real de finalización
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_orders');
    }
};
