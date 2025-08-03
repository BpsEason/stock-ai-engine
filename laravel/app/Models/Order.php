<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['dish_id', 'quantity'];

    // 一筆訂單屬於一個菜品
    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
