<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;

class CustomerPersonalController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

        $customer = $request->user();

        return $customer;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string'],
            'fax' => ['nullable', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'address_line_1' => ['required', 'string'],
            'address_line_2' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'state' => ['nullable', 'string'],
            'postal_code' => ['nullable', 'string', 'max:10'],
            'country' => ['nullable', 'string'],
        ]);

        if ($request->password != null) {
            $validated['password'] = bcrypt($request->password);
        }

        $customer = $request->user();
        $customer->update($validated);

        return $customer;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function allAddress(Request $request)
    {

        $address = $request->user()->address;

        return $address;
    }

    public function createAddress(Request $request)
    {

        $customer = $request->user();

        $validate = $request->validate([
            'ship_to_name' => 'required|string|max:255',
            'ship_to_company' => 'nullable|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        // $customerId = $request->user()->id;

        // $count = ShippingAddress::where('customer_id', $customer->id)->count();

        // if ($count == 0) {
        //     $validate['is_default'] = "on";
        // }

        $address = $customer->address()->create($validate);

        return $address;
    }

    public function updateAddress(Request $request)
    {

        $customer = $request->user();

        $validated = $request->validate([
            'ship_to_name' => 'required|string|max:255',
            'ship_to_company' => 'nullable|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        $currentAddress = $customer->address()->find($request->id);

        // return [
        //     'currentAddress' => $currentAddress->is_default
        // ];

        if ($currentAddress->is_default != null) {
            return ['message' => 'At least one address must be default'];
        } else {

            if ($request->is_default != null) {
                $customer->address()->where('is_default', "on")->update(['is_default' => null]);
                $validated['is_default'] = "on";
            }

            // $customerId = $request->user()->id;

            // $count = ShippingAddress::where('customer_id', $customer->id)->count();

            // if ($count == 0) {
            //     $validate['is_default'] = "on";
            // }

            $address = ShippingAddress::find($request->id);

            $address->update($validated);

            // $address = $customer->address()->create($validate);

            return $address;
        }
    }

    public function orderHistory(Request $request)
    {
        $customer = $request->user();

        $orders = Order::with('orderItems')->where('customer_id', "=", $customer->id)->get();

        return [
            'orders' => $orders,
            'customer' => $customer,
        ];
    }

    public function orderHistoryAdmin(Request $request, Customer $customer)
    {

        $orders = Order::with('orderItems')->where('customer_id', "=", $customer->id)->get();

        return [
            'orders' => $orders,
            'customer' => $customer,
        ];
    }
}
