<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->min_stock;
    }

    public function getTotalValueAttribute(): float
    {
        return $this->current_stock * $this->unit_price;
    }
}