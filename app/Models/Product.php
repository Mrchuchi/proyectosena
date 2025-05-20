<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'size',
        'category',
        'price',
        'min_stock',
        'current_stock',
        'status'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'min_stock' => 'decimal:2',
        'current_stock' => 'decimal:2',
    ];

    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    public function movements()
    {
        return $this->hasMany(ProductMovement::class);
    }

    public function updateStock($quantity, $type, $reason, $userId, $clientId = null)
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
        return $this->current_stock * $this->price;
    }
}