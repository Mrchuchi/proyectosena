<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['role'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function hasPermission($permission)
    {
        return $this->role && $this->role->hasPermission($permission);
    }

    public function hasAnyPermission($permissions)
    {
        if (!$this->role) {
            return false;
        }

        if (is_array($permissions)) {
            foreach ($permissions as $permission) {
                if ($this->role->hasPermission($permission)) {
                    return true;
                }
            }
            return false;
        }

        return $this->role->hasPermission($permissions);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'active' => 'boolean',
    ];
}
