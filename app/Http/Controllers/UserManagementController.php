<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        try {
            $roles = Role::with('permissions')->get();
            $allPermissions = Permission::all();
            
            // Agrupar permisos por módulo para facilitar su manejo en el frontend
            $groupedPermissions = $allPermissions->groupBy('module')->map(function ($permissions) {
                return $permissions->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'description' => $permission->description,
                        'module' => $permission->module
                    ];
                })->values()->toArray();
            })->toArray();

            $users = User::with('role')->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ? [
                        'id' => $user->role->id,
                        'name' => $user->role->name
                    ] : null
                ];
            })->values()->all();

            $mappedRoles = $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'description' => $role->description,
                    'permissions' => $role->permissions->map(function ($permission) {
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'description' => $permission->description,
                            'module' => $permission->module
                        ];
                    })->values()->all()
                ];
            })->values()->all();

            return Inertia::render('Modules/Users/Index', [
                'users' => $users,
                'roles' => $mappedRoles,
                'permissions' => $groupedPermissions
            ]);
        } catch (Exception $e) {
            Log::error('Error in UserManagementController@index: ' . $e->getMessage());
            return Inertia::render('Modules/Users/Index', [
                'users' => [],
                'roles' => [],
                'permissions' => [],
                'error' => 'Ha ocurrido un error al cargar los datos. Por favor, intente nuevamente.'
            ]);
        }
    }

    public function create(): Response
    {
        try {
            $roles = Role::all()->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name
                ];
            });

            return Inertia::render('Modules/Users/Create', [
                'roles' => $roles
            ]);
        } catch (Exception $e) {
            Log::error('Error in UserManagementController@create: ' . $e->getMessage());
            return Inertia::render('Modules/Users/Create', [
                'roles' => [],
                'error' => 'Error al cargar el formulario de creación'
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'role_id' => 'required|exists:roles,id'
            ]);

            DB::beginTransaction();

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id' => $validated['role_id']
            ]);

            DB::commit();

            return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error in UserManagementController@store: ' . $e->getMessage());
            return back()->withInput()->with('error', 'Error al crear el usuario: ' . $e->getMessage());
        }
    }

    public function edit(User $user): Response
    {
        try {
            $roles = Role::all()->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name
                ];
            });

            return Inertia::render('Modules/Users/Edit', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role_id' => $user->role_id
                ],
                'roles' => $roles
            ]);
        } catch (Exception $e) {
            Log::error('Error in UserManagementController@edit: ' . $e->getMessage());
            return Inertia::render('Modules/Users/Edit', [
                'user' => null,
                'roles' => [],
                'error' => 'Error al cargar el formulario de edición'
            ]);
        }
    }

    public function update(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:8|confirmed',
                'role_id' => 'required|exists:roles,id'
            ]);

            DB::beginTransaction();

            $updateData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role_id' => $validated['role_id']
            ];

            if (!empty($validated['password'])) {
                $updateData['password'] = Hash::make($validated['password']);
            }

            $user->update($updateData);

            DB::commit();

            return redirect()->route('users.index')->with('success', 'Usuario actualizado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error in UserManagementController@update: ' . $e->getMessage());
            return back()->withInput()->with('error', 'Error al actualizar el usuario: ' . $e->getMessage());
        }
    }

    public function destroy(User $user)
    {
        try {
            if ($user->id === auth()->id()) {
                throw new Exception('No puedes eliminar tu propio usuario');
            }

            DB::beginTransaction();
            $user->delete();
            DB::commit();

            return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error in UserManagementController@destroy: ' . $e->getMessage());
            return back()->with('error', 'Error al eliminar el usuario: ' . $e->getMessage());
        }
    }

    public function show(User $user): Response
    {
        try {
            return Inertia::render('Modules/Users/Show', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ? [
                        'id' => $user->role->id,
                        'name' => $user->role->name,
                        'description' => $user->role->description
                    ] : null,
                    'active' => $user->active,
                    'created_at' => $user->created_at->format('d/m/Y H:i:s'),
                    'updated_at' => $user->updated_at->format('d/m/Y H:i:s'),
                ]
            ]);
        } catch (Exception $e) {
            Log::error('Error in UserManagementController@show: ' . $e->getMessage());
            return back()->with('error', 'Error al cargar los detalles del usuario');
        }
    }
}
