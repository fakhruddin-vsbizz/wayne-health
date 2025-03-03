<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::all();

        return $product;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'item_code' => 'nullable|unique:products',
            'manufacturer' => 'required|string|max:255',
            'starts_at' => 'nullable|string|max:255',
            'multiline_description' => 'required|string',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_stitching_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'embroidery_lines' => 'nullable|string',
            'embroidery_lines_position' => 'nullable|string',
            'embroidery_lines_price' => ['required', 'numeric', 'regex:/^\d{1,2}(\.\d{1,2})?$/', 'min:0'],
            'wayne_logo' => 'nullable|string',
            'wayne_logo_price' => ['required', 'numeric', 'regex:/^\d{1,2}(\.\d{1,2})?$/', 'min:0'],
            'wayne_logo_position' => 'nullable|string',
            'co_brand_logo_price' => 'nullable|array',
            'co_brand_logo_position' => 'nullable|string',
            'official_logo_price' => 'nullable|array',
            'official_logo_position' => 'nullable|string',
            'colors' => 'nullable|string',
            'link' => 'nullable|string',
            'product_sizes' => 'nullable|array',
        ]);


        $input = $request->all();

        $product_size_array = json_decode($request->product_sizes[0], true);

        $input['product_sizes'] = $product_size_array;

        if ($request->co_brand_logo_price != null) {
            $values = array_map('intval', explode(',', rtrim($request->co_brand_logo_price[0], ',')));
            $new_co_brand_logo_price = array_map(function ($value) {
                return number_format((float)$value, 2, '.', ''); // Or use floatval($value)
            }, $values);
            $input["co_brand_logo_price"] = $new_co_brand_logo_price;
        }

        if ($request->official_logo_price != null) {
            $values2 = array_map('intval', explode(',', rtrim($request->official_logo_price[0], ',')));
            $new_official_logo_price = array_map(function ($value2) {
                return number_format((float)$value2, 2, '.', ''); // Or use floatval($value)
            }, $values2);
            $input["official_logo_price"] = $new_official_logo_price;
        }



        if ($product_image = $request->file('product_image')) {
            $destinationPath = 'images/';
            $productImage = "product_image" . date('YmdHis') . "." . $product_image->getClientOriginalExtension();
            $product_image->move($destinationPath, $productImage);
            $input['product_image'] = "$productImage";
        }

        if ($product_stitching_image = $request->file('product_stitching_image')) {
            $destinationPath = 'images/';
            $productStitchingImage = "product_stitching_image" . date('YmdHis') . "." . $product_stitching_image->getClientOriginalExtension();
            $product_stitching_image->move($destinationPath, $productStitchingImage);
            $input['product_stitching_image'] = "$productStitchingImage";
        }

        // dd($request);

        $product = Product::create($input);

        return $product;
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'item_code' => 'required|string',
            'manufacturer' => 'required|string|max:255',
            'starts_at' => 'nullable|string|max:255',
            'multiline_description' => 'required|string',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_stitching_image' => 'nullable',
            'embroidery_lines' => 'nullable|string',
            'embroidery_lines_position' => 'nullable|string',
            'wayne_logo' => 'nullable|string',
            'wayne_logo_price' => 'nullable|string',
            'wayne_logo_position' => 'nullable|string',
            'co_brand_logo_price' => 'nullable|array',
            'co_brand_logo_position' => 'nullable|string',
            'official_logo_price' => 'nullable|array',
            'official_logo_position' => 'nullable|string',
            'colors' => 'nullable|string',
            'link' => 'nullable|string',
            'product_sizes' => 'nullable|array',
        ]);

        return [
            'product' => $product
        ];

        // $input = $request->all();

        // $product_size_array = json_decode($request->product_sizes[0], true);

        // $input['product_sizes'] = $product_size_array;

        // if ($request->co_brand_logo_price != null) {
        //     $values = array_map('intval', explode(',', rtrim($request->co_brand_logo_price[0], ',')));
        //     $new_co_brand_logo_price = array_map(function ($value) {
        //         return number_format((float)$value, 2, '.', ''); // Or use floatval($value)
        //     }, $values);
        //     $input["co_brand_logo_price"] = $new_co_brand_logo_price;
        // }

        // if ($request->official_logo_price != null) {
        //     $values2 = array_map('intval', explode(',', rtrim($request->official_logo_price[0], ',')));
        //     $new_official_logo_price = array_map(function ($value2) {
        //         return number_format((float)$value2, 2, '.', ''); // Or use floatval($value)
        //     }, $values2);
        //     $input["official_logo_price"] = $new_official_logo_price;
        // }



        // if ($product_image = $request->file('product_image')) {
        //     $destinationPath = 'images/';
        //     $productImage = "product_image" . date('YmdHis') . "." . $product_image->getClientOriginalExtension();
        //     $product_image->move($destinationPath, $productImage);
        //     $input['product_image'] = "$productImage";
        // }

        // if ($product_stitching_image = $request->file('product_stitching_image')) {
        //     $destinationPath = 'images/';
        //     $productStitchingImage = "product_stitching_image" . date('YmdHis') . "." . $product_stitching_image->getClientOriginalExtension();
        //     $product_stitching_image->move($destinationPath, $productStitchingImage);
        //     $input['product_stitching_image'] = "$productStitchingImage";
        // }


        // $product->update($input);

        // return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->update(['is_discontinued' => true]);

        return [
            'success' => 'Product Discontinued!'
        ];
    }

    public function productDiscontinued(Request $request, Product $product)
    {


        $product->update(['is_discontinued' => $request->is_discontinued]);

        return [
            'success' => 'Product updated successfully!'
        ];
    }


    public function updateProduct(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'item_code' => 'required',
            'manufacturer' => 'required|string|max:255',
            'starts_at' => 'nullable|string|max:255',
            'multiline_description' => 'required|string',
            'product_image' => 'nullable',
            'product_stitching_image' => 'nullable',
            'embroidery_lines' => 'nullable|string',
            'embroidery_lines_position' => 'nullable|string',
            'embroidery_lines_price' => ['required', 'numeric', 'regex:/^\d{1,2}(\.\d{1,2})?$/', 'min:0'],
            'wayne_logo' => 'nullable|string',
            'wayne_logo_price' => ['required', 'numeric', 'regex:/^\d{1,2}(\.\d{1,2})?$/', 'min:0'],
            'wayne_logo_position' => 'nullable|string',
            'co_brand_logo_price' => 'nullable|array',
            'co_brand_logo_position' => 'nullable|string',
            'official_logo_price' => 'nullable|array',
            'official_logo_position' => 'nullable|string',
            'colors' => 'nullable|string',
            'link' => 'nullable|string',
            'product_sizes' => 'nullable|array',
        ]);

        // return [
        //     'product' => $product
        // ];

        $input = $request->all();

        $input = array_map(function ($value) {
            return $value === 'null' ? null : $value;
        }, $input);

        $product_size_array = json_decode($request->product_sizes[0], true);

        $input['product_sizes'] = $product_size_array;

        if ($request->co_brand_logo_price != null) {
            $values = array_map('intval', explode(',', rtrim($request->co_brand_logo_price[0], ',')));
            $new_co_brand_logo_price = array_map(function ($value) {
                return number_format((float)$value, 2, '.', ''); // Or use floatval($value)
            }, $values);
            $input["co_brand_logo_price"] = $new_co_brand_logo_price;
        }

        if ($request->official_logo_price != null) {
            $values2 = array_map('intval', explode(',', rtrim($request->official_logo_price[0], ',')));
            $new_official_logo_price = array_map(function ($value2) {
                return number_format((float)$value2, 2, '.', ''); // Or use floatval($value)
            }, $values2);
            $input["official_logo_price"] = $new_official_logo_price;
        }



        if ($product_image = $request->file('product_image')) {
            $destinationPath = 'images/';
            $productImage = "product_image" . date('YmdHis') . "." . $product_image->getClientOriginalExtension();
            $product_image->move($destinationPath, $productImage);
            $input['product_image'] = "$productImage";
        } else if ($input['product_image'] == null) {
            $input['product_image'] = null;
        } else {
            $input['product_image'] = $request->product_image;
        }

        if ($product_stitching_image = $request->file('product_stitching_image')) {
            $destinationPath = 'images/';
            $productStitchingImage = "product_stitching_image" . date('YmdHis') . "." . $product_stitching_image->getClientOriginalExtension();
            $product_stitching_image->move($destinationPath, $productStitchingImage);
            $input['product_stitching_image'] = "$productStitchingImage";
        } else if ($input['product_stitching_image'] == null || $input['product_stitching_image'] == 'null') {
            $input['product_stitching_image'] = null;
        } else {
            $input['product_stitching_image'] = $request->product_stitching_image;
        }



        $product->update($input);

        return $product;
    }
}
