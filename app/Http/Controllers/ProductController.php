<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function generateCode()
    {
        $lastProduct = Product::orderBy('id', 'desc')->first();
        $lastId = $lastProduct ? $lastProduct->id : 0;
        $newId = $lastId + 1;
        return 'PROD' . str_pad($newId, 4, '0', STR_PAD_LEFT);
    }

    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->input('search'), function($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhere('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('category', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Modules/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Modules/Products/Create', [
            'nextCode' => $this->generateCode()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:products',
            'name' => 'required',
            'description' => 'nullable|string',
            'size' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'min_stock' => 'required|numeric|min:0',
            'current_stock' => 'required|numeric|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('message', 'Producto creado exitosamente');
    }

    public function show(Product $product)
    {
        return Inertia::render('Modules/Products/Show', [
            'product' => $product
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('Modules/Products/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'code' => 'required|unique:products,code,' . $product->id,
            'name' => 'required',
            'description' => 'nullable|string',
            'size' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'min_stock' => 'required|numeric|min:0',
            'current_stock' => 'required|numeric|min:0',
            'status' => 'required|in:active,inactive'
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('message', 'Producto actualizado exitosamente');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('message', 'Producto eliminado exitosamente');
    }
}