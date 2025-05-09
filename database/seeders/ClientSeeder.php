<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'code' => 'CLI-000001',
                'name' => 'Juan Pérez',
                'document_type' => 'CC',
                'document_number' => '1234567890',
                'email' => 'juan@example.com',
                'phone' => '3001234567',
                'address' => 'Calle 123 #45-67',
                'city' => 'Bogotá',
                'status' => 'active'
            ],
            [
                'code' => 'CLI-000002',
                'name' => 'María López',
                'document_type' => 'CC',
                'document_number' => '0987654321',
                'email' => 'maria@example.com',
                'phone' => '3109876543',
                'address' => 'Carrera 89 #12-34',
                'city' => 'Medellín',
                'status' => 'active'
            ]
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
