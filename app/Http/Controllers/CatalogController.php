<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->active() // Hanya is_active = true, urut berdasarkan sort_order
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'category' => $product->category,
                'short_description' => $product->short_description,
                'contents' => $product->contents ?? [],
                'price_from' => $product->price_from,
                'image_url' => $product->image
                    ? asset('storage/'.$product->image)
                    : null,
                'sort_order' => $product->sort_order,
            ]);

        $categories = $products->pluck('category')->unique()->values();

        return Inertia::render('welcome', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
