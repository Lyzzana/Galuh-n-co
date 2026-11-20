<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Mengambil daftar produk aktif beserta kategori unik.
     *
     * @return array{products: Collection<int, array<string, mixed>>, categories: Collection<int, mixed>}
     */
    protected function getCatalogData(): array
    {
        $products = Product::query()
            ->active()
            ->get()
            ->map(function ($product) {
                // Parse contents secara aman (array, JSON string, atau dipisah baris)
                $contents = $product->contents;
                if (is_string($contents)) {
                    $decoded = json_decode($contents, true);
                    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                        $contents = $decoded;
                    } else {
                        $contents = preg_split("/\r\n|\n|\r/", $contents) ?: [];
                        $contents = array_values(array_filter(array_map('trim', $contents)));
                    }
                } elseif (! is_array($contents)) {
                    $contents = [];
                }

                // Resolusi URL foto produk (URL eksternal atau storage symlink lokal)
                $imageUrl = null;
                if (! empty($product->image)) {
                    if (str_starts_with($product->image, 'http://') || str_starts_with($product->image, 'https://')) {
                        $imageUrl = $product->image;
                    } else {
                        $imageUrl = asset('storage/'.ltrim($product->image, '/'));
                    }
                }

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'category' => $product->category,
                    'short_description' => $product->short_description,
                    'contents' => $contents,
                    'price_from' => (int) $product->price_from,
                    'image' => $product->image,
                    'image_url' => $imageUrl,
                    'sort_order' => (int) $product->sort_order,
                    'is_active' => (bool) $product->is_active,
                ];
            });

        $categories = $products->pluck('category')->unique()->values();

        return [
            'products' => $products,
            'categories' => $categories,
        ];
    }

    public function index(): Response
    {
        return Inertia::render('welcome', $this->getCatalogData());
    }

    public function catalog(): Response
    {
        return Inertia::render('katalog', $this->getCatalogData());
    }
}
