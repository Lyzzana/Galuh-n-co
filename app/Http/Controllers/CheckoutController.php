<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        abort_if(! $user instanceof User, 403);

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        $items = $cart->items()->with('product')->get();

        if ($items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Keranjang belanja masih kosong.');
        }

        $subtotal = $items->reduce(
            fn (float $carry, CartItem $item): float => $carry + ($item->quantity * (is_numeric($item->unit_price) ? $item->unit_price + 0 : 0)),
            0.0
        );

        return Inertia::render('checkout/index', [
            'items' => $items,
            'subtotal' => $subtotal,
            'addresses' => $user->addresses()->orderByDesc('is_default')->get(),
            'isB2B' => $user->isB2B(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        abort_if(! $user instanceof User, 403);

        $cart = $user->cart()->with('items.product')->firstOrFail();

        if ($cart->items->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $validated = $request->validate([
            'address_id' => ['required', 'exists:user_addresses,id'],
            'greeting_note' => ['nullable', 'string', 'max:1000'],
            'payment_proof' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:4096'],
            'b2b_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm', 'max:51200'],
        ]);

        $address = $user->addresses()->findOrFail($validated['address_id']);
        $hasCustomB2B = $cart->items->contains('is_custom_b2b', true);

        $paymentPath = $request->hasFile('payment_proof')
            ? $request->file('payment_proof')->store('payment-proofs', 'public')
            : null;

        $videoPath = null;
        $videoToken = null;

        if ($user->isB2B() && $request->hasFile('b2b_video')) {
            $videoPath = $request->file('b2b_video')->store('b2b-videos', 'public');
            $videoToken = Str::random(24);
        }

        DB::transaction(function () use ($user, $cart, $address, $validated, $paymentPath, $videoPath, $videoToken, $hasCustomB2B): void {
            $totalAmount = $cart->items->reduce(
                fn (float $carry, CartItem $item): float => $carry + ($item->quantity * (is_numeric($item->unit_price) ? $item->unit_price + 0 : 0)),
                0.0
            );

            $order = Order::create([
                'order_number' => 'INV-GC-'.now()->format('Ymd').'-'.strtoupper(Str::random(4)),
                'user_id' => $user->id,
                'address_snapshot' => $address->toArray(),
                'total_amount' => $totalAmount,
                'status' => Order::STATUS_VERIFICATION,
                'greeting_note' => $validated['greeting_note'] ?? null,
                'payment_proof_path' => $paymentPath,
                'b2b_video_path' => $videoPath,
                'b2b_video_token' => $user->isB2B() && ($hasCustomB2B || $videoPath !== null)
                    ? ($videoToken ?? Str::random(24))
                    : null,
            ]);

            foreach ($cart->items as $item) {
                $unitPrice = is_numeric($item->unit_price) ? $item->unit_price + 0 : 0;
                $customTitle = is_array($item->custom_config) && isset($item->custom_config['title']) && is_string($item->custom_config['title'])
                    ? $item->custom_config['title']
                    : 'Custom B2B Luxury Hampers';

                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_name' => $item->is_custom_b2b
                        ? $customTitle
                        : ($item->product->name ?? 'Galuh & Co. Hampers'),
                    'is_custom_b2b' => $item->is_custom_b2b,
                    'custom_config' => $item->custom_config,
                    'quantity' => $item->quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $item->quantity * $unitPrice,
                ]);
            }

            $cart->items()->delete();
        });

        return redirect()->route('account.index')->with('success', 'Pesanan berhasil dibuat dan sedang dalam tahap Verifikasi.');
    }
}
