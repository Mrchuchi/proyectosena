<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Role extends Model
{
    protected $fillable = ['name', 'description'];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['permissions'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission')
                    ->withTimestamps();
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function hasPermission($permission)
    {
        if ($this->relationLoaded('permissions')) {
            return $this->permissions->contains('name', $permission);
        }
        return $this->permissions()->where('name', $permission)->exists();
    }

    public function syncPermissions($permissions)
    {
        if (empty($permissions)) {
            $this->permissions()->detach();
        } else {
            $this->permissions()->sync($permissions);
        }
        
        $this->load('permissions');
        return $this;
    }
}
