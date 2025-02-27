<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItems;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OrderResouceController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     */

    public static function middleware()
    {
        return [
            new Middleware('auth:customers', only: ['store']),
            new Middleware('auth:admins', only: ['update', 'destroy']),
            // new Middleware('auth:admins', except: ['update'])
        ];
    }

    public function index()
    {
        $orders = Order::with('customer')->latest()->take(10)->get();

        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $customer = $request->user();

        $cart = Cart::find($request->cartId);

        $cartItems = CartItem::with('product')->where('cart_id', $request->cartId)->get();

        $lastRow = Order::orderBy('id', 'desc')->first();

        $count = 1450;

        if ($lastRow) {
            if ($lastRow->order_number) {
                $count = 1 + $lastRow->order_number;
            }
        }


        // return [
        //     'lastrow' => $lastRow,
        //     'count' => $count,
        // ];



        $order = Order::create([
            'customer_id' => $customer->id,
            // 'total_price' => $this->cartItems->sum(function ($item) {
            //     return $item->price * $item->quantity;
            // }),
            'billing_ship_to_name' => $customer->first_name . " " . $customer->last_name,
            'billing_ship_to_company' => $customer->company_name,
            'billing_address_line_1' => $customer->address_line_1,
            'billing_address_line_2' => $customer->address_line_2,
            'billing_city' => $customer->city,
            'billing_state' => $customer->state,
            'billing_postal_code' => $customer->postal_code,
            'billing_country' => $customer->country,
            'shipping_ship_to_name' => $customer->defaultAddress()->ship_to_name,
            'shipping_ship_to_company' => $customer->defaultAddress()->ship_to_company,
            'shipping_address_line_1' => $customer->defaultAddress()->address_line_1,
            'shipping_address_line_2' => $customer->defaultAddress()->address_line_2,
            'shipping_city' => $customer->defaultAddress()->city,
            'shipping_state' => $customer->defaultAddress()->state,
            'shipping_postal_code' => $customer->defaultAddress()->postal_code,
            'shipping_country' => $customer->defaultAddress()->country,
            'cost_center' => $request->cost_center,
            'order_number' => $count,
            'order_status' => "pending",
            'comment' => $request->comment,
        ]);


        foreach ($cartItems as $cartItem) {
            $order->orderItems()->create([
                'product_id' => $cartItem->product_id,
                'name' => $cartItem->product->name,
                'manufacturer' => $cartItem->product->manufacturer,
                'color' => $cartItem->product->colors,
                'total_price' => $cartItem->total_price,
                'fit' => $cartItem->fit,
                'productLength' => $cartItem->productLength,
                'embroidery_lines_cost' => $cartItem->embroidery_lines_cost,
                'embroidery_logo_cost' => $cartItem->embroidery_logo_cost,
                'inseam' => $cartItem->inseam,
                'wayne_logo_price' => $cartItem->wayne_logo_price,
                'size' => $cartItem->size,
                'line1' => $cartItem->line1,
                'line2' => $cartItem->line2,
                'line3' => $cartItem->line3,
                'wayne_logo' => $cartItem->wayne_logo,
                'co_brand_logo' => $cartItem->co_brand_logo,
                'official_logo' => $cartItem->official_logo,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
                'total_price_for_one' => $cartItem->total_price_for_one,
            ]);
        };

        $cart->items()->delete();
        $cart->delete();

        $orderItems = OrderItems::with('product')->where('order_id', $order->id)->get();

        $total = $order->orderTotal();


        return [
            'order' => $order,
            'orderItems' => $orderItems,
            'customer' => $customer,
            "total" => $total
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $orderItems = OrderItems::with('product')->where('order_id', $order->id)->get();
        // $orderItems = $order->orderItems()->product->get();
        $total = $order->orderTotal();
        $customer = $order->customer()->get();
        return ['orderItems' => $orderItems, 'order' => $order, "customer" => $customer, "total" => $total];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateOrderItem(Request $request, string $id)
    {

        $orderItem = OrderItems::find($id);
        $orderItem->update($request->all());

        return $orderItem;
    }

    public function orderFilter(Request $request)
    {

        $validated = $request->validate([
            'fromDate' => 'required|date',  // Ensure 'from' is a valid date
            'toDate' => 'required|date|after_or_equal:from',  // Ensure 'to' is a valid date and greater than or equal to 'from'
        ]);

        $from = Carbon::parse($validated['fromDate'])->startOfDay();
        $to = Carbon::parse($validated['toDate'])->endOfDay();


        $orders = Order::with('customer')->whereBetween('created_at', [$from, $to])->latest()->take(10)->get();

        return $orders;
    }
}
