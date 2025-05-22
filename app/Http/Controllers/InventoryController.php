<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\RawMaterial;
use App\Models\InventoryMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('code', 'like', "%{$request->search}%")
                      ->orWhere('name', 'like', "%{$request->search}%");
                });
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->when($request->boolean('lowStock'), function ($query) {
                $query->whereRaw('current_stock <= min_stock');
            })
            ->orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'code' => $product->code,
                    'name' => $product->name,
                    'current_stock' => $product->current_stock,
                    'min_stock' => $product->min_stock,
                    'price' => $product->price,
                    'total_value' => $product->total_value,
                    'status' => $product->status,
                    'is_low_stock' => $product->isLowStock(),
                ];
            });        $rawMaterials = RawMaterial::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('code', 'like', "%{$request->search}%")
                      ->orWhere('name', 'like', "%{$request->search}%");
                });
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->when($request->boolean('lowStock'), function ($query) {
                $query->whereRaw('current_stock <= min_stock');
            })
            ->orderBy('name')
            ->get()
            ->map(function ($material) {
                return [
                    'id' => $material->id,
                    'code' => $material->code,
                    'name' => $material->name,
                    'current_stock' => $material->current_stock,
                    'min_stock' => $material->min_stock,
                    'unit_price' => $material->unit_price,
                    'total_value' => $material->total_value,
                    'unit_measure' => $material->unit_measure,
                    'status' => $material->status,
                    'is_low_stock' => $material->isLowStock(),
                ];
            });

        $totalInventoryValue = $products->sum('total_value') + $rawMaterials->sum('total_value');
        $lowStockItems = $products->where('is_low_stock', true)->count() + 
                        $rawMaterials->where('is_low_stock', true)->count();        return Inertia::render('Modules/Inventory/Index', [
            'products' => $products,
            'rawMaterials' => $rawMaterials,
            'stats' => [
                'total_value' => $totalInventoryValue ?? 0,
                'low_stock_items' => $lowStockItems ?? 0,
                'total_products' => $products->count(),
                'total_materials' => $rawMaterials->count(),
            ],
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'lowStock' => $request->boolean('lowStock'),
            ],
        ]);
    }

    public function movements(Request $request)
    {
        $movements = InventoryMovement::with(['rawMaterial', 'user'])
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('rawMaterial', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->when($request->input('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->input('date_from'), function ($query, $date) {
                $query->whereDate('created_at', '>=', $date);
            })
            ->when($request->input('date_to'), function ($query, $date) {
                $query->whereDate('created_at', '<=', $date);
            })
            ->orderByDesc('created_at')
            ->paginate(15)
            ->through(function ($movement) {
                return [
                    'id' => $movement->id,
                    'date' => $movement->created_at->format('Y-m-d H:i'),
                    'material' => [
                        'code' => $movement->rawMaterial->code,
                        'name' => $movement->rawMaterial->name,
                    ],
                    'type' => $movement->type,
                    'quantity' => $movement->quantity,
                    'previous_stock' => $movement->previous_stock,
                    'new_stock' => $movement->new_stock,
                    'reason' => $movement->reason,
                    'user' => $movement->user->name,
                ];
            });

        return Inertia::render('Modules/Inventory/Movements', [
            'movements' => $movements,
            'filters' => $request->only(['search', 'type', 'date_from', 'date_to']),
        ]);
    }

    public function adjustStock(Request $request, RawMaterial $rawMaterial)
    {
        $validated = $request->validate([
            'quantity' => 'required|numeric',
            'type' => 'required|in:entrada,salida',
            'reason' => 'required|string'
        ]);

        $success = $rawMaterial->updateStock(
            $validated['quantity'],
            $validated['type'],
            $validated['reason'],
            auth()->id()
        );

        if ($success) {
            return back()->with('message', 'Stock actualizado exitosamente');
        }

        return back()->with('error', 'Error al actualizar el stock');
    }

    public function store(Request $request, RawMaterial $rawMaterial)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,salida',
            'quantity' => 'required|numeric|min:0.01',
            'reason' => 'required|string'
        ]);

        try {
            $success = $rawMaterial->updateStock(
                $validated['quantity'],
                $validated['type'],
                $validated['reason'],
                auth()->id()
            );

            if ($success) {
                return back()->with('success', 'Movimiento registrado exitosamente');
            }

            return back()->with('error', 'Error al registrar el movimiento');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}