<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductionOrderController;
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
    Route::get('/dashboard', function () {
        return Inertia::render('Modules/Dashboard/Index');
    })->name('dashboard');

    // Rutas de Materia Prima
    Route::controller(RawMaterialController::class)->group(function () {
        Route::get('/materias-primas', 'index')->name('raw-materials.index');
        Route::get('/materias-primas/crear', 'create')->name('raw-materials.create');
        Route::post('/materias-primas', 'store')->name('raw-materials.store');
        Route::get('/materias-primas/{rawMaterial}', 'show')->name('raw-materials.show');
        Route::get('/materias-primas/{rawMaterial}/editar', 'edit')->name('raw-materials.edit');
        Route::put('/materias-primas/{rawMaterial}', 'update')->name('raw-materials.update');
        Route::delete('/materias-primas/{rawMaterial}', 'destroy')->name('raw-materials.destroy');
    });

    // Rutas de Productos
    Route::controller(ProductController::class)->group(function () {
        Route::get('/productos', 'index')->name('products.index');
        Route::get('/productos/crear', 'create')->name('products.create');
        Route::post('/productos', 'store')->name('products.store');
        Route::get('/productos/{product}', 'show')->name('products.show');
        Route::get('/productos/{product}/editar', 'edit')->name('products.edit');
        Route::put('/productos/{product}', 'update')->name('products.update');
        Route::delete('/productos/{product}', 'destroy')->name('products.destroy');
    });

    // Clientes
    Route::controller(ClientController::class)->group(function () {
        Route::get('/clientes', 'index')->name('clients.index');
        Route::get('/clientes/crear', 'create')->name('clients.create');
        Route::post('/clientes', 'store')->name('clients.store');
        Route::get('/clientes/{client}', 'show')->name('clients.show');
        Route::get('/clientes/{client}/editar', 'edit')->name('clients.edit');
        Route::put('/clientes/{client}', 'update')->name('clients.update');
        Route::delete('/clientes/{client}', 'destroy')->name('clients.destroy');
    });

    // Recetas
    Route::controller(RecipeController::class)->group(function () {
        Route::get('/recipes', 'index')->name('recipes.index');
        Route::get('/recipes/create', 'create')->name('recipes.create');
        Route::post('/recipes', 'store')->name('recipes.store');
        Route::get('/recipes/{recipe}', 'show')->name('recipes.show');
        Route::get('/recipes/{recipe}/edit', 'edit')->name('recipes.edit');
        Route::put('/recipes/{recipe}', 'update')->name('recipes.update');
        Route::delete('/recipes/{recipe}', 'destroy')->name('recipes.destroy');
    });

    // Inventario
    Route::get('/inventory', function () {
        return Inertia::render('Modules/Inventory/Index');
    })->name('inventory');

    // Entradas/Salidas
    Route::get('/movements', function () {
        return Inertia::render('Modules/Movements/Index');
    })->name('movements');

    // Gestión de Usuarios
    Route::get('/users', function () {
        return Inertia::render('Modules/Users/Index');
    })->name('users');

    // Reportes
    Route::get('/reports', function () {
        return Inertia::render('Modules/Reports/Index');
    })->name('reports');

    // Configuración
    Route::get('/settings', function () {
        return Inertia::render('Modules/Settings/Index');
    })->name('settings');

    // Rutas para Órdenes de Producción
    Route::prefix('production')->name('production.')->group(function () {
        Route::get('/', [ProductionOrderController::class, 'index'])->name('index');
        Route::get('/create', [ProductionOrderController::class, 'create'])->name('create');
        Route::post('/', [ProductionOrderController::class, 'store'])->name('store');
        Route::get('/{order}', [ProductionOrderController::class, 'show'])->name('show');
        Route::post('/{order}/start', [ProductionOrderController::class, 'start'])->name('start');
        Route::post('/{order}/complete', [ProductionOrderController::class, 'complete'])->name('complete');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
