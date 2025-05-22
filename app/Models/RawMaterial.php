<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RawMaterial extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'unit_measure',
        'min_stock',
        'current_stock',
        'unit_price',
        'main_supplier',
        'last_purchase',
        'status'
    ];

    protected $casts = [
        'min_stock' => 'decimal:2',
        'current_stock' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'last_purchase' => 'date',
    ];

    public function movements()
    {
        return $this->hasMany(InventoryMovement::class);
    }    public function updateStock($quantity, $type, $reason, $userId, $clientId = null)
    {
        DB::beginTransaction();
        
        try {
            $previousStock = $this->current_stock;
            $newStock = $previousStock;

            if ($type === 'entrada') {
                $newStock += $quantity;
            } elseif ($type === 'salida') {
                if ($quantity > $previousStock) {
                    throw new \Exception('Stock insuficiente');
                }
                $newStock -= $quantity;
            } else {
                $newStock = $quantity; // Para ajustes directos
            }

            $this->movements()->create([
                'type' => $type,
                'quantity' => $quantity,
                'previous_stock' => $previousStock,
                'new_stock' => $newStock,
                'reason' => $reason,
                'user_id' => $userId,
                'client_id' => $clientId
            ]);

            $this->current_stock = $newStock;
            $this->save();
            
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->min_stock;
    }

    public function getTotalValueAttribute(): float
    {
        return $this->current_stock * $this->unit_price;
    }
}