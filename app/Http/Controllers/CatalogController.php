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
     * @return array{
     *     products: Collection<int, array{
     *         id: int,
     *         name: string,
     *         slug: string,
     *         category: string,
     *         short_description: string,
     *         contents: array<int, string>,
     *         price_from: int,
     *         image: string|null,
     *         image_url: string|null,
     *         sort_order: int,
     *         is_active: bool
     *     }>,
     *     categories: Collection<int, string>
     * }
     */
    protected function getCatalogData(): array
    {
        $products = Product::query()
            ->active()
            ->get()
            ->map(function ($product) {
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
                    'contents' => $product->contents,
                    'price_from' => (int) $product->price_from,
                    'image' => $product->image,
                    'image_url' => $imageUrl,
                    'sort_order' => (int) $product->sort_order,
                    'is_active' => (bool) $product->is_active,
                ];
            });

        /** @var Collection<int, string> $categories */
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
