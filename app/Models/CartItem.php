<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price',
        'total_price',
        'total_price_for_one',
        'fit',
        'inseam',
        'productLength',
        'size',
        'line1',
        'line2',
        'line3',
        'embroidery_lines_cost',
        'embroidery_logo_cost',
        'wayne_logo_price',
        'wayne_logo',
        'co_brand_logo',
        'official_logo'
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);  // Assuming you have a Product model
    }

    public static function totalQuantity()
    {
        return self::sum('quantity');
    }
}
