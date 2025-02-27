<?php

namespace App\Http\Controllers;

use App\Models\ShippingAddress;
use Illuminate\Http\Request;

class ShippingAddressResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ship_to_name' => 'required|string|max:255',
            'ship_to_company' => 'nullable|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        $customerId = $request->user()->id;

        $count = ShippingAddress::where('customer_id', $customerId)->count();

        if ($count == 0) {
            $request['is_default'] = "on";
        }

        $address = $request->user()->address()->create($request->all());

        return $address;
    }

    /**
     * Display the specified resource.
     */
    public function show(ShippingAddress $shippingAddress)
    {
        return $shippingAddress;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShippingAddress $shippingAddress)
    {
        $request->validate([
            'ship_to_name' => 'required|string|max:255',
            'ship_to_company' => 'nullable|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'is_default' => 'nullable|string'
        ]);


        if ($request->is_default != null) {
            $request->user()->address()->where('is_default', "on")->update(['is_default' => null]);
        }

        $shippingAddress->update($request->all());

        return $shippingAddress;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShippingAddress $shippingAddress)
    {
        $shippingAddress->delete();

        return [
            'success' => 'Address deleted successfully'
        ];
    }


    public function setDefault(Request $request, ShippingAddress $shippingAddress)
    {

        $customerId = $request->user()->id;

        ShippingAddress::where('customer_id', '=', $customerId)->update(['is_default' => null]);

        $shippingAddress->update([
            'is_default' => "on"
        ]);

        return $shippingAddress;
    }
}
