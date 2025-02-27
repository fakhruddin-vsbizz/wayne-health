<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'name',
        'color',
        'quantity',
        'price',
        'total_price',
        'fit',
        'productLength',
        'embroidery_lines_cost',
        'embroidery_logo_cost',
        'total_price_for_one',
        'inseam',
        'wayne_logo_price',
        'size',
        'line1',
        'line2',
        'line3',
        'manufacturer',
        'wayne_logo',
        'co_brand_logo',
        'official_logo',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
