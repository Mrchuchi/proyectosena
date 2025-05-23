<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Client;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', function () {
        return Product::where('status', 'active')
            ->select(['id', 'code', 'name', 'current_stock'])
            ->get();
    })->name('api.products');

    Route::get('/clients', function () {
        return Client::where('status', 'active')
            ->select(['id', 'name', 'document_number'])
            ->get();
    })->name('api.clients');
});
