<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\Client;
use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductMovementController extends Controller
{    public function index(Request $request)
    {
        $movements = ProductMovement::with(['product', 'rawMaterial', 'client', 'user'])
            ->when($request->input('item_type') && $request->input('item_id'), function ($query) use ($request) {
                if ($request->input('item_type') === 'product') {
                    return $query->where('product_id', $request->input('item_id'));
                } else if ($request->input('item_type') === 'raw_material') {
                    return $query->where('raw_material_id', $request->input('item_id'));
                }
            })
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
            ->through(function ($movement) {                $item = $movement->product ?? $movement->rawMaterial;
                $itemType = $movement->product ? 'Producto' : 'Materia Prima';
                
                return [
                    'id' => $movement->id,
                    'date' => $movement->created_at->format('Y-m-d H:i'),
                    'item_type' => $itemType,
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

        return Inertia::render('Modules/Movements/Index', [            'movements' => $movements,
            'filters' => $request->only(['search', 'type', 'date_from', 'date_to', 'item_type', 'item_id']),
            'clients' => Client::where('status', 'active')->get(['id', 'name', 'document_number']),
            'products' => Product::where('status', 'active')->get(['id', 'code', 'name', 'current_stock']),
            'rawMaterials' => RawMaterial::where('status', 'active')->get(['id', 'code', 'name', 'current_stock'])
        ]);
    }

    public function store(Request $request)
    {        $rules = [
            'type' => 'required|in:entrada,salida',
            'item_type' => 'required|in:product,raw_material',
            'item_id' => 'required|numeric',
            'quantity' => 'required|numeric|min:0.01',
            'reason' => 'required|string',
        ];

        if ($request->input('type') === 'salida') {
            $rules['client_id'] = 'required|exists:clients,id';
        }

        $validated = $request->validate($rules);

        try {
            if ($validated['item_type'] === 'product') {
                $item = Product::findOrFail($validated['item_id']);                $movement = new ProductMovement();
                $movement->product_id = $validated['item_id'];
                $movement->type = $validated['type'];
                $movement->quantity = $validated['quantity'];
                $movement->reason = $validated['reason'];
                $movement->user_id = auth()->id();
                $movement->client_id = $validated['client_id'] ?? null;
            } else {
                $item = RawMaterial::findOrFail($validated['item_id']);                $movement = new ProductMovement();
                $movement->raw_material_id = $validated['item_id'];
                $movement->type = $validated['type'];
                $movement->quantity = $validated['quantity'];
                $movement->reason = $validated['reason'];
                $movement->user_id = auth()->id();
                $movement->client_id = $validated['client_id'] ?? null;
            }

            $previousStock = $item->current_stock;
            $newStock = $previousStock;

            // Calcular el nuevo stock
            if ($validated['type'] === 'entrada') {
                $newStock += $validated['quantity'];
            } else {
                if ($validated['quantity'] > $previousStock) {
                    throw new \Exception('Stock insuficiente');
                }
                $newStock -= $validated['quantity'];
            }

            // Guardar el movimiento
            $movement->previous_stock = $previousStock;
            $movement->new_stock = $newStock;
            $movement->save();

            // Actualizar el stock del ítem
            if ($validated['item_type'] === 'product') {
                $item->current_stock = $newStock;
                $item->save();
            } else {
                $item->current_stock = $newStock;
                $item->save();
            }            // Preparar los datos del nuevo movimiento para la respuesta
            $newMovement = [
                'id' => $movement->id,
                'date' => $movement->created_at->format('Y-m-d H:i'),
                'item_type' => $validated['item_type'] === 'product' ? 'Producto' : 'Materia Prima',
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
                'user' => auth()->user()->name,
            ];            return back()->with([
                'success' => 'Movimiento registrado exitosamente',
                'newMovement' => $newMovement
            ]);
        } catch (\Exception $e) {
            return redirect()->route('movements')->with('error', $e->getMessage());
        }
    }
}
