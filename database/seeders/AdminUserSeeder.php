<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Obtener el rol de superadministrador
        $superAdminRole = Role::where('name', 'Superadministrador')->first();

        // Crear usuario administrador si no existe
        $admin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrador',
                'password' => bcrypt('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Asignar rol de superadministrador
        $admin->role()->associate($superAdminRole);
        $admin->save();
    }
}
