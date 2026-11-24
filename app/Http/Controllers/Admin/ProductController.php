<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('sort_order')
            ->latest()
            ->get()
            ->map(function (Product $product): array {
                $imageUrl = null;
                if (! empty($product->image)) {
                    if (str_starts_with($product->image, 'http://') || str_starts_with($product->image, 'https://')) {
                        $imageUrl = $product->image;
                    } else {
                        $imageUrl = asset('storage/'.$product->image);
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
                    'price_from' => $product->price_from,
                    'image_url' => $imageUrl,
                    'sort_order' => $product->sort_order,
                    'is_active' => $product->is_active,
                ];
            });

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->boolean('is_active', true);
        $data['is_best_seller'] = $request->boolean('is_best_seller', false);
        $data['season_tag'] = filled($data['season_tag'] ?? null) ? trim((string) $data['season_tag']) : null;
        $data['is_best_seller'] = $request->boolean('is_best_seller', false);
        $data['season_tag'] = filled($data['season_tag'] ?? null) ? trim((string) $data['season_tag']) : null;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($data);

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        if ($product->name !== $data['name']) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $product->id);
        }

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->boolean('is_active', true);
        $data['is_best_seller'] = $request->boolean('is_best_seller', false);
        $data['season_tag'] = filled($data['season_tag'] ?? null) ? trim((string) $data['season_tag']) : null;

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']);
        }

        $product->update($data);

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus.');
    }

    private function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Product::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
