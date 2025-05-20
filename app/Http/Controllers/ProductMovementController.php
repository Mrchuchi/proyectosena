<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductMovementController extends Controller
{    public function index(Request $request)
    {
        $movements = ProductMovement::with(['product', 'client', 'user'])
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
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
                    'product' => [
                        'code' => $movement->product->code,
                        'name' => $movement->product->name,
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
            'products' => Product::where('status', 'active')->get(['id', 'code', 'name', 'current_stock'])
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,salida',
            'quantity' => 'required|numeric|min:0.01',
            'reason' => 'required|string',
            'client_id' => 'required_if:type,salida|exists:clients,id'
        ]);

        try {
            $product->updateStock(
                $validated['quantity'],
                $validated['type'],
                $validated['reason'],
                auth()->id(),
                $validated['client_id'] ?? null
            );

            return back()->with('success', 'Movimiento registrado exitosamente');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
