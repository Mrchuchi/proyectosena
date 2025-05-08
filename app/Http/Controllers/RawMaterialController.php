<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawMaterialController extends Controller
{
    private function generateCode()
    {
        $lastMaterial = RawMaterial::orderBy('id', 'desc')->first();
        $lastId = $lastMaterial ? $lastMaterial->id : 0;
        $newId = $lastId + 1;
        return 'MAT' . str_pad($newId, 4, '0', STR_PAD_LEFT);
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $materials = RawMaterial::query()
            ->when($search, function($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhere('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('main_supplier', 'like', "%{$search}%");
                });
            })
            ->orderBy('name')
            ->get();

        return Inertia::render('Modules/RawMaterials/Index', [
            'materials' => $materials,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Modules/RawMaterials/Create', [
            'nextCode' => $this->generateCode()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:raw_materials',
            'name' => 'required',
            'unit_measure' => 'required',
            'min_stock' => 'required|numeric|min:0',
            'current_stock' => 'required|numeric|min:0',
            'unit_price' => 'required|numeric|min:0',
            'main_supplier' => 'nullable|string',
            'description' => 'nullable|string',
            'last_purchase' => 'nullable|date',
            'status' => 'required|in:active,inactive'
        ]);

        $material = RawMaterial::create($validated);

        // Registrar el movimiento inicial si hay stock
        if ($validated['current_stock'] > 0) {
            $material->updateStock(
                $validated['current_stock'],
                'entrada',
                'Stock inicial',
                auth()->id()
            );
        }

        return redirect()->route('raw-materials.index')
            ->with('message', 'Material creado exitosamente');
    }

    public function show(RawMaterial $rawMaterial)
    {
        return Inertia::render('Modules/RawMaterials/Show', [
            'material' => $rawMaterial,
            'movements' => $rawMaterial->movements()
                ->with('user:id,name')
                ->orderByDesc('created_at')
                ->get()
        ]);
    }

    public function edit(RawMaterial $rawMaterial)
    {
        return Inertia::render('Modules/RawMaterials/Edit', [
            'material' => $rawMaterial
        ]);
    }

    public function update(Request $request, RawMaterial $rawMaterial)
    {
        $validated = $request->validate([
            'code' => 'required|unique:raw_materials,code,' . $rawMaterial->id,
            'name' => 'required',
            'unit_measure' => 'required',
            'min_stock' => 'required|numeric|min:0',
            'current_stock' => 'required|numeric|min:0',
            'unit_price' => 'required|numeric|min:0',
            'main_supplier' => 'nullable|string',
            'description' => 'nullable|string',
            'last_purchase' => 'nullable|date',
            'status' => 'required|in:active,inactive'
        ]);

        // Si el stock cambió, registrar el movimiento
        if ($rawMaterial->current_stock != $validated['current_stock']) {
            $difference = $validated['current_stock'] - $rawMaterial->current_stock;
            $type = $difference > 0 ? 'entrada' : 'salida';
            $quantity = abs($difference);
            
            $rawMaterial->updateStock(
                $quantity,
                $type,
                'Ajuste manual de inventario',
                auth()->id()
            );
        }

        $rawMaterial->update($validated);

        return redirect()->route('raw-materials.index')
            ->with('message', 'Material actualizado exitosamente');
    }

    public function destroy(RawMaterial $rawMaterial)
    {
        $rawMaterial->delete();

        return redirect()->route('raw-materials.index')
            ->with('message', 'Material eliminado exitosamente');
    }
}