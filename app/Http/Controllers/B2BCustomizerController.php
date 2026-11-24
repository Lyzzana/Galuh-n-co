<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class B2BCustomizerController extends Controller
{
    public const BASE_BOX_PRICE = 150000;

    /**
     * Peta harga resmi per item isi parsel (Rp) untuk kalkulasi server-side.
     *
     * @var array<string, array{name: string, price: int, category: string}>
     */
    public const PARCEL_CATALOG = [
        'nastar-jar' => ['name' => 'Artisanal Nastar & Cookies Jar', 'price' => 125000, 'category' => 'Pastry'],
        'earl-grey-tin' => ['name' => 'Royal Earl Grey Tea Tin', 'price' => 95000, 'category' => 'Tea & Coffee'],
        'raw-honey' => ['name' => 'Forest Blossom Raw Honey', 'price' => 110000, 'category' => 'Gourmet'],
        'scented-candle' => ['name' => 'Sandalwood & Vanilla Scented Candle', 'price' => 135000, 'category' => 'Home Living'],
        'brass-mug' => ['name' => 'Signature Brass-Trimmed Mug', 'price' => 145000, 'category' => 'Tableware'],
        'dark-chocolate' => ['name' => 'Artisan Dark Chocolate Bar', 'price' => 85000, 'category' => 'Confectionery'],
    ];

    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('b2b/customizer', [
            'isB2B' => $user instanceof User && $user->isB2B(),
        ]);
    }

    public function addToCart(Request $request): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user instanceof User, 403);

        $isB2B = $user->isB2B();
        $minQuantity = $isB2B ? 10 : 1;

        /** @var array{
         *     title: string,
         *     box_color: string,
         *     ribbon_color: string,
         *     package_tier?: string|null,
         *     quantity: int,
         *     unit_price?: float|int|string|null,
         *     items?: array<int, array{id: string, name: string, price?: int|float|string, slot?: int, category?: string|null}>|null
         * } $validated
         */
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'box_color' => ['required', 'string', 'max:50'],
            'ribbon_color' => ['required', 'string', 'max:50'],
            'package_tier' => ['nullable', 'string', 'max:100'],
            'quantity' => ['required', 'integer', "min:{$minQuantity}", 'max:5000'],
            'unit_price' => ['required_without:items', 'nullable', 'numeric', 'min:50000'],
            'items' => ['nullable', 'array', 'min:1', 'max:6'],
            'items.*.id' => ['required', 'string', 'max:100'],
            'items.*.name' => ['required', 'string', 'max:150'],
            'items.*.price' => ['required', 'integer', 'min:0'],
            'items.*.slot' => ['nullable', 'integer', 'min:0', 'max:5'],
            'items.*.category' => ['nullable', 'string', 'max:100'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        $rawItems = $validated['items'] ?? null;
        $normalizedItems = [];
        $itemsTotal = 0;

        if (is_array($rawItems) && $rawItems !== []) {
            foreach ($rawItems as $entry) {
                $itemId = (string) $entry['id'];
                $catalogItem = self::PARCEL_CATALOG[$itemId] ?? null;
                $itemPrice = $catalogItem !== null
                    ? $catalogItem['price']
                    : (int) ($entry['price'] ?? 0);

                $normalizedItems[] = [
                    'id' => $itemId,
                    'name' => $catalogItem['name'] ?? (string) $entry['name'],
                    'price' => $itemPrice,
                    'slot' => isset($entry['slot']) ? (int) $entry['slot'] : null,
                    'category' => $catalogItem['category'] ?? ($entry['category'] ?? null),
                ];
                $itemsTotal += $itemPrice;
            }

            $computedUnitPrice = self::BASE_BOX_PRICE + $itemsTotal;
            $packageTier = $validated['package_tier'] ?? sprintf('Custom %d Item', count($normalizedItems));
        } else {
            $computedUnitPrice = (int) round((float) ($validated['unit_price'] ?? self::BASE_BOX_PRICE));
            $packageTier = $validated['package_tier'] ?? 'Custom Box';
        }

        $logo = $request->file('logo');
        $logoPath = $isB2B && $logo instanceof UploadedFile
            ? $logo->store('b2b-logos', 'public')
            : null;

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cart->items()->create([
            'product_id' => null,
            'is_custom_b2b' => true,
            'custom_config' => [
                'title' => $validated['title'],
                'box_color' => $validated['box_color'],
                'ribbon_color' => $validated['ribbon_color'],
                'package_tier' => $packageTier,
                'logo_path' => $logoPath,
                'items' => $normalizedItems,
            ],
            'quantity' => $validated['quantity'],
            'unit_price' => $computedUnitPrice,
        ]);

        return redirect()->route('cart.index')->with('success', 'Konfigurasi 3D Gift Box ditambahkan ke keranjang.');
    }

    public function showGreeting(string $token): Response
    {
        $order = Order::query()
            ->with('user')
            ->where('b2b_video_token', $token)
            ->firstOrFail();

        return Inertia::render('greeting/show', [
            'orderNumber' => $order->order_number,
            'companyName' => $order->user->company_name ?? 'Galuh & Co. Corporate Partner',
            'greetingNote' => $order->greeting_note,
            'videoUrl' => $order->b2b_video_path ? asset('storage/'.$order->b2b_video_path) : null,
        ]);
    }
}
