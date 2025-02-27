<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        "customer_id",
        "order_status",
        'billing_ship_to_name',
        'billing_ship_to_company',
        'billing_address_line_1',
        'billing_address_line_2',
        'billing_city',
        'billing_is_default',
        'billing_state',
        'billing_postal_code',
        'billing_country',
        'shipping_ship_to_name',
        'shipping_ship_to_company',
        'shipping_address_line_1',
        'shipping_address_line_2',
        'shipping_city',
        'shipping_is_default',
        'shipping_state',
        'shipping_postal_code',
        'shipping_country',
        'cost_center',
        'shipping_method',
        'employee_allowance',
        'order_number',
        'comment',
        'notes',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItems::class);
    }

    public function orderTotal()
    {
        return $this->orderItems->sum(function ($item) {
            return $item->total_price;
        });
    }
}
