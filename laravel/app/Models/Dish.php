<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // 一個菜品可以有多筆訂單
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
