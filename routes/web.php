<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RawMaterialController;
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

    // Clientes
    Route::get('/clients', function () {
        return Inertia::render('Modules/Clients/Index');
    })->name('clients');

    // Materia Prima
    Route::get('/raw-materials', function () {
        return Inertia::render('Modules/RawMaterials/Index');
    })->name('raw-materials');

    // Rutas de Materia Prima
    Route::resource('raw-materials', RawMaterialController::class);

    // Productos
    Route::get('/products', function () {
        return Inertia::render('Modules/Products/Index');
    })->name('products');

    // Recetas
    Route::get('/recipes', function () {
        return Inertia::render('Modules/Recipes/Index');
    })->name('recipes');

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
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
