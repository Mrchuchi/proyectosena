<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawMaterialController extends Controller
{
    public function index()
    {
        $materials = RawMaterial::orderBy('name')->get();
        return Inertia::render('Modules/RawMaterials/Index', [
            'materials' => $materials
        ]);
    }

    public function create()
    {
        return Inertia::render('Modules/RawMaterials/Create');
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

        RawMaterial::create($validated);

        return redirect()->route('raw-materials.index')
            ->with('message', 'Material creado exitosamente');
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