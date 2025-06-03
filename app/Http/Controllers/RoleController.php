<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    public function index()
    {
        // Agrupar permisos por módulo
        $groupedPermissions = Permission::all()->groupBy('module')->map(function($permissions) {
            return $permissions->map(function($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'description' => $permission->description,
                    'module' => $permission->module
                ];
            });
        });

        return response()->json([
            'roles' => Role::with('permissions')->get(),
            'permissions' => $groupedPermissions
        ]);
    }

    public function show(Role $role)
    {
        return response()->json([
            'role' => $role->load('permissions')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        try {
            DB::beginTransaction();

            $role = Role::create([
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);

            if (!empty($validated['permissions'])) {
                $role->syncPermissions($validated['permissions']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Rol creado exitosamente',
                'role' => $role->load('permissions')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear el rol'], 500);
        }
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles')->ignore($role->id)],
            'description' => 'nullable|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        try {
            DB::beginTransaction();

            $role->update([
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);

            if ($request->has('permissions')) {
                $role->syncPermissions($validated['permissions']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Rol actualizado exitosamente',
                'role' => $role->load('permissions')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar el rol'], 500);
        }
    }

    public function destroy(Role $role)
    {
        try {
            if ($role->users()->exists()) {
                return response()->json([
                    'error' => 'No se puede eliminar un rol que tiene usuarios asignados'
                ], 422);
            }

            DB::beginTransaction();
            
            $role->permissions()->detach();
            $role->delete();
            
            DB::commit();

            return response()->json([
                'message' => 'Rol eliminado exitosamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al eliminar el rol'], 500);
        }
    }

    public function updatePermissions(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        try {
            DB::beginTransaction();

            $role->syncPermissions($validated['permissions']);

            DB::commit();

            return response()->json([
                'message' => 'Permisos actualizados exitosamente',
                'role' => $role->load('permissions')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar los permisos'], 500);
        }
    }
}
