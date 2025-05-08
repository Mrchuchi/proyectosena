<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Recipe extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'product_id',
        'status'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function rawMaterials(): BelongsToMany
    {
        return $this->belongsToMany(RawMaterial::class, 'recipe_materials')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function getTotalCostAttribute(): float
    {
        return $this->rawMaterials->sum(function ($material) {
            return $material->unit_price * $material->pivot->quantity;
        });
    }
}