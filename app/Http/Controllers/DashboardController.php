<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\RawMaterial;
use App\Models\ProductionOrder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener estadísticas de materiales bajos en stock
        $lowStockMaterials = RawMaterial::where('status', 'active')
            ->whereRaw('current_stock <= min_stock')
            ->get();

        // Obtener órdenes de producción pendientes
        $pendingOrders = ProductionOrder::with(['product', 'recipe'])
            ->where('status', 'pending')
            ->orderBy('planned_date')
            ->limit(5)
            ->get();

        // Obtener órdenes en progreso
        $inProgressOrders = ProductionOrder::with(['product', 'recipe'])
            ->where('status', 'in_progress')
            ->orderBy('start_date')
            ->limit(5)
            ->get();        // Calcular valores totales
        $rawMaterialsValue = RawMaterial::where('status', 'active')
            ->sum(DB::raw('ROUND(current_stock * unit_price)'));
            
        $productsValue = Product::where('status', 'active')
            ->sum(DB::raw('ROUND(current_stock * price)'));

        $totalValue = round($rawMaterialsValue + $productsValue);
        
        $totalProducts = Product::where('status', 'active')->count();
        $totalMaterials = RawMaterial::where('status', 'active')->count();
        $lowStockCount = $lowStockMaterials->count();

        // Obtener productos más vendidos o utilizados
        $topProducts = Product::where('status', 'active')
            ->orderBy('current_stock', 'desc')
            ->limit(5)
            ->get();        return Inertia::render('Modules/Dashboard/Index', [
            'stats' => [
                'totalValue' => $totalValue,
                'totalProducts' => $totalProducts,
                'totalMaterials' => $totalMaterials,
                'lowStockCount' => $lowStockCount,
            ],
            'lowStockMaterials' => $lowStockMaterials,
            'pendingOrders' => $pendingOrders,
            'inProgressOrders' => $inProgressOrders,
            'topProducts' => $topProducts,
        ]);
    }
}
