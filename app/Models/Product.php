<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'item_code',
        'manufacturer',
        'starts_at',
        'multiline_description',
        'product_image',
        'product_stitching_image',
        'embroidery_lines',
        'embroidery_lines_price',
        'embroidery_lines_position',
        'wayne_logo',
        'wayne_logo_price',
        'wayne_logo_position',
        'co_brand_logo_price',
        'co_brand_logo_position',
        'official_logo_price',
        'official_logo_position',
        'colors',
        'link',
        'product_sizes',
        'is_discontinued'
    ];

    protected $casts = [
        // 'colors' => 'array', // Store the colors as an array
        'product_sizes' => 'array', // Store the product_sizes as an array
        'official_logo_price' => 'array', // Store the product_sizes as an array
        'co_brand_logo_price' => 'array', // Store the product_sizes as an array
    ];
}
