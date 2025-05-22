<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\Client;
use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductMovementController extends Controller
{
    public function index(Request $request)
    {
        $movements = ProductMovement::with(['product', 'rawMaterial', 'client', 'user'])
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->whereHas('product', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('code', 'like', "%{$search}%");
                    })
                    ->orWhereHas('rawMaterial', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('code', 'like', "%{$search}%");
                    });
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
                $item = $movement->product ?? $movement->rawMaterial;
                return [
                    'id' => $movement->id,
                    'date' => $movement->created_at->format('Y-m-d H:i'),
                    'product' => [
                        'code' => $item->code,
                        'name' => $item->name,
                    ],
                    'type' => $movement->type,
                    'quantity' => $movement->quantity,
                    'previous_stock' => $movement->previous_stock,
                    'new_stock' => $movement->new_stock,
                    'reason' => $movement->reason,
                    'client' => $movement->client ? [
                        'name' => $movement->client->name,
                        'document' => $movement->client->document_number,
                    ] : null,
                    'user' => $movement->user->name,
                ];
            });

        return Inertia::render('Modules/Movements/Index', [
            'movements' => $movements,
            'filters' => $request->only(['search', 'type', 'date_from', 'date_to']),
            'clients' => Client::where('status', 'active')->get(['id', 'name', 'document_number']),
            'products' => Product::where('status', 'active')->get(['id', 'code', 'name', 'current_stock']),
            'rawMaterials' => RawMaterial::where('status', 'active')->get(['id', 'code', 'name', 'current_stock'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,salida',
            'item_type' => 'required|in:product,raw_material',
            'item_id' => 'required|numeric',
            'quantity' => 'required|numeric|min:0.01',
            'reason' => 'required|string',
            'client_id' => 'required_if:type,salida|exists:clients,id'
        ]);

        try {
            if ($validated['item_type'] === 'product') {
                $item = Product::findOrFail($validated['item_id']);
                $movement = new ProductMovement([
                    'product_id' => $validated['item_id'],
                    'type' => $validated['type'],
                    'quantity' => $validated['quantity'],
                    'reason' => $validated['reason'],
                    'user_id' => auth()->id(),
                    'client_id' => $validated['client_id'] ?? null
                ]);
            } else {
                $item = RawMaterial::findOrFail($validated['item_id']);
                $movement = new ProductMovement([
                    'raw_material_id' => $validated['item_id'],
                    'type' => $validated['type'],
                    'quantity' => $validated['quantity'],
                    'reason' => $validated['reason'],
                    'user_id' => auth()->id(),
                    'client_id' => $validated['client_id'] ?? null
                ]);
            }

            $previousStock = $item->current_stock;
            $newStock = $previousStock;

            if ($validated['type'] === 'entrada') {
                $newStock += $validated['quantity'];
            } else {
                if ($validated['quantity'] > $previousStock) {
                    throw new \Exception('Stock insuficiente');
                }
                $newStock -= $validated['quantity'];
            }

            $movement->previous_stock = $previousStock;
            $movement->new_stock = $newStock;
            $movement->save();

            $item->current_stock = $newStock;
            $item->save();

            return back()->with('success', 'Movimiento registrado exitosamente');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
