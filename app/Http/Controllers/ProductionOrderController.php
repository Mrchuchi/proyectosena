<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Recipe;
use App\Models\ProductionOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductionOrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $orders = ProductionOrder::with([
                'product',
                'recipe.rawMaterials' => function($query) {
                    $query->select('raw_materials.id', 'raw_materials.name', 'raw_materials.current_stock', 'raw_materials.unit_measure');
                }
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhereHas('product', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Modules/Production/Index', [
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        $products = Product::where('status', 'active')->get();
        $recipes = Recipe::where('status', 'active')->with('rawMaterials')->get();

        return Inertia::render('Modules/Production/Create', [
            'products' => $products,
            'recipes' => $recipes,
            'nextCode' => $this->generateCode()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:production_orders',
            'product_id' => 'required|exists:products,id',
            'recipe_id' => 'required|exists:recipes,id',
            'quantity' => 'required|numeric|min:0.01',
            'planned_date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $validated['created_by'] = auth()->id();

        $order = ProductionOrder::create($validated);

        return redirect()->route('production.index')
            ->with('success', 'Orden de producción creada exitosamente.');
    }

    public function show(ProductionOrder $order)
    {
        $order->load([
            'product',
            'recipe.rawMaterials' => function($query) {
                $query->select('raw_materials.id', 'raw_materials.name', 'raw_materials.current_stock', 'raw_materials.unit_measure');
            },
            'creator'
        ]);

        return Inertia::render('Modules/Production/Show', [
            'order' => [
                'id' => $order->id,
                'code' => $order->code,
                'quantity' => $order->quantity,
                'planned_date' => $order->planned_date ? $order->planned_date->format('Y-m-d') : null,
                'start_date' => $order->start_date ? $order->start_date->format('Y-m-d') : null,
                'end_date' => $order->end_date ? $order->end_date->format('Y-m-d') : null,
                'status' => $order->status,
                'notes' => $order->notes,
                'product' => [
                    'id' => $order->product->id,
                    'name' => $order->product->name,
                ],
                'recipe' => [
                    'id' => $order->recipe->id,
                    'name' => $order->recipe->name,
                    'rawMaterials' => $order->recipe->rawMaterials->map(function ($material) {
                        return [
                            'id' => $material->id,
                            'name' => $material->name,
                            'current_stock' => $material->current_stock,
                            'unit_measure' => $material->unit_measure,
                            'pivot' => $material->pivot
                        ];
                    })
                ],
                'creator' => $order->creator ? [
                    'id' => $order->creator->id,
                    'name' => $order->creator->name
                ] : null
            ]
        ]);
    }

    public function start(ProductionOrder $order)
    {
        if (!$order->canStart()) {
            return back()->with('error', 'No hay suficiente stock de materias primas para iniciar la producción.');
        }

        if ($order->start()) {
            return back()->with('success', 'Orden de producción iniciada exitosamente.');
        }

        return back()->with('error', 'No se pudo iniciar la orden de producción.');
    }

    public function complete(ProductionOrder $order)
    {
        if ($order->complete()) {
            return back()->with('success', 'Orden de producción completada exitosamente.');
        }

        return back()->with('error', 'No se pudo completar la orden de producción.');
    }

    private function generateCode()
    {
        $lastOrder = ProductionOrder::orderBy('id', 'desc')->first();
        $lastId = $lastOrder ? $lastOrder->id : 0;
        $nextId = $lastId + 1;
        return 'OP-' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
    }
}
