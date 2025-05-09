<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Skip admin user creation if it already exists
        if (!\App\Models\User::where('email', 'admin@example.com')->exists()) {
            \App\Models\User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
        }

        // Clients
        $this->call(ClientSeeder::class);

        // Create Products
        $product1 = \App\Models\Product::create([
            'code' => 'PRD-000001',
            'name' => 'Camisa Básica',
            'description' => 'Camisa básica de algodón',
            'status' => 'active'
        ]);

        $product2 = \App\Models\Product::create([
            'code' => 'PRD-000002',
            'name' => 'Pantalón Clásico',
            'description' => 'Pantalón clásico de mezclilla',
            'status' => 'active'
        ]);

        // Create Raw Materials
        $material1 = \App\Models\RawMaterial::create([
            'code' => 'MAT-000001',
            'name' => 'Tela Algodón',
            'description' => 'Tela de algodón 100%',
            'unit_measure' => 'metros',
            'min_stock' => 50,
            'current_stock' => 100,
            'unit_price' => 15000,
            'main_supplier' => 'Textiles SA',
            'status' => 'active'
        ]);

        $material2 = \App\Models\RawMaterial::create([
            'code' => 'MAT-000002',
            'name' => 'Botones',
            'description' => 'Botones plásticos medianos',
            'unit_measure' => 'unidades',
            'min_stock' => 1000,
            'current_stock' => 2000,
            'unit_price' => 200,
            'main_supplier' => 'Accesorios Textiles',
            'status' => 'active'
        ]);

        $material3 = \App\Models\RawMaterial::create([
            'code' => 'MAT-000003',
            'name' => 'Mezclilla',
            'description' => 'Tela mezclilla azul',
            'unit_measure' => 'metros',
            'min_stock' => 30,
            'current_stock' => 80,
            'unit_price' => 20000,
            'main_supplier' => 'Textiles SA',
            'status' => 'active'
        ]);

        // Create Recipes
        $recipe1 = \App\Models\Recipe::create([
            'code' => 'REC-000001',
            'name' => 'Camisa Básica Talla M',
            'description' => 'Receta para camisa básica talla M',
            'product_id' => $product1->id,
            'status' => 'active'
        ]);

        $recipe2 = \App\Models\Recipe::create([
            'code' => 'REC-000002',
            'name' => 'Pantalón Clásico 32',
            'description' => 'Receta para pantalón clásico talla 32',
            'product_id' => $product2->id,
            'status' => 'active'
        ]);

        // Attach materials to recipes
        $recipe1->rawMaterials()->attach([
            $material1->id => ['quantity' => 2],
            $material2->id => ['quantity' => 8]
        ]);

        $recipe2->rawMaterials()->attach([
            $material3->id => ['quantity' => 1.5]
        ]);
    }
}
