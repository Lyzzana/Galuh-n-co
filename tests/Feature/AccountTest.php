<?php

use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Hash;

test('guests are redirected from account page', function () {
    $response = $this->get(route('account.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated user can view account page with addresses orders and cart count', function () {
    $user = User::factory()->create([
        'role' => 'b2b',
        'phone' => '08123456789',
        'company_name' => 'PT Galuh Mitra',
    ]);

    $cart = Cart::create(['user_id' => $user->id]);
    $cart->items()->create([
        'product_id' => null,
        'is_custom_b2b' => true,
        'custom_config' => ['title' => 'Custom Box'],
        'quantity' => 5,
        'unit_price' => 250000,
    ]);

    $user->addresses()->create([
        'label' => 'Kantor',
        'recipient_name' => 'Sarah',
        'recipient_phone' => '0811111111',
        'address_line' => 'Jl. Sudirman No. 10',
        'city' => 'Jakarta Selatan',
        'postal_code' => '12190',
        'is_default' => true,
    ]);

    Order::create([
        'order_number' => 'GC-2026-0001',
        'user_id' => $user->id,
        'address_snapshot' => ['recipient_name' => 'Sarah', 'city' => 'Jakarta Selatan'],
        'total_amount' => 1250000,
        'status' => Order::STATUS_SHIPPING,
        'tracking_number' => 'JNE-998877',
        'b2b_video_token' => 'token-abc-123',
    ]);

    $response = $this->actingAs($user)->get(route('account.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('account/index')
            ->where('cartCount', 5)
            ->has('addresses', 1)
            ->has('orders', 1)
            ->where('orders.0.tracking_number', 'JNE-998877')
            ->where('orders.0.b2b_video_token', 'token-abc-123')
        );
});

test('user can update profile and password from account page', function () {
    $user = User::factory()->create([
        'role' => 'customer',
        'password' => Hash::make('OldPassword1!'),
    ]);

    $this->actingAs($user)
        ->patch(route('account.profile.update'), [
            'name' => 'Nama Baru',
            'email' => $user->email,
            'phone' => '089988776655',
            'company_name' => 'Perusahaan Baru',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $user->refresh();
    expect($user->name)->toBe('Nama Baru');
    expect($user->phone)->toBe('089988776655');

    $this->actingAs($user)
        ->put(route('account.password.update'), [
            'current_password' => 'OldPassword1!',
            'password' => 'NewPassword1!',
            'password_confirmation' => 'NewPassword1!',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    expect(Hash::check('NewPassword1!', $user->refresh()->password))->toBeTrue();
});

test('user can manage addresses and toggle default address', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('account.addresses.store'), [
        'label' => 'Rumah',
        'recipient_name' => 'Galuh',
        'recipient_phone' => '08123',
        'address_line' => 'Jl. Melati 1',
        'city' => 'Jakarta',
        'postal_code' => '12345',
        'is_default' => false,
    ])->assertSessionHasNoErrors();

    $first = UserAddress::where('user_id', $user->id)->firstOrFail();
    expect($first->is_default)->toBeTrue();

    $this->actingAs($user)->post(route('account.addresses.store'), [
        'label' => 'Kantor',
        'recipient_name' => 'Galuh',
        'recipient_phone' => '08123',
        'address_line' => 'Jl. Sudirman 2',
        'city' => 'Jakarta',
        'postal_code' => '12110',
        'is_default' => true,
    ])->assertSessionHasNoErrors();

    $second = UserAddress::where('user_id', $user->id)->where('label', 'Kantor')->firstOrFail();
    expect($second->is_default)->toBeTrue();
    expect($first->refresh()->is_default)->toBeFalse();

    $this->actingAs($user)->delete(route('account.addresses.destroy', $second))
        ->assertSessionHasNoErrors();

    expect($first->refresh()->is_default)->toBeTrue();
});

test('user cannot modify another users address', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();

    $address = $owner->addresses()->create([
        'label' => 'Rumah',
        'recipient_name' => 'Owner',
        'recipient_phone' => '08123',
        'address_line' => 'Jl. Rahasia 1',
        'city' => 'Bandung',
        'postal_code' => '40111',
        'is_default' => true,
    ]);

    $this->actingAs($other)
        ->patch(route('account.addresses.update', $address), ['is_default' => true])
        ->assertForbidden();

    $this->actingAs($other)
        ->delete(route('account.addresses.destroy', $address))
        ->assertForbidden();
});
