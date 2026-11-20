<?php

// Import controller untuk mengelola daftar inquiry di halaman admin (diberi alias agar tidak bentrok)
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
// Import controller untuk mengelola CRUD produk hampers di halaman admin
use App\Http\Controllers\Admin\ProductController as AdminProductController;
// Import controller untuk menampilkan katalog produk aktif di halaman depan (publik)
use App\Http\Controllers\CatalogController;
// Import controller untuk dashboard admin
use App\Http\Controllers\DashboardController;
// Import controller publik untuk memproses pengiriman form inquiry corporate
use App\Http\Controllers\InquiryController;
// Import facade Route bawaan Laravel untuk mendefinisikan jalur URL aplikasi
use Illuminate\Support\Facades\Route;

// Route halaman utama (/). Memanggil CatalogController@index untuk mengirim data produk aktif sebagai props ke React
Route::get('/', [CatalogController::class, 'index'])->name('home');
Route::get('/katalog', [CatalogController::class, 'catalog'])->name('catalog');

// Route untuk menerima data form inquiry corporate (method POST)
// middleware('throttle:5,1') membatasi maksimal 5 kali pengiriman per menit per IP untuk mencegah spam
Route::post('/inquiries', [InquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('inquiries.store');

// Grup route hanya bisa diakses oleh user/admin yang sudah login ('auth') dan terverifikasi ('verified')
Route::middleware(['auth', 'verified'])->group(function () {

    // Route halaman utama dashboard admin (/dashboard)
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Grup route khusus modul admin dengan awalan URL '/admin/...' dan awalan nama route 'admin....'
    Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {

        // Mendaftarkan route CRUD produk (/admin/products) kecuali create, show, dan edit (karena memakai modal di halaman index)
        Route::resource('products', AdminProductController::class)->except(['create', 'show', 'edit']);

        // Mendaftarkan route manajemen inquiry (/admin/inquiries) hanya untuk melihat daftar (index), ubah status (update), dan hapus (destroy)
        Route::resource('inquiries', AdminInquiryController::class)->only(['index', 'update', 'destroy']);
    });
});

// Memuat file route tambahan bawaan starter kit untuk pengaturan profil & password akun admin
require __DIR__.'/settings.php';
