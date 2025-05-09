<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('document_number', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Modules/Clients/Index', [
            'clients' => $clients->map(function ($client) {
                return [
                    'id' => $client->id,
                    'code' => $client->code,
                    'name' => $client->name,
                    'document_type' => $client->document_type,
                    'document_number' => $client->document_number,
                    'email' => $client->email,
                    'phone' => $client->phone,
                    'city' => $client->city,
                    'status' => $client->status
                ];
            }),
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $lastCode = Client::orderBy('code', 'desc')->first()?->code ?? 'CLI-000000';
        $nextNumber = (int)substr($lastCode, 4) + 1;
        $nextCode = 'CLI-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);

        return Inertia::render('Modules/Clients/Create', [
            'nextCode' => $nextCode
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:clients,code',
            'name' => 'required|string|max:255',
            'document_type' => 'nullable|string|max:50',
            'document_number' => 'nullable|string|max:50|unique:clients,document_number',
            'email' => 'nullable|email|max:255|unique:clients,email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive'
        ]);

        $client = Client::create($validated);

        return redirect()->route('clients.show', $client->id)
            ->with('success', 'Cliente creado exitosamente.');
    }

    public function show(Client $client)
    {
        return Inertia::render('Modules/Clients/Show', [
            'client' => [
                'id' => $client->id,
                'code' => $client->code,
                'name' => $client->name,
                'document_type' => $client->document_type,
                'document_number' => $client->document_number,
                'email' => $client->email,
                'phone' => $client->phone,
                'address' => $client->address,
                'city' => $client->city,
                'status' => $client->status,
                'created_at' => $client->created_at
            ]
        ]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('Modules/Clients/Edit', [
            'client' => $client
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'document_type' => 'nullable|string|max:50',
            'document_number' => 'nullable|string|max:50|unique:clients,document_number,' . $client->id,
            'email' => 'nullable|email|max:255|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive'
        ]);

        $client->update($validated);

        return redirect()->route('clients.show', $client->id)
            ->with('success', 'Cliente actualizado exitosamente.');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index')
            ->with('success', 'Cliente eliminado exitosamente.');
    }
}
