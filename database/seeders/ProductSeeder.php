<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Kategori 1: Corporate Executive
            [
                'name' => 'The Nusantara Executive Box',
                'slug' => 'the-nusantara-executive-box',
                'category' => 'Corporate Executive',
                'short_description' => 'Hampers eksklusif untuk klien VIP dan jajaran direksi dengan sentuhan kriya premium.',
                'contents' => [
                    'Hardbox Linen Eksklusif Emboss Emas',
                    'Single Origin Arabica Coffee 200g',
                    'Tumbler Stainless Vacuum 500ml',
                    'Artisan Cookies Tin 250g',
                    'Kartu Ucapan Custom Logo Perusahaan',
                ],
                'price_from' => 650000,
                'image' => null,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Heritage Tea & Brass Set',
                'slug' => 'heritage-tea-brass-set',
                'category' => 'Corporate Executive',
                'short_description' => 'Perpaduan teh artisan pilihan nusantara dengan perlengkapan seduh elegan.',
                'contents' => [
                    'Kotak Kayu Jati Finishing Natural',
                    '2 Kaleng Teh Artisan Nusantara',
                    'Saringan Teh Kuningan (Brass Infuser)',
                    'Madu Hutan Murni 250ml',
                    'Greeting Card Personal',
                ],
                'price_from' => 520000,
                'image' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],

            // Kategori 2: Seasonal & Festive
            [
                'name' => 'Raya Harmoni Deluxe',
                'slug' => 'raya-harmoni-deluxe',
                'category' => 'Seasonal & Festive',
                'short_description' => 'Hampers perayaan hari raya dengan sajian kue kering klasik buatan tangan.',
                'contents' => [
                    'Nastar Wisman Premium 350g',
                    'Kastengel Keju Edam 350g',
                    'Putri Salju Mede 300g',
                    'Sirup Kurma Organik 500ml',
                    'Tasbih Kayu & Kartu Ucapan Raya',
                ],
                'price_from' => 450000,
                'image' => null,
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Festive Glow Signature',
                'slug' => 'festive-glow-signature',
                'category' => 'Seasonal & Festive',
                'short_description' => 'Bingkisan akhir tahun bernuansa hangat untuk rekan bisnis dan keluarga besar.',
                'contents' => [
                    'Scented Soy Candle Aroma Cedarwood',
                    'Dark Chocolate Praline Box (12 pcs)',
                    'Spiced Chai Latte Blend 200g',
                    'Coaster Kulit Sintetis Premium (2 pcs)',
                    'Pita Satin & Hangtag Custom',
                ],
                'price_from' => 380000,
                'image' => null,
                'sort_order' => 4,
                'is_active' => true,
            ],

            // Kategori 3: Wellness & Lifestyle
            [
                'name' => 'Serenity Spa & Aromatherapy',
                'slug' => 'serenity-spa-aromatherapy',
                'category' => 'Wellness & Lifestyle',
                'short_description' => 'Paket relaksasi lengkap untuk apresiasi karyawan dan program wellness perusahaan.',
                'contents' => [
                    'Reed Diffuser Lavender & Eucalyptus 100ml',
                    'Bath Salt Himalayan & Rose Petals',
                    'Handuk Wajah Katun Bambu',
                    'Sabun Mandi Natural Olive Oil',
                    'Kotak Anyaman Pandan Modern',
                ],
                'price_from' => 320000,
                'image' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Mindful Desk & Productivity',
                'slug' => 'mindful-desk-productivity',
                'category' => 'Wellness & Lifestyle',
                'short_description' => 'Perlengkapan meja kerja estetik untuk menyambut onboarding karyawan baru.',
                'contents' => [
                    'Hardcover Notebook A5 Custom Logo',
                    'Pulpen Metal Matte Black',
                    'Desk Organizer Kayu Minimalis',
                    'Drip Bag Coffee Box (5 sachets)',
                    'Welcome Card Perusahaan',
                ],
                'price_from' => 290000,
                'image' => null,
                'sort_order' => 6,
                'is_active' => true,
            ],

            // Kategori 4: Event & Appreciation
            [
                'name' => 'The Artisan Sweet Box',
                'slug' => 'the-artisan-sweet-box',
                'category' => 'Event & Appreciation',
                'short_description' => 'Hampers ringkas untuk suvenir seminar, peluncuran produk, atau apresiasi pembicara.',
                'contents' => [
                    'Almond Crispy Cheese 200g',
                    'Matcha White Chocolate Bark 150g',
                    'Botol Kaca Infused Water 450ml',
                    'Kartu Terima Kasih Custom Event',
                ],
                'price_from' => 210000,
                'image' => null,
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Grand Appreciation Trunk',
                'slug' => 'grand-appreciation-trunk',
                'category' => 'Event & Appreciation',
                'short_description' => 'Koper mini kulit sintetis berisi kurasi produk gourmet dan perlengkapan rumah tangga.',
                'contents' => [
                    'Vintage Faux-Leather Trunk Box',
                    'Set Cangkir Keramik Handmade (2 pcs)',
                    'Kopi Luwak Arabica 150g',
                    'Assorted Gourmet Nuts 300g',
                    'Sertifikat & Plakat Apresiasi Mini',
                ],
                'price_from' => 890000,
                'image' => null,
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product
            );
        }
    }
}