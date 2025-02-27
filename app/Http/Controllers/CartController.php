<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CartController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     */

    public static function middleware()
    {
        return [
            new Middleware('auth:customers', except: ['updateQuantityAdmin']),
            new Middleware('auth:admins', only: ['updateQuantityAdmin']),
            // new Middleware('auth:admins', except: ['update'])
        ];
    }


    public function index(Request $request)
    {
        $customerId = $request->user()->id;

        $cart = Cart::where('customer_id', $customerId)->first();

        if ($cart !== null) {
            # code...
            $total = $cart->totalPrice();

            $cartItems = CartItem::with('product')->where('cart_id', $cart->id)->get();

            $totalQuantity = CartItem::totalQuantity();

            return [
                'cartItems' => $cartItems,
                'cartId' => $cart->id,
                'total' => $total,
                'totalQuantity' => $totalQuantity,
            ];
        }

        return [
            'cartItems' => [],
            'cartId' => 0,
            'total' => 0,
            'totalQuantity' => 0,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $customerId = $request->user()->id;

        $cart = Cart::firstOrCreate(['customer_id' => $customerId]);

        $cartEntries = [];
        for ($x = 0; $x < count($request->cart); $x++) {
            $cartEntries[] = [
                ...$request->cart[$x],
                'cart_id' => $cart->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // return $cartEntries;

        if (!empty($cartEntries)) {
            CartItem::insert($cartEntries);
            // return redirect()->route('customer.product', $productId);
            return [
                'success' => 'Items Added to cart.'
            ];
            // return response()->json(['message' => 'Cart entries created successfully.'], 200);
        } else {
            return [
                'error' => 'No items to add to cart.'
            ];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cartItem = CartItem::with('product')->where('id', '=', $id)->get();
        return $cartItem;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cartItem = CartItem::find($id);
        $cartItem->update($request->all());

        return $cartItem;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cartItem = CartItem::find($id)->delete();

        return [
            'success' => 'Cart Item removed successfully.'
        ];
    }

    public function updateQuantity(Request $request, string $id)
    {
        $cartItem = CartItem::find($id);
        $total_price = $cartItem->total_price_for_one * $request->quantity;
        $cartItem->update([
            'quantity' => $request->quantity,
            'total_price' => $total_price
        ]);

        return $cartItem;
    }

    public function updateQuantityAdmin(Request $request, string $id)
    {
        $orderItem = OrderItems::find($id);
        $total_price = $orderItem->total_price_for_one * $request->quantity;
        $orderItem->update([
            'quantity' => $request->quantity,
            'total_price' => $total_price
        ]);

        return $orderItem;
    }
}
