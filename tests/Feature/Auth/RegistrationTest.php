<?php

use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('personal users can register with customer role', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Rina Kartika',
        'email' => 'rina@example.com',
        'role' => 'customer',
        'phone' => '081234567890',
        'company_name' => '',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertRedirect(route('home', absolute: false));
    $this->assertAuthenticated();

    $user = User::where('email', 'rina@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user?->role)->toBe('customer');
    expect($user?->phone)->toBe('081234567890');
    expect($user?->is_admin)->toBeFalse();
});

test('b2b registration requires company name', function () {
    $response = $this->from(route('register'))->post(route('register.store'), [
        'name' => 'Budi Santoso',
        'email' => 'budi@corp.com',
        'role' => 'b2b',
        'phone' => '081299998888',
        'company_name' => '',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertSessionHasErrors('company_name');
    $this->assertGuest();
});

test('corporate users can register with b2b role and company name', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Budi Santoso',
        'email' => 'budi@corp.com',
        'role' => 'b2b',
        'phone' => '081299998888',
        'company_name' => 'PT Nusantara Jaya',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertRedirect(route('home', absolute: false));
    $this->assertAuthenticated();

    $user = User::where('email', 'budi@corp.com')->first();
    expect($user)->not->toBeNull();
    expect($user?->role)->toBe('b2b');
    expect($user?->company_name)->toBe('PT Nusantara Jaya');
});

test('registration rejects admin role injection', function () {
    $response = $this->from(route('register'))->post(route('register.store'), [
        'name' => 'Hacker',
        'email' => 'hacker@example.com',
        'role' => 'admin',
        'phone' => '081234567890',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertSessionHasErrors('role');
    $this->assertGuest();
});
