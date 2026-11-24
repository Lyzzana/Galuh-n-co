<?php

namespace App\Http\Controllers;

use App\Models\LandingContent;
use App\Models\Partner;
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
     *         event_category: string,
     *         season_tag: string|null,
     *         is_best_seller: bool,
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
                    'event_category' => $product->event_category,
                    'season_tag' => $product->season_tag,
                    'is_best_seller' => (bool) $product->is_best_seller,
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
        $data = $this->getCatalogData();

        /** @var array<int, array{id: int, name: string, sector: string|null, logo_url: string|null}> $partners */
        $partners = Partner::query()
            ->active()
            ->get()
            ->map(fn (Partner $partner) => [
                'id' => $partner->id,
                'name' => $partner->name,
                'sector' => $partner->sector,
                'logo_url' => $partner->logo
                    ? asset('storage/'.ltrim($partner->logo, '/'))
                    : null,
            ])
            ->values()
            ->all();

        return Inertia::render('welcome', array_merge($data, [
            'partners' => $partners,
            'contents' => LandingContent::getGroupedContents(),
        ]));
    }

    public function catalog(): Response
    {
        return Inertia::render('katalog', $this->getCatalogData());
    }
}
