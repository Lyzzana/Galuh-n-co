<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        abort_unless($user instanceof User, 403);

        $cart = Cart::query()
            ->with('items.product')
            ->where('user_id', $user->id)
            ->first();

        $items = $cart?->items->map(function (CartItem $item): array {
            $imageUrl = null;
            if ($item->is_custom_b2b) {
                $logoPath = is_array($item->custom_config) && isset($item->custom_config['logo_path']) && is_string($item->custom_config['logo_path'])
                    ? $item->custom_config['logo_path']
                    : null;
                if ($logoPath !== null && $logoPath !== '') {
                    $imageUrl = asset('storage/'.ltrim($logoPath, '/'));
                }
            } elseif ($item->product instanceof Product && ! empty($item->product->image)) {
                $image = $item->product->image;
                $imageUrl = (str_starts_with($image, 'http://') || str_starts_with($image, 'https://'))
                    ? $image
                    : asset('storage/'.ltrim($image, '/'));
            }

            $customTitle = is_array($item->custom_config) && isset($item->custom_config['title']) && is_string($item->custom_config['title'])
                ? $item->custom_config['title']
                : 'Custom B2B Luxury Hampers';

            $unitPrice = (float) $item->unit_price;

            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->is_custom_b2b
                    ? $customTitle
                    : ($item->product->name ?? 'Galuh & Co. Hampers'),
                'category' => $item->product?->category,
                'image_url' => $imageUrl,
                'is_custom_b2b' => $item->is_custom_b2b,
                'custom_config' => $item->custom_config,
                'quantity' => $item->quantity,
                'unit_price' => $unitPrice,
                'subtotal' => $item->quantity * $unitPrice,
            ];
        })->values()->all() ?? [];

        return Inertia::render('cart/index', [
            'items' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user instanceof User, 403);

        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::query()->findOrFail((int) $validated['product_id']);
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $existingItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('is_custom_b2b', false)
            ->first();

        if ($existingItem instanceof CartItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + (int) $validated['quantity'],
            ]);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'is_custom_b2b' => false,
                'quantity' => (int) $validated['quantity'],
                'unit_price' => $product->price_from,
            ]);
        }

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang.');
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user instanceof User, 403);
        abort_unless($cartItem->cart?->user_id === $user->id, 403);

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cartItem->update([
            'quantity' => (int) $validated['quantity'],
        ]);

        return back()->with('success', 'Jumlah item keranjang diperbarui.');
    }

    public function destroy(Request $request, CartItem $cartItem): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user instanceof User, 403);
        abort_unless($cartItem->cart?->user_id === $user->id, 403);

        $cartItem->delete();

        return back()->with('success', 'Item berhasil dihapus dari keranjang.');
    }
}
