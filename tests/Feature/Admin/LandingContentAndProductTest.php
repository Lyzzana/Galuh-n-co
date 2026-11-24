<?php

use App\Models\Product;
use App\Models\User;
use Database\Seeders\LandingContentSeeder;

test('non admin user cannot access landing content cms', function () {
    $user = User::factory()->create(['is_admin' => false, 'role' => 'customer']);

    $this->actingAs($user)
        ->get(route('admin.landing-content.index'))
        ->assertForbidden();
});

test('admin can update landing content and welcome page receives updated contents', function () {
    $this->seed(LandingContentSeeder::class);

    $admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);

    $this->actingAs($admin)
        ->get(route('admin.landing-content.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/landing-content')
            ->has('contents.hero')
        );

    $this->actingAs($admin)
        ->post(route('admin.landing-content.update'), [
            'contents' => [
                [
                    'section' => 'hero',
                    'key' => 'headline_line_1',
                    'value' => 'Bingkisan Eksklusif Kustom',
                    'type' => 'text',
                ],
            ],
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->where('contents.hero.headline_line_1', 'Bingkisan Eksklusif Kustom')
        );
});

test('admin can create product with event category season tag and best seller flag', function () {
    $admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);

    $this->actingAs($admin)
        ->post(route('admin.products.store'), [
            'name' => 'Royal Raya Box',
            'category' => 'Seasonal & Festive',
            'event_category' => 'Lebaran',
            'season_tag' => 'Ramadan 2026',
            'is_best_seller' => true,
            'short_description' => 'Hampers lebaran eksklusif dengan kue kering premium.',
            'contents' => ['Nastar Wisman', 'Kastengel Edam'],
            'price_from' => 550000,
            'sort_order' => 1,
            'is_active' => true,
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $product = Product::where('name', 'Royal Raya Box')->firstOrFail();
    expect($product->event_category)->toBe('Lebaran');
    expect($product->season_tag)->toBe('Ramadan 2026');
    expect($product->is_best_seller)->toBeTrue();

    $this->get(route('catalog'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('katalog')
            ->where('products.0.event_category', 'Lebaran')
            ->where('products.0.season_tag', 'Ramadan 2026')
            ->where('products.0.is_best_seller', true)
        );
});
