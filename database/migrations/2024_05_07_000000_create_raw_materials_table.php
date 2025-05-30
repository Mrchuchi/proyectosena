<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('raw_materials', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('unit_measure'); // metros, kilogramos, unidades, etc.
            $table->integer('min_stock')->default(0);
            $table->integer('current_stock')->default(0);
            $table->integer('unit_price')->default(0);
            $table->string('main_supplier')->nullable();
            $table->date('last_purchase')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('raw_materials');
    }
};