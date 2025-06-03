<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('role_permission')->truncate();
        Permission::truncate();
        Role::truncate();
        Schema::enableForeignKeyConstraints();

        // Crear permisos por módulo
        $permissions = [
            // Clientes
            ['name' => 'ver_clientes', 'description' => 'Ver listado de clientes', 'module' => 'clientes'],
            ['name' => 'crear_clientes', 'description' => 'Crear nuevos clientes', 'module' => 'clientes'],
            ['name' => 'editar_clientes', 'description' => 'Editar clientes existentes', 'module' => 'clientes'],
            ['name' => 'eliminar_clientes', 'description' => 'Eliminar clientes', 'module' => 'clientes'],

            // Productos
            ['name' => 'ver_productos', 'description' => 'Ver listado de productos', 'module' => 'productos'],
            ['name' => 'crear_productos', 'description' => 'Crear nuevos productos', 'module' => 'productos'],
            ['name' => 'editar_productos', 'description' => 'Editar productos existentes', 'module' => 'productos'],
            ['name' => 'eliminar_productos', 'description' => 'Eliminar productos', 'module' => 'productos'],

            // Materias Primas
            ['name' => 'ver_materias_primas', 'description' => 'Ver listado de materias primas', 'module' => 'materias_primas'],
            ['name' => 'crear_materias_primas', 'description' => 'Crear nuevas materias primas', 'module' => 'materias_primas'],
            ['name' => 'editar_materias_primas', 'description' => 'Editar materias primas existentes', 'module' => 'materias_primas'],
            ['name' => 'eliminar_materias_primas', 'description' => 'Eliminar materias primas', 'module' => 'materias_primas'],

            // Recetas
            ['name' => 'ver_recetas', 'description' => 'Ver listado de recetas', 'module' => 'recetas'],
            ['name' => 'crear_recetas', 'description' => 'Crear nuevas recetas', 'module' => 'recetas'],
            ['name' => 'editar_recetas', 'description' => 'Editar recetas existentes', 'module' => 'recetas'],
            ['name' => 'eliminar_recetas', 'description' => 'Eliminar recetas', 'module' => 'recetas'],

            // Inventario
            ['name' => 'ver_inventario', 'description' => 'Ver inventario', 'module' => 'inventario'],
            ['name' => 'ajustar_inventario', 'description' => 'Ajustar inventario', 'module' => 'inventario'],
            ['name' => 'ver_movimientos', 'description' => 'Ver movimientos de inventario', 'module' => 'inventario'],
            ['name' => 'crear_movimientos', 'description' => 'Crear movimientos de inventario', 'module' => 'inventario'],

            // Usuarios
            ['name' => 'ver_usuarios', 'description' => 'Ver listado de usuarios', 'module' => 'usuarios'],
            ['name' => 'crear_usuarios', 'description' => 'Crear nuevos usuarios', 'module' => 'usuarios'],
            ['name' => 'editar_usuarios', 'description' => 'Editar usuarios existentes', 'module' => 'usuarios'],
            ['name' => 'eliminar_usuarios', 'description' => 'Eliminar usuarios', 'module' => 'usuarios'],
            ['name' => 'gestionar_roles', 'description' => 'Gestionar roles y permisos', 'module' => 'usuarios'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Crear roles
        $roles = [
            [
                'name' => 'Superadministrador',
                'description' => 'Acceso total al sistema'
            ],
            [
                'name' => 'Gerente',
                'description' => 'Gestión general sin acceso a configuraciones técnicas'
            ],
            [
                'name' => 'Vendedor',
                'description' => 'Acceso a ventas y consultas básicas'
            ],
            [
                'name' => 'Coordinador',
                'description' => 'Supervisión de operaciones diarias'
            ]
        ];

        foreach ($roles as $role) {
            $newRole = Role::create($role);
            
            // Asignar todos los permisos al Superadministrador
            if ($role['name'] === 'Superadministrador') {
                $newRole->permissions()->attach(Permission::all());
            }
        }

        // Asignar permisos específicos a otros roles
        $gerente = Role::where('name', 'Gerente')->first();
        $vendedor = Role::where('name', 'Vendedor')->first();
        $coordinador = Role::where('name', 'Coordinador')->first();

        // Permisos para Gerente
        $gerentePermissions = Permission::whereNotIn('name', ['gestionar_roles'])->get();
        $gerente->permissions()->attach($gerentePermissions);

        // Permisos para Vendedor
        $vendedorPermissions = Permission::whereIn('module', ['clientes', 'productos', 'inventario'])
            ->whereIn('name', [
                'ver_clientes', 'crear_clientes', 'editar_clientes',
                'ver_productos',
                'ver_inventario', 'ver_movimientos'
            ])->get();
        $vendedor->permissions()->attach($vendedorPermissions);

        // Permisos para Coordinador
        $coordinadorPermissions = Permission::whereIn('module', ['productos', 'materias_primas', 'inventario', 'recetas'])
            ->whereNotIn('name', [
                'eliminar_productos', 
                'eliminar_materias_primas',
                'eliminar_recetas'
            ])
            ->get();
        $coordinador->permissions()->attach($coordinadorPermissions);
    }
}
