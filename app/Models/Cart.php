<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['customer_id'];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class);  // Assuming you have a Product model
    }

    public function totalPrice()
    {
        return $this->items->sum(function ($item) {
            return $item->total_price;
        });
    }

    public function placeOrder()
    {

        $this->cartItems()->delete();
        $this->delete();

        // return $order;
    }
}
