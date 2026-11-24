<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function createSampleProduct(array $overrides = []): Product
{
    return Product::create(array_merge([
        'name' => 'Royal Nusantara Box',
        'slug' => 'royal-nusantara-box-'.uniqid(),
        'category' => 'Corporate Executive',
        'event_category' => 'Corporate',
        'season_tag' => 'Year End 2026',
        'is_best_seller' => true,
        'short_description' => 'Hampers mewah eksklusif untuk mitra korporat.',
        'contents' => ['Single Origin Coffee', 'Artisan Cookies'],
        'price_from' => 500000,
        'sort_order' => 1,
        'is_active' => true,
    ], $overrides));
}

test('authenticated user can manage cart items and cannot modify others cart', function () {
    $user = User::factory()->create(['role' => 'customer']);
    $otherUser = User::factory()->create(['role' => 'customer']);
    $product = createSampleProduct();

    $this->actingAs($user)
        ->post(route('cart.store'), [
            'product_id' => $product->id,
            'quantity' => 2,
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $this->actingAs($user)
        ->post(route('cart.store'), [
            'product_id' => $product->id,
            'quantity' => 3,
        ])
        ->assertSessionHasNoErrors();

    $cartItem = CartItem::query()->firstOrFail();
    expect($cartItem->quantity)->toBe(5);

    $this->actingAs($user)
        ->get(route('cart.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('cart/index')
            ->has('items', 1)
            ->where('items.0.quantity', 5)
        );

    $this->actingAs($user)
        ->patch(route('cart.update', $cartItem), ['quantity' => 4])
        ->assertSessionHasNoErrors();

    expect($cartItem->refresh()->quantity)->toBe(4);

    $this->actingAs($otherUser)
        ->patch(route('cart.update', $cartItem), ['quantity' => 9])
        ->assertForbidden();

    $this->actingAs($otherUser)
        ->delete(route('cart.destroy', $cartItem))
        ->assertForbidden();

    $this->actingAs($user)
        ->delete(route('cart.destroy', $cartItem))
        ->assertSessionHasNoErrors();

    expect(CartItem::query()->count())->toBe(0);
});

test('b2c user can checkout with payment proof and creates verification order', function () {
    Storage::fake('public');

    $user = User::factory()->create(['role' => 'customer']);
    $product = createSampleProduct(['price_from' => 450000]);

    $address = $user->addresses()->create([
        'label' => 'Rumah',
        'recipient_name' => 'Rina Kartika',
        'recipient_phone' => '08123456789',
        'address_line' => 'Jl. Kemang Raya No. 12',
        'city' => 'Jakarta Selatan',
        'postal_code' => '12730',
        'is_default' => true,
    ]);

    $cart = Cart::create(['user_id' => $user->id]);
    $cart->items()->create([
        'product_id' => $product->id,
        'is_custom_b2b' => false,
        'quantity' => 2,
        'unit_price' => 450000,
    ]);

    $this->actingAs($user)
        ->get(route('checkout.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('checkout/index')
            ->where('isB2B', false)
            ->where('subtotal', 900000)
        );

    $this->actingAs($user)
        ->post(route('checkout.store'), [
            'address_id' => $address->id,
            'greeting_note' => 'Selamat merayakan momen penuh berkah.',
            'payment_proof' => UploadedFile::fake()->image('transfer.jpg'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('account.index'));

    $order = Order::where('user_id', $user->id)->firstOrFail();
    expect($order->status)->toBe(Order::STATUS_VERIFICATION);
    expect((float) $order->total_amount)->toBe(900000.0);
    expect($order->payment_proof_path)->not->toBeNull();
    expect($order->b2b_video_token)->toBeNull();
    expect($cart->items()->count())->toBe(0);
});

test('all users can use 3d customizer while company logo and video greeting remain exclusive to b2b', function () {
    Storage::fake('public');

    $customer = User::factory()->create(['role' => 'customer']);
    $b2bUser = User::factory()->create([
        'role' => 'b2b',
        'company_name' => 'PT Mahakarya Nusantara',
    ]);

    // Guest can preview 3D customizer publicly, but must log in to add to cart
    $this->get(route('b2b.customizer'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('b2b/customizer')
            ->where('isB2B', false)
        );

    $this->post(route('b2b.customizer.store'), [
        'title' => 'Guest Box',
        'box_color' => '#16233B',
        'ribbon_color' => '#A88B54',
        'package_tier' => 'Executive Curated',
        'quantity' => 1,
        'unit_price' => 450000,
    ])->assertRedirect(route('login'));

    // B2C customer can view and order min 1 custom 3D box, without logo/video QR privileges
    $this->actingAs($customer)
        ->get(route('b2b.customizer'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('b2b/customizer')
            ->where('isB2B', false)
        );

    $this->actingAs($customer)
        ->post(route('b2b.customizer.store'), [
            'title' => 'Personal Custom Box',
            'box_color' => '#F2EBDC',
            'ribbon_color' => '#A88B54',
            'package_tier' => 'Custom 2 Item Pilihan',
            'quantity' => 1,
            'items' => [
                ['id' => 'nastar-jar', 'name' => 'Artisanal Nastar & Cookies Jar', 'price' => 125000, 'slot' => 0, 'category' => 'Pastry'],
                ['id' => 'earl-grey-tin', 'name' => 'Royal Earl Grey Tea Tin', 'price' => 95000, 'slot' => 1, 'category' => 'Tea & Coffee'],
            ],
            'logo' => UploadedFile::fake()->image('ignored-logo.png'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('cart.index'));

    $b2cCartItem = CartItem::query()->latest('id')->firstOrFail();
    expect($b2cCartItem->quantity)->toBe(1);
    expect((float) $b2cCartItem->unit_price)->toBe(370000.0);
    expect($b2cCartItem->custom_config['logo_path'] ?? null)->toBeNull();
    expect($b2cCartItem->custom_config['items'] ?? [])->toHaveCount(2);

    $b2cAddress = $customer->addresses()->create([
        'label' => 'Rumah',
        'recipient_name' => 'Rina',
        'recipient_phone' => '08123456',
        'address_line' => 'Jl. Melati 5',
        'city' => 'Jakarta',
        'postal_code' => '12345',
        'is_default' => true,
    ]);

    $this->actingAs($customer)
        ->post(route('checkout.store'), [
            'address_id' => $b2cAddress->id,
            'greeting_note' => 'Untuk sahabat terbaik.',
            'b2b_video' => UploadedFile::fake()->create('ignored-video.mp4', 128, 'video/mp4'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('account.index'));

    $b2cOrder = Order::where('user_id', $customer->id)->with('items')->latest('id')->firstOrFail();
    expect($b2cOrder->b2b_video_path)->toBeNull();
    expect($b2cOrder->b2b_video_token)->toBeNull();
    expect((float) $b2cOrder->total_amount)->toBe(370000.0);
    expect($b2cOrder->items->first()?->custom_config['items'] ?? [])->toHaveCount(2);

    // B2B corporate user sees isB2B=true, requires MOQ >= 10, and keeps logo + video QR
    $this->actingAs($b2bUser)
        ->get(route('b2b.customizer'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('b2b/customizer')
            ->where('isB2B', true)
        );

    // Enforce corporate MOQ >= 10
    $this->actingAs($b2bUser)
        ->from(route('b2b.customizer'))
        ->post(route('b2b.customizer.store'), [
            'title' => 'Too Few Boxes',
            'box_color' => '#16233B',
            'ribbon_color' => '#A88B54',
            'package_tier' => 'Executive Curated',
            'quantity' => 5,
            'unit_price' => 450000,
        ])
        ->assertSessionHasErrors('quantity');

    $this->actingAs($b2bUser)
        ->post(route('b2b.customizer.store'), [
            'title' => 'Corporate VIP Edition',
            'box_color' => '#16233B',
            'ribbon_color' => '#A88B54',
            'package_tier' => 'Custom 2 Item Pilihan',
            'quantity' => 20,
            'items' => [
                ['id' => 'scented-candle', 'name' => 'Sandalwood & Vanilla Scented Candle', 'price' => 135000, 'slot' => 0, 'category' => 'Home Living'],
                ['id' => 'brass-mug', 'name' => 'Signature Brass-Trimmed Mug', 'price' => 145000, 'slot' => 1, 'category' => 'Tableware'],
            ],
            'logo' => UploadedFile::fake()->image('logo.png'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('cart.index'));

    $b2bCartItem = CartItem::query()->latest('id')->firstOrFail();
    expect((float) $b2bCartItem->unit_price)->toBe(430000.0);
    expect($b2bCartItem->custom_config['logo_path'] ?? null)->not->toBeNull();
    expect($b2bCartItem->custom_config['items'] ?? [])->toHaveCount(2);

    $address = $b2bUser->addresses()->create([
        'label' => 'Kantor Pusat',
        'recipient_name' => 'Direksi',
        'recipient_phone' => '0811112222',
        'address_line' => 'SCBD Lot 10',
        'city' => 'Jakarta Selatan',
        'postal_code' => '12190',
        'is_default' => true,
    ]);

    $this->actingAs($b2bUser)
        ->post(route('checkout.store'), [
            'address_id' => $address->id,
            'greeting_note' => 'Terima kasih atas kemitraan terbaik tahun ini.',
            'payment_proof' => UploadedFile::fake()->image('invoice.jpg'),
            'b2b_video' => UploadedFile::fake()->create('greeting.mp4', 256, 'video/mp4'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('account.index'));

    $order = Order::where('user_id', $b2bUser->id)->firstOrFail();
    expect($order->b2b_video_token)->not->toBeNull();
    expect($order->b2b_video_path)->not->toBeNull();

    $this->get(route('greeting.show', (string) $order->b2b_video_token))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('greeting/show')
            ->where('orderNumber', $order->order_number)
            ->where('companyName', 'PT Mahakarya Nusantara')
            ->where('greetingNote', 'Terima kasih atas kemitraan terbaik tahun ini.')
        );
});

test('admin can view orders and advance 4 stage tracking while non admin is forbidden', function () {
    $customer = User::factory()->create(['is_admin' => false, 'role' => 'customer']);
    $admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);

    $order = Order::create([
        'order_number' => 'INV-GC-20261124-TEST',
        'user_id' => $customer->id,
        'address_snapshot' => ['recipient_name' => 'Tester', 'city' => 'Jakarta'],
        'total_amount' => 500000,
        'status' => Order::STATUS_VERIFICATION,
    ]);

    $this->actingAs($customer)
        ->get(route('admin.orders.index'))
        ->assertForbidden();

    $this->actingAs($customer)
        ->patch(route('admin.orders.status', $order), ['status' => Order::STATUS_PACKING])
        ->assertForbidden();

    $this->actingAs($admin)
        ->get(route('admin.orders.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/orders')
            ->has('orders', 1)
        );

    $this->actingAs($admin)
        ->patch(route('admin.orders.status', $order), [
            'status' => Order::STATUS_PACKING,
        ])
        ->assertSessionHasNoErrors();

    expect($order->refresh()->status)->toBe(Order::STATUS_PACKING);
    expect($order->packed_at)->not->toBeNull();

    $this->actingAs($admin)
        ->patch(route('admin.orders.status', $order), [
            'status' => Order::STATUS_SHIPPING,
            'tracking_number' => 'JNE-88990011',
        ])
        ->assertSessionHasNoErrors();

    expect($order->refresh()->status)->toBe(Order::STATUS_SHIPPING);
    expect($order->tracking_number)->toBe('JNE-88990011');
    expect($order->shipped_at)->not->toBeNull();

    $this->actingAs($admin)
        ->patch(route('admin.orders.status', $order), [
            'status' => Order::STATUS_DELIVERED,
            'tracking_number' => 'JNE-88990011',
        ])
        ->assertSessionHasNoErrors();

    expect($order->refresh()->status)->toBe(Order::STATUS_DELIVERED);
    expect($order->delivered_at)->not->toBeNull();
});
