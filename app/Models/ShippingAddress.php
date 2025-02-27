<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    protected $fillable = [
        'customer_id',
        'ship_to_name',
        'ship_to_company',
        'address_line_1',
        'address_line_2',
        'city',
        'is_default',
        'state',
        'postal_code',
        'country',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
