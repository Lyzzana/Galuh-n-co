<?php

use App\Models\User;

test('admin login screen can be rendered', function () {
    $response = $this->get(route('admin.login'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/login'));
});

test('admin users can authenticate via admin login portal and redirect to dashboard', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
        'role' => 'admin',
    ]);

    $response = $this->post(route('admin.login.store'), [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($admin);
    $response->assertRedirect(route('dashboard'));
});

test('non admin users cannot authenticate via admin login portal', function () {
    $customer = User::factory()->create([
        'is_admin' => false,
        'role' => 'customer',
    ]);

    $response = $this->from(route('admin.login'))
        ->post(route('admin.login.store'), [
            'email' => $customer->email,
            'password' => 'password',
        ]);

    $response->assertRedirect(route('admin.login'));
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('admin login rejects invalid password', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
        'role' => 'admin',
    ]);

    $response = $this->from(route('admin.login'))
        ->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'wrong-password',
        ]);

    $response->assertRedirect(route('admin.login'));
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});
