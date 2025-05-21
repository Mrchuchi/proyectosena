<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
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

            // Categorías
            ['name' => 'ver_categorias', 'description' => 'Ver listado de categorías', 'module' => 'categorias'],
            ['name' => 'crear_categorias', 'description' => 'Crear nuevas categorías', 'module' => 'categorias'],
            ['name' => 'editar_categorias', 'description' => 'Editar categorías existentes', 'module' => 'categorias'],
            ['name' => 'eliminar_categorias', 'description' => 'Eliminar categorías', 'module' => 'categorias'],

            // Proveedores
            ['name' => 'ver_proveedores', 'description' => 'Ver listado de proveedores', 'module' => 'proveedores'],
            ['name' => 'crear_proveedores', 'description' => 'Crear nuevos proveedores', 'module' => 'proveedores'],
            ['name' => 'editar_proveedores', 'description' => 'Editar proveedores existentes', 'module' => 'proveedores'],
            ['name' => 'eliminar_proveedores', 'description' => 'Eliminar proveedores', 'module' => 'proveedores'],

            // Entradas/Salidas
            ['name' => 'ver_movimientos', 'description' => 'Ver movimientos de inventario', 'module' => 'movimientos'],
            ['name' => 'crear_entradas', 'description' => 'Registrar entradas de productos', 'module' => 'movimientos'],
            ['name' => 'crear_salidas', 'description' => 'Registrar salidas de productos', 'module' => 'movimientos'],

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
        $vendedorPermissions = Permission::whereIn('module', ['clientes', 'productos', 'movimientos'])
            ->whereIn('name', [
                'ver_clientes', 'crear_clientes', 'editar_clientes',
                'ver_productos',
                'ver_movimientos', 'crear_salidas'
            ])->get();
        $vendedor->permissions()->attach($vendedorPermissions);

        // Permisos para Coordinador
        $coordinadorPermissions = Permission::whereIn('module', ['productos', 'proveedores', 'movimientos', 'reportes'])
            ->whereNotIn('name', ['eliminar_productos', 'eliminar_proveedores'])
            ->get();
        $coordinador->permissions()->attach($coordinadorPermissions);
    }
}
