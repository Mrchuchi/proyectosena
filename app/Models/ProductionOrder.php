<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductionOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'product_id',
        'recipe_id',
        'quantity',
        'completed_quantity',
        'planned_date',
        'start_date',
        'end_date',
        'status',
        'notes',
        'created_by'
    ];

    protected $casts = [
        'planned_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function canStart()
    {
        // Verificar si hay suficiente stock de materias primas
        foreach ($this->recipe->rawMaterials as $material) {
            $requiredQuantity = $material->pivot->quantity * $this->quantity;
            if ($material->current_stock < $requiredQuantity) {
                return false;
            }
        }
        return true;
    }

    public function start()
    {
        if ($this->status !== 'pending' || !$this->canStart()) {
            return false;
        }

        // Iniciar transacción para asegurar la integridad de los datos
        DB::beginTransaction();

        try {
            // Actualizar el estado de la orden
            $this->status = 'in_progress';
            $this->start_date = now();
            $this->save();

            // Descontar materias primas
            foreach ($this->recipe->rawMaterials as $material) {
                $requiredQuantity = $material->pivot->quantity * $this->quantity;
                $material->updateStock(
                    $requiredQuantity,
                    'salida',
                    "Orden de producción {$this->code}",
                    $this->created_by
                );
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public function complete()
    {
        if ($this->status !== 'in_progress') {
            return false;
        }

        DB::beginTransaction();

        try {
            // Actualizar el estado de la orden
            $this->status = 'completed';
            $this->end_date = now();
            $this->completed_quantity = $this->quantity;
            $this->save();

            // Aumentar el stock del producto terminado
            $this->product->current_stock += $this->quantity;
            $this->product->save();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
