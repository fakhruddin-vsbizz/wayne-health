<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminResourceController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactEmailController;
use App\Http\Controllers\CustomerAuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerPersonalController;
use App\Http\Controllers\CustomerResourceController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\OrderResouceController;
use App\Http\Controllers\ProductResourceController;
use App\Http\Controllers\ShippingAddressController;
use App\Http\Controllers\ShippingAddressResourceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user/customer', function (Request $request) {
    return $request->user();
})->middleware('auth:customers');

Route::get('/user/admin', function (Request $request) {
    return $request->user();
})->middleware('auth:admins');

Route::get('/', function () {
    return 'API';
});

Route::prefix("admin")->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::put('/update-admin', [AdminAuthController::class, 'updateAdmin'])->middleware('auth:admins');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth:admins');

    Route::apiResource('profile', AdminResourceController::class);

    Route::apiResource('customer', CustomerController::class);
    Route::post('customer/customer-filter', [CustomerController::class, 'customerFilter'])->middleware('auth:admins');

    Route::apiResource('products', ProductResourceController::class);

    Route::post('/products/custom-update/{product}', [ProductResourceController::class, 'updateProduct']);
    Route::put('/products/deactivateToggle/{product}', [ProductResourceController::class, 'productDiscontinued'])->middleware('auth:admins');
    Route::get('/account/orderHistory/{customer}', [CustomerPersonalController::class, 'orderHistoryAdmin'])->middleware('auth:admins');


    Route::get('/customer/shipping-address/{customer}', [ShippingAddressController::class, 'index']);
    Route::delete('/customer/shipping-address/{shippingAddress}', [ShippingAddressController::class, 'destroy'])->middleware('auth:admins');
    Route::post('/customer/shipping-address/{customer}/store', [ShippingAddressController::class, 'store']);
    Route::post('/customer/shipping-address/{customer}/store/with-default', [ShippingAddressController::class, 'storeWithDefault']);
    Route::get('/customer/shipping-address/{shippingAddress}/show', [ShippingAddressController::class, 'show']);
    Route::put('/customer/shipping-address/{customer}/{shippingAddress}', [ShippingAddressController::class, 'update']);
});



Route::prefix("customer")->group(function () {
    Route::get('/account', [CustomerPersonalController::class, 'show'])->middleware('auth:customers');
    Route::put('/account', [CustomerPersonalController::class, 'update'])->middleware('auth:customers');
    Route::get('/account/shippingAddress', [CustomerPersonalController::class, 'allAddress'])->middleware('auth:customers');
    Route::post('/account/shippingAddress', [CustomerPersonalController::class, 'createAddress'])->middleware('auth:customers');
    Route::put('/account/shippingAddress', [CustomerPersonalController::class, 'updateAddress'])->middleware('auth:customers');
    Route::get('/account/orderHistory', [CustomerPersonalController::class, 'orderHistory'])->middleware('auth:customers');
    Route::post('/register', [CustomerAuthController::class, 'register']);
    Route::post('/registerMultipleCustomers', [CustomerAuthController::class, 'registerMultipleCustomers']);
    Route::post('/login', [CustomerAuthController::class, 'login']);
    Route::post('/logout', [CustomerAuthController::class, 'logout'])->middleware('auth:customers');
    Route::get('/products', [CustomerAuthController::class, 'logout'])->middleware('auth:customers');
    Route::apiResource('order', OrderResouceController::class);
    Route::post('/order-filter', [OrderResouceController::class, 'orderFilter'])->middleware('auth:admins');
    Route::apiResource('profile', CustomerResourceController::class);
    Route::apiResource('cart', CartController::class)->middleware('auth:customers');
    Route::put('cart/update-quantity/{cartItem}', [CartController::class, 'updateQuantity']);
    Route::put('cart/update-quantity-admin/{cartItem}', [CartController::class, 'updateQuantityAdmin']);
    Route::post('/send-order-confirmation-email', [EmailController::class, 'sendOrderConfirmationEmail'])->middleware('auth:customers');
    Route::post('/send-contact-email', [ContactEmailController::class, 'sendContactEmail'])->middleware('auth:customers');
    Route::put('order/update-orderItem/{id}', [OrderResouceController::class, 'updateOrderItem'])->middleware('auth:admins');
    Route::apiResource('shipping-address', ShippingAddressResourceController::class)->middleware('auth:customers');
    Route::get('/shipping-address/set-selected-default/{shippingAddress}', [ShippingAddressResourceController::class, 'setDefault'])->middleware('auth:customers');
});
