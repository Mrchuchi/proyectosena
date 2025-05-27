<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\Client;
use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductMovementController extends Controller
{    public function index(Request $request)
    {
        $movements = ProductMovement::with(['product', 'rawMaterial', 'client', 'user'])
            ->when($request->input('item_type'), function($query, $itemType) {
                if ($itemType === 'product') {
                    $query->whereNotNull('product_id')->whereNull('raw_material_id');
                } elseif ($itemType === 'raw_material') {
                    $query->whereNotNull('raw_material_id')->whereNull('product_id');
                }
            })
            ->when($request->input('item_id'), function($query, $itemId) use ($request) {
                if ($request->input('item_type') === 'product') {
                    $query->where('product_id', $itemId);
                } else {
                    $query->where('raw_material_id', $itemId);
                }
            })
            ->when($request->input('search'), function($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->whereHas('product', function($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('code', 'like', "%{$search}%");
                    })
                    ->orWhereHas('rawMaterial', function($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('code', 'like', "%{$search}%");
                    });
                });
            })
            ->when($request->input('type'), function($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->input('date_from'), function($query, $date) {
                $query->whereDate('created_at', '>=', $date);
            })
            ->when($request->input('date_to'), function($query, $date) {
                $query->whereDate('created_at', '<=', $date);
            })
            ->orderByDesc('created_at')
            ->paginate(15)
            ->through(function($movement) {
                return [
                    'id' => $movement->id,
                    'date' => $movement->created_at->format('Y-m-d H:i'),
                    'item_type' => $movement->product_id ? 'Producto' : 'Materia Prima',
                    'item' => $movement->product_id 
                        ? [
                            'code' => $movement->product->code,
                            'name' => $movement->product->name,
                        ] 
                        : ($movement->rawMaterial 
                            ? [
                                'code' => $movement->rawMaterial->code,
                                'name' => $movement->rawMaterial->name,
                            ] 
                            : null
                        ),
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
            'filters' => $request->only(['search', 'type', 'date_from', 'date_to', 'item_type', 'item_id']),
            'clients' => Client::where('status', 'active')->get(['id', 'name', 'document_number']),
            'products' => Product::where('status', 'active')->get(['id', 'code', 'name', 'current_stock']),
            'rawMaterials' => RawMaterial::where('status', 'active')->get(['id', 'code', 'name', 'current_stock'])
        ]);
    }

    public function store(Request $request, $item_type, $item_id)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,salida',
            'quantity' => 'required|numeric|min:0.01',
            'reason' => 'required|string',
            'client_id' => 'nullable|integer|exists:clients,id',
        ]);

        try {
            DB::beginTransaction();
            
            // Obtener el item (producto o materia prima)
            $item = null;
            if ($item_type === 'product') {
                $item = Product::findOrFail($item_id);
            } else {
                $item = RawMaterial::findOrFail($item_id);
            }

            // Calcular el stock anterior y nuevo
            $previous_stock = $item->current_stock;
            $new_stock = $validated['type'] === 'entrada' 
                ? $previous_stock + $validated['quantity']
                : $previous_stock - $validated['quantity'];

            if ($new_stock < 0) {
                throw new \Exception('No hay suficiente stock disponible.');
            }

            // Crear el movimiento
            $movement = new ProductMovement();
            if ($item_type === 'product') {
                $movement->product_id = $item_id;
            } else {
                $movement->raw_material_id = $item_id;
            }
            $movement->type = $validated['type'];
            $movement->quantity = $validated['quantity'];
            $movement->previous_stock = $previous_stock;
            $movement->new_stock = $new_stock;
            $movement->reason = $validated['reason'];
            $movement->client_id = $validated['client_id'] ?? null;
            $movement->user_id = auth()->id();
            $movement->save();

            // Actualizar el stock
            $item->current_stock = $new_stock;
            $item->save();

            DB::commit();

            return back()->with('success', 'Movimiento registrado exitosamente');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
