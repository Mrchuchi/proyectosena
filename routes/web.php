<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductMovementController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductionOrderController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Rutas de Materia Prima
    Route::controller(RawMaterialController::class)->group(function () {
        Route::get('/materias-primas', 'index')->name('raw-materials.index')->middleware('permission:ver_materias_primas');
        Route::get('/materias-primas/crear', 'create')->name('raw-materials.create')->middleware('permission:crear_materias_primas');
        Route::post('/materias-primas', 'store')->name('raw-materials.store')->middleware('permission:crear_materias_primas');
        Route::get('/materias-primas/{rawMaterial}', 'show')->name('raw-materials.show')->middleware('permission:ver_materias_primas');
        Route::get('/materias-primas/{rawMaterial}/editar', 'edit')->name('raw-materials.edit')->middleware('permission:editar_materias_primas');
        Route::put('/materias-primas/{rawMaterial}', 'update')->name('raw-materials.update')->middleware('permission:editar_materias_primas');
        Route::delete('/materias-primas/{rawMaterial}', 'destroy')->name('raw-materials.destroy')->middleware('permission:eliminar_materias_primas');
    });

    // Rutas de Productos
    Route::controller(ProductController::class)->group(function () {
        Route::get('/productos', 'index')->name('products.index')->middleware('permission:ver_productos');
        Route::get('/productos/crear', 'create')->name('products.create')->middleware('permission:crear_productos');
        Route::post('/productos', 'store')->name('products.store')->middleware('permission:crear_productos');
        Route::get('/productos/{product}', 'show')->name('products.show')->middleware('permission:ver_productos');
        Route::get('/productos/{product}/editar', 'edit')->name('products.edit')->middleware('permission:editar_productos');
        Route::put('/productos/{product}', 'update')->name('products.update')->middleware('permission:editar_productos');
        Route::delete('/productos/{product}', 'destroy')->name('products.destroy')->middleware('permission:eliminar_productos');
    });

    // Clientes
    Route::controller(ClientController::class)->group(function () {
        Route::get('/clientes', 'index')->name('clients.index')->middleware('permission:ver_clientes');
        Route::get('/clientes/crear', 'create')->name('clients.create')->middleware('permission:crear_clientes');
        Route::post('/clientes', 'store')->name('clients.store')->middleware('permission:crear_clientes');
        Route::get('/clientes/{client}', 'show')->name('clients.show')->middleware('permission:ver_clientes');
        Route::get('/clientes/{client}/editar', 'edit')->name('clients.edit')->middleware('permission:editar_clientes');
        Route::put('/clientes/{client}', 'update')->name('clients.update')->middleware('permission:editar_clientes');
        Route::delete('/clientes/{client}', 'destroy')->name('clients.destroy')->middleware('permission:eliminar_clientes');
    });

    // Recetas
    Route::controller(RecipeController::class)->group(function () {
        Route::get('/recipes', 'index')->name('recipes.index')->middleware('permission:ver_recetas');
        Route::get('/recipes/create', 'create')->name('recipes.create')->middleware('permission:crear_recetas');
        Route::post('/recipes', 'store')->name('recipes.store')->middleware('permission:crear_recetas');
        Route::get('/recipes/{recipe}', 'show')->name('recipes.show')->middleware('permission:ver_recetas');
        Route::get('/recipes/{recipe}/edit', 'edit')->name('recipes.edit')->middleware('permission:editar_recetas');
        Route::put('/recipes/{recipe}', 'update')->name('recipes.update')->middleware('permission:editar_recetas');
        Route::delete('/recipes/{recipe}', 'destroy')->name('recipes.destroy')->middleware('permission:eliminar_recetas');
    });

    // Inventario
    Route::controller(InventoryController::class)->group(function () {
        Route::get('/inventory', 'index')->name('inventory.index')->middleware('permission:ver_inventario');
        Route::get('/inventory/movements', 'movements')->name('inventory.movements')->middleware('permission:ver_movimientos');
        Route::post('/inventory/{rawMaterial}/adjust', 'adjustStock')->name('inventory.adjust')->middleware('permission:ajustar_inventario');
    });

    // Entradas/Salidas
    Route::controller(ProductMovementController::class)->group(function () {
        Route::get('/movements', 'index')->name('movements.index')->middleware('permission:ver_movimientos');
        Route::post('/movements/{item_type}/{item_id}', 'store')->name('movements.store')->middleware('permission:crear_movimientos');
    });

    // Gestión de Usuarios
    Route::controller(UserManagementController::class)->group(function () {
        Route::get('/users', 'index')->name('users.index')->middleware('permission:ver_usuarios');
        Route::get('/users/create', 'create')->name('users.create')->middleware('permission:crear_usuarios');
        Route::post('/users', 'store')->name('users.store')->middleware('permission:crear_usuarios');
        Route::get('/users/{user}', 'show')->name('users.show')->middleware('permission:ver_usuarios');
        Route::get('/users/{user}/edit', 'edit')->name('users.edit')->middleware('permission:editar_usuarios');
        Route::put('/users/{user}', 'update')->name('users.update')->middleware('permission:editar_usuarios');
        Route::delete('/users/{user}', 'destroy')->name('users.destroy')->middleware('permission:eliminar_usuarios');
    });

    // Gestión de Roles
    Route::controller(RoleController::class)->middleware('permission:gestionar_roles')->group(function () {
        Route::get('/roles', 'index')->name('roles.index');
        Route::post('/roles', 'store')->name('roles.store');
        Route::get('/roles/{role}', 'show')->name('roles.show');
        Route::put('/roles/{role}', 'update')->name('roles.update');
        Route::delete('/roles/{role}', 'destroy')->name('roles.destroy');
        Route::put('/roles/{role}/permissions', 'updatePermissions')->name('roles.permissions.update');
    });



    // Rutas para Órdenes de Producción
    Route::prefix('production')->name('production.')->group(function () {
        Route::get('/', [ProductionOrderController::class, 'index'])->name('index');
        Route::get('/create', [ProductionOrderController::class, 'create'])->name('create');
        Route::post('/', [ProductionOrderController::class, 'store'])->name('store');
        Route::get('/{order}', [ProductionOrderController::class, 'show'])->name('show');
        Route::post('/{order}/start', [ProductionOrderController::class, 'start'])->name('start');
        Route::post('/{order}/complete', [ProductionOrderController::class, 'complete'])->name('complete');
    });

    // Movimientos de Productos
    Route::controller(ProductMovementController::class)->group(function () {
        Route::get('/product-movements', 'index')->name('product-movements.index');
        Route::post('/product-movements/{product}', 'store')->name('product-movements.store');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
