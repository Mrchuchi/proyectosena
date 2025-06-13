<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Recipe;
use App\Models\Product;
use App\Models\RawMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $recipes = Recipe::query()
            ->with(['product', 'rawMaterials'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhereHas('product', function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        // Debug the recipes data
        Log::debug('Recipes loaded:', [
            'count' => $recipes->count(),
            'first_recipe' => $recipes->first(),
            'has_raw_materials' => $recipes->first() ? $recipes->first()->rawMaterials->count() : 0
        ]);

        return Inertia::render('Modules/Recipes/Index', [
            'recipes' => $recipes->map(function ($recipe) {
                return [
                    'id' => $recipe->id,
                    'code' => $recipe->code,
                    'name' => $recipe->name,
                    'description' => $recipe->description,
                    'status' => $recipe->status,
                    'product' => [
                        'id' => $recipe->product->id,
                        'name' => $recipe->product->name
                    ],
                    'rawMaterials' => $recipe->rawMaterials->map(function ($material) {
                        return [
                            'id' => $material->id,
                            'name' => $material->name,
                            'unit_measure' => $material->unit_measure,
                            'pivot' => $material->pivot
                        ];
                    })
                ];
            }),
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $lastCode = Recipe::orderBy('code', 'desc')->first()?->code ?? 'REC-000000';
        $nextNumber = (int)substr($lastCode, 4) + 1;
        $nextCode = 'REC-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);

        return Inertia::render('Modules/Recipes/Create', [
            'nextCode' => $nextCode,
            'products' => Product::orderBy('name')->get(),
            'rawMaterials' => RawMaterial::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:recipes,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'product_id' => 'required|exists:products,id',
            'status' => 'required|in:active,inactive',
            'materials' => 'required|array|min:1',
            'materials.*.id' => 'required|exists:raw_materials,id',
            'materials.*.quantity' => 'required|numeric|min:0.01'
        ]);

        $recipe = Recipe::create([
            'code' => $validated['code'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'product_id' => $validated['product_id'],
            'status' => $validated['status']
        ]);

        $materials = collect($validated['materials'])->mapWithKeys(function ($material) {
            return [$material['id'] => ['quantity' => $material['quantity']]];
        });

        $recipe->rawMaterials()->attach($materials);

        return redirect()->route('recipes.show', $recipe->id)
            ->with('success', 'Receta creada exitosamente.');
    }

    public function show(Recipe $recipe)
    {
        $recipe->load(['product', 'rawMaterials']);
        
        return Inertia::render('Modules/Recipes/Show', [
            'recipe' => [
                'id' => $recipe->id,
                'code' => $recipe->code,
                'name' => $recipe->name,
                'description' => $recipe->description,
                'status' => $recipe->status,
                'product' => [
                    'id' => $recipe->product->id,
                    'name' => $recipe->product->name
                ],
                'rawMaterials' => $recipe->rawMaterials->map(function ($material) {
                    return [
                        'id' => $material->id,
                        'name' => $material->name,
                        'unit_measure' => $material->unit_measure,
                        'pivot' => $material->pivot
                    ];
                })
            ]
        ]);
    }

    public function edit(Recipe $recipe)
    {
        $recipe->load(['product', 'rawMaterials']);

        return Inertia::render('Modules/Recipes/Edit', [
            'recipe' => [
                'id' => $recipe->id,
                'code' => $recipe->code,
                'name' => $recipe->name,
                'description' => $recipe->description,
                'status' => $recipe->status,
                'product_id' => $recipe->product_id,
                'product' => [
                    'id' => $recipe->product->id,
                    'name' => $recipe->product->name
                ],
                'rawMaterials' => $recipe->rawMaterials->map(function ($material) {
                    return [
                        'id' => $material->id,
                        'name' => $material->name,
                        'unit_measure' => $material->unit_measure,
                        'pivot' => [
                            'quantity' => $material->pivot->quantity
                        ]
                    ];
                })
            ],
            'products' => Product::orderBy('name')->get(),
            'rawMaterials' => RawMaterial::orderBy('name')->get()
        ]);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'product_id' => 'required|exists:products,id',
            'status' => 'required|in:active,inactive',
            'materials' => 'required|array|min:1',
            'materials.*.id' => 'required|exists:raw_materials,id',
            'materials.*.quantity' => 'required|numeric|min:0.01'
        ]);

        $recipe->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'product_id' => $validated['product_id'],
            'status' => $validated['status']
        ]);

        $materials = collect($validated['materials'])->mapWithKeys(function ($material) {
            return [$material['id'] => ['quantity' => $material['quantity']]];
        });

        $recipe->rawMaterials()->sync($materials);

        return redirect()->route('recipes.show', $recipe->id)
            ->with('success', '¡La receta ha sido actualizada exitosamente!');
    }

    public function destroy(Recipe $recipe)
    {
        $recipeName = $recipe->name;
        $recipe->rawMaterials()->detach();
        $recipe->delete();

        return redirect()->route('recipes.index')
            ->with('success', "¡La receta '{$recipeName}' ha sido eliminada exitosamente!");
    }
}