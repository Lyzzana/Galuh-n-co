# PRESENTASI_GALUH_CO.md

## Materi Presentasi & Panduan Tanya Jawab

### Website "Galuh & Co." — Curated Luxury Hampers & Corporate Gifting

---

# BAGIAN 1 — DECK SLIDE PADAT (10 Slide)

---

## SLIDE 1 — COVER

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│          G A L A H  &  C O.                        │
│                                                     │
│   Curated Luxury Hampers & Corporate Gifting        │
│                                                     │
│   Laravel 13 · React 19 · Inertia v3               │
│   Full-Stack Web Application                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**📌 Teks di Layar:**

- Galuh & Co. — Platform Hampers Mewah
- Full-Stack: Laravel 13 + React 19 + Inertia v3
- Dua sisi: Publik (B2C/B2B) + Admin Panel
- Deployment-ready · Secure · Responsive

**🎤 Speaker Notes:**
Ini adalah website e-commerce hampers premium dengan dua lapisan: halaman publik untuk menjangkau konsumen ritel dan klien korporat, serta panel admin untuk mengelola seluruh konten dan permintaan. Dibangun dengan stack modern Laravel 13 di backend dan React 19 dengan TypeScript di frontend, dihubungkan oleh Inertia.js sehingga terasa seperti SPA tanpa kompleksitas API terpisah.

---

## SLIDE 2 — MASALAH & SOLUSI BISNIS

**📌 Teks di Layar:**

- **Masalah:** Proses order manual via WA, tidak terdokumentasi
- **Masalah:** Tidak ada etalase digital yang representatif
- **Masalah:** Klien korporat tidak punya jalur resmi inquiry
- **Solusi:** Platform terintegrasi — katalog, inquiry, & admin

**🎤 Speaker Notes:**
Sebelumnya seluruh proses pemesanan berlangsung via chat WhatsApp yang rawan tercecer dan tidak terstruktur. Website ini menyelesaikan tiga masalah sekaligus: memberikan etalase digital yang mencerminkan kualitas premium brand, menyediakan form inquiry korporat dengan validasi dan notifikasi otomatis ke admin, serta panel manajemen lengkap sehingga operasional bisa dikelola dari satu tempat.

---

## SLIDE 3 — IDENTITAS VISUAL "WARM LUXURY"

**📌 Teks di Layar:**

- Palet: Emerald Deep `#122E21` + Champagne Gold `#C5A059`
- Tipografi: Playfair Display (serif) + Plus Jakarta Sans
- Animasi: Motion.js — masuk halaman, foto melayang, typewriter
- CSS Token sistem — satu sumber kebenaran warna & font

**🎤 Speaker Notes:**
Desain visual diabstraksikan menjadi design token di `app.css` — semua warna brand seperti Emerald Deep dan Champagne Gold didefinisikan sebagai CSS custom properties, bukan literal di tiap komponen. Tailwind CSS v4 membaca token ini langsung. Ini memastikan konsistensi visual di seluruh 11 komponen landing page dan mempermudah perubahan tema di satu tempat.

---

## SLIDE 4 — ALUR USER JOURNEY

**📌 Teks di Layar:**

- **Hero** → Typewriter headline berputar · foto produk melayang
- **Katalog** → Filter kategori · modal detail produk
- **Corporate** → Form inquiry · marquee partner korporat
- **FAQ** → Accordion · smooth scroll navigasi

**🎤 Speaker Notes:**
User journey dirancang linier dari awareness hingga konversi. Hero Section membangun kesan pertama dengan animasi mewah. Katalog memberi akses cepat ke semua produk dengan filter kategori dinamis. Corporate Section menjadi titik konversi utama untuk klien B2B — form inquiry lengkap dengan 7 field validasi. Semua navigasi antar-section menggunakan smooth scroll yang telah dipetakan via anchor link di Navbar.

---

## SLIDE 5 — ARSITEKTUR TEKNOLOGI

**📌 Teks di Layar:**

- **Backend:** Laravel 13 · PHP 8.3 · MySQL
- **Frontend:** React 19 · TypeScript · Tailwind CSS v4
- **Bridge:** Inertia v3 (SPA tanpa REST API)
- **Tooling:** Wayfinder · Pint · Larastan · Pest · Vite-Plus

**🎤 Speaker Notes:**
Inertia.js bertindak sebagai jembatan antara Laravel dan React — tidak perlu membangun REST API terpisah, response tetap berupa HTML pada first load dan JSON pada navigasi berikutnya. Laravel Wayfinder otomatis menggenerate TypeScript function untuk setiap route Laravel, sehingga tidak ada URL string yang di-hardcode di frontend — perubahan route di PHP otomatis ter-reflect di TypeScript saat build.

---

## SLIDE 6 — PANEL ADMIN & KEAMANAN

**📌 Teks di Layar:**

- 4 modul: Produk · Inquiry · Partner · Dashboard
- Guard berlapis: `auth` → `verified` → `is_admin`
- Anti-spam: throttle 5 req/mnt + honeypot field
- Validasi FormRequest · Cookie encrypted · CSRF

**🎤 Speaker Notes:**
Keamanan diimplementasi dalam tujuh lapisan yang saling melengkapi. Middleware `EnsureAdmin` mengecek kolom `is_admin` di tabel users — pengguna yang login tapi bukan admin mendapat HTTP 403, bukan redirect ke login. Form inquiry publik dilindungi dua mekanisme anti-spam: rate limiting 5 request per menit per IP di level network, dan honeypot field tersembunyi yang langsung menolak request jika diisi oleh bot otomatis.

---

## SLIDE 7 — FITUR ADMIN: PRODUK & INQUIRY

**📌 Teks di Layar:**

- Produk: CRUD modal · upload foto · slug otomatis · sort order
- Inquiry: status pill dropdown · detail dialog · hapus
- Storage: file lama auto-delete saat ganti/hapus
- Search realtime client-side di semua tabel

**🎤 Speaker Notes:**
Semua operasi CRUD di admin menggunakan modal dialog dalam satu halaman, tanpa navigasi ke halaman terpisah — pengalaman lebih cepat. Upload gambar menggunakan `FormData` API karena Inertia tidak bisa mengirim File lewat JSON; saat gambar diganti, file lama di `storage/app/public` dihapus otomatis via `Storage::disk('public')->delete()` untuk mencegah akumulasi file orphan. Slug produk digenerate otomatis dengan deduplikasi suffix angka.

---

## SLIDE 8 — FITUR PARTNER KORPORAT & MARQUEE

**📌 Teks di Layar:**

- Admin upload logo partner → tampil otomatis di landing page
- Infinite marquee: duplikasi 2× · masking tepi · pause on hover
- Fallback: monogram huruf pertama jika logo belum diupload
- Tersembunyi otomatis jika belum ada data partner

**🎤 Speaker Notes:**
Marquee diimplementasi tanpa library eksternal — menggunakan CSS `@keyframes` dengan `translateX(0 → -50%)` pada track yang isinya diduplikasi dua kali, menciptakan ilusi infinite loop yang mulus. Fade effect di tepi kiri-kanan menggunakan CSS `mask-image` dengan `linear-gradient`. Seluruh marquee disembunyikan secara kondisional jika array partner kosong, sehingga section tetap tampil rapi meski belum ada data.

---

## SLIDE 9 — SKENARIO LIVE DEMO (3 Menit)

**📌 Teks di Layar:**

- **Mnt 1:** Buka `/` → hero typewriter → scroll ke katalog → klik produk
- **Mnt 2:** Scroll ke Corporate → isi form inquiry (data dummy)
- **Mnt 3:** Login admin → Dashboard → ubah status inquiry → tambah produk

**🎤 Speaker Notes:**
Demonstrasi dirancang mengalir dari perspektif pengunjung biasa ke admin. Menit pertama menunjukkan kualitas UI publik dan performa animasi. Menit kedua membuktikan form inquiry berjalan end-to-end. Menit ketiga menunjukkan panel admin — perubahan status inquiry langsung ter-reflect di tabel tanpa reload halaman berkat Inertia reactive props.

---

## SLIDE 10 — PENGEMBANGAN SELANJUTNYA

**📌 Teks di Layar:**

- **Fase 2:** Keranjang belanja + payment gateway (Midtrans)
- **Fase 3:** Tracking order real-time + notifikasi WhatsApp API
- **Fase 4:** Dashboard analytics (revenue, conversion rate)
- **Infra:** Deploy ke Laravel Cloud · CDN untuk aset gambar

**🎤 Speaker Notes:**
Arsitektur yang ada sudah menyiapkan fondasi untuk pengembangan lanjutan. Model `Inquiry` dapat diperluas menjadi `Order` dengan tambahan kolom payment status. Database sudah menggunakan struktur yang bersih dengan foreign key relations yang mudah ditambahkan. Laravel Cloud memungkinkan deployment production dengan autoscaling tanpa konfigurasi server manual.

---

---

# BAGIAN 2 — CHEAT SHEET DETAIL TEKNIS

> Gunakan bagian ini saat live demo atau ketika penguji meminta bukti implementasi spesifik.

---

## 2.1 Animasi & UI Effects

| Fitur                        | Detail Implementasi                                                                                                                                                                       | File                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **Rotating Typewriter Hero** | Hook `useRotatingTypewriter` — state machine 4 fase: `typing → pausing → erasing → switching`. Kata bergilir: Istimewa / Korporat / Hari Raya / Pernikahan. Speed: 85ms ketik, 50ms hapus | `HeroSection.tsx`                  |
| **Zero Layout Shift (CLS)**  | Container kata rotating pakai `invisible` ghost text (kata terpanjang "Pernikahan") untuk lock lebar minimum. Kata aktual di-`absolute` di atasnya                                        | `HeroSection.tsx`                  |
| **Kursor Typewriter**        | CSS `@keyframes cursor-blink`: opacity 1→1 (0–45%) → 0 (55%) → 1 (100%), durasi 1.1s ease-in-out. Disembunyikan saat jeda panjang setelah kata penuh                                      | `app.css` + `HeroSection.tsx`      |
| **`prefers-reduced-motion`** | Dua lapis: `MotionConfig reducedMotion="user"` di root untuk semua motion, + `window.matchMedia` check di `useRotatingTypewriter` untuk typewriter                                        | `welcome.tsx` + `HeroSection.tsx`  |
| **Foto Produk Melayang**     | `motion.div` dengan `y: [0, floatY, 0]` looping tak terbatas. Tiap foto: durasi 4.8–6s, delay 0.2–0.55s berbeda-beda → efek organik                                                       | `HeroSection.tsx`                  |
| **Partner Marquee**          | CSS `animate-marquee` (translateX 0→-50%), array partner diduplikasi 2×, `mask-image` linear-gradient fade tepi, `group-hover:[animation-play-state:paused]`                              | `app.css` + `CorporateSection.tsx` |
| **Entrance Animations**      | `containerVariants staggerChildren: 0.15` + `fadeUpVariant` (y: 22→0, opacity 0→1, ease `[0.16, 1, 0.3, 1]`) di semua section                                                             | seluruh landing components         |
| **Trigger viewport**         | `useInView(ref, { once: true, margin: '-80px' })` — animasi mulai saat elemen 80px sebelum masuk viewport, tidak berulang                                                                 | `HeroSection.tsx`                  |

---

## 2.2 Filter Katalog & Modal Produk

| Fitur                       | Detail                                                                                                                              | File                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Filter Kategori Dinamis** | Kategori diambil dari `products.pluck('category').unique()` di controller — tidak hard-coded                                        | `CatalogController.php` |
| **State Filter**            | `useState` aktif kategori, filter dilakukan client-side di array produk yang sudah di-pass sebagai Inertia props                    | `CatalogSection.tsx`    |
| **Modal Detail Produk**     | Triggered dari klik thumbnail/nama produk. Menampilkan: gambar, nama, kategori, harga, deskripsi, daftar isi, tombol inquiry via WA | `CatalogSection.tsx`    |
| **Fallback Gambar**         | URL eksternal (Unsplash) atau lokal via `asset('storage/...')`. Deteksi via `str_starts_with($image, 'http')`                       | `CatalogController.php` |

---

## 2.3 Keamanan & Validasi

| Mekanisme              | Detail                                                                                                | File                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Throttle**           | `middleware('throttle:5,1')` pada `POST /inquiries` — 5 request/menit/IP                              | `routes/web.php`                                   |
| **Honeypot**           | Field `website` hidden: `tabIndex={-1}`, rule `prohibited`, dibuang via `safe()->except(['website'])` | `StoreInquiryRequest.php`, `InquiryController.php` |
| **EnsureAdmin**        | Cek `$request->user()?->is_admin`, abort 403 jika false                                               | `EnsureAdmin.php`                                  |
| **Double-check Admin** | `UpdateInquiryRequest::authorize()` juga cek `is_admin === true`                                      | `UpdateInquiryRequest.php`                         |
| **Validasi Status**    | `'status' => ['required', 'in:new,contacted,closed']` — hanya 3 nilai yang valid                      | `UpdateInquiryRequest.php`                         |
| **Cookie Encryption**  | Semua cookie dienkripsi kecuali `appearance` dan `sidebar_state`                                      | `bootstrap/app.php`                                |
| **CSRF**               | Otomatis via Inertia middleware + Laravel default                                                     | Inertia middleware                                 |

---

## 2.4 Storage & File Management

| Fitur               | Detail                                                                                                         | File                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Upload Produk**   | `$request->file('image')->store('products', 'public')` → simpan ke `storage/app/public/products/`              | `ProductController.php`                          |
| **Upload Partner**  | `$request->file('logo')->store('partners', 'public')` → `storage/app/public/partners/`                         | `PartnerController.php`                          |
| **Hapus File Lama** | `Storage::disk('public')->delete($oldPath)` dipanggil sebelum simpan file baru (update) dan saat delete record | `ProductController.php`, `PartnerController.php` |
| **Storage Link**    | Perlu `php artisan storage:link` untuk symlink `public/storage → storage/app/public`                           | Artisan command                                  |

---

## 2.5 Laravel Wayfinder (Type-safe Routing)

| Aspek                | Detail                                                                                              | File                       |
| -------------------- | --------------------------------------------------------------------------------------------------- | -------------------------- |
| **Generate**         | `php artisan wayfinder:generate` → buat TypeScript functions di `resources/js/actions/`             | Auto via Vite plugin       |
| **Penggunaan**       | `ProductController.store().url`, `ProductController.destroy(id)` — tidak ada string URL di-hardcode | semua admin pages          |
| **Route Parameters** | Wayfinder resolve parameter otomatis: `update(id)` → `/admin/products/{id}`                         | `PartnerController.ts` dll |
| **Re-generate**      | Otomatis saat `npm run dev` via Vite plugin `@laravel/vite-plugin-wayfinder`                        | `vite.config.ts`           |

---

## 2.6 Inertia v3 Layout System

```
app.tsx:
  'welcome' / 'katalog'  → null (no layout)
  'auth/*'               → AuthLayout
  'settings/*'           → [AdminLayout, SettingsLayout]  ← nested layout
  'dashboard' / 'admin/' → AdminLayout
  default                → AppLayout
```

Layout dipilih berdasarkan nama page tanpa deklarasi ulang di tiap file komponen — fitur Inertia v3.

---

## 2.7 Database Schema Ringkas

```
users         → id, name, email, password, is_admin (bool), 2FA fields
products      → id, name, slug (UNIQUE), category, short_description,
                contents (JSON), price_from, image, sort_order, is_active
inquiries     → id, name, company, email, whatsapp_number,
                estimated_quantity, budget_per_package, needed_date,
                notes, status (new/contacted/closed)
partners      → id, name, sector, logo, sort_order, is_active
sessions      → id, user_id, ip_address, user_agent, payload
```

---

---

# BAGIAN 3 — BANK PERTANYAAN KRITIS & JAWABAN

---

## A. PERTANYAAN BISNIS / UX

---

**Q1: Bagaimana website ini membantu meningkatkan konversi bisnis dibanding sebelum ada website?**

**Jawaban Inti:**
Konversi dari pengunjung biasa ke prospek korporat sekarang terstruktur — form inquiry mengumpulkan 7 data tervalidasi (nama, perusahaan, email, WA, kuantitas, budget, tanggal), admin langsung mendapat email notifikasi, dan semua data tersimpan di database dengan status tracking.

**Bukti di Kode:**
`InquiryController::store()` → `Inquiry::create()` + `Mail::to()->send(new NewInquiryNotification())`. Status tracking di `inquiries.status` (new/contacted/closed) di `AdminInquiryController`.

---

**Q2: Bagaimana UX untuk klien korporat yang ingin memesan dalam jumlah besar?**

**Jawaban Inti:**
Ada halaman Corporate Section khusus dengan form 7 field (estimasi kuantitas, budget per box, tanggal dibutuhkan, catatan khusus), dilengkapi marquee logo partner yang sudah bekerja sama sebagai social proof. Setelah submit, admin mendapat email dan langsung bisa update status di panel admin.

**Bukti di Kode:**
`CorporateSection.tsx` — form lengkap. `StoreInquiryRequest.php` — validasi semua field. `NewInquiryNotification.php` — Mailable untuk notifikasi admin.

---

**Q3: Apakah website ini bisa digunakan di smartphone?**

**Jawaban Inti:**
Ya, fully responsive. Hero Section mengganti 4 foto lingkaran floating menjadi baris horizontal di mobile (`md:hidden`). Semua grid menggunakan breakpoint Tailwind. Admin panel scrollable secara horizontal di tabel jika layar sempit.

**Bukti di Kode:**
`HeroSection.tsx` class `md:hidden` untuk mobile row. Semua `grid-cols-1 ... lg:grid-cols-N` di komponen landing page.

---

## B. PERTANYAAN FRONTEND / PERFORMA

---

**Q4: Kenapa pakai Inertia.js, bukan REST API + React terpisah?**

**Jawaban Inti:**
Inertia mengeliminasi kebutuhan REST API layer, autentikasi token, dan state management terpisah (Redux dll). Data di-pass langsung sebagai props React dari controller Laravel — lebih sedikit kode, lebih cepat dikembangkan, tetap terasa SPA di browser.

**Bukti di Kode:**
`DashboardController::index()` → `Inertia::render('dashboard', ['stats' => ..., 'recent_inquiries' => ...])`. Props langsung diterima di `dashboard.tsx` sebagai `{ stats, recent_inquiries }`.

---

**Q5: Bagaimana efek typewriter di Hero Section bekerja tanpa library eksternal?**

**Jawaban Inti:**
Hook `useRotatingTypewriter` adalah pure React state machine dengan 4 fase (typing, pausing, erasing, switching) yang dijalankan via `setTimeout` berantai. Zero library tambahan, hanya React `useState` + `useEffect`.

**Bukti di Kode:**
`HeroSection.tsx` — fungsi `useRotatingTypewriter()`. State interface: `{ displayText, wordIndex, phase }`.

---

**Q6: Bagaimana mencegah layout shift (CLS) saat kata typewriter berganti?**

**Jawaban Inti:**
Container kata rotating menggunakan teknik "ghost text" — kata terpanjang (`"Pernikahan"`) ditampilkan `invisible` untuk memesan lebar minimum, sedangkan kata aktual di-overlay secara `absolute`. Lebar container tidak pernah berubah.

**Bukti di Kode:**
`HeroSection.tsx`:

```tsx
<span className="invisible select-none whitespace-nowrap">
  {longestWord(ROTATING_WORDS)}  {/* "Pernikahan" */}
</span>
<span className="absolute inset-0">
  {displayText}
</span>
```

---

**Q7: Bagaimana marquee partner bisa berjalan tanpa library dan tanpa jeda/lompatan?**

**Jawaban Inti:**
Array partner diduplikasi dua kali (`[...partners, ...partners]`), animasi CSS `translateX(0 → -50%)` membawa track sepanjang satu set penuh. Saat mencapai -50%, reset ke 0 secara seamless karena konten identik. Edge fade via CSS `mask-image`.

**Bukti di Kode:**
`CorporateSection.tsx` — `[...partners, ...partners].map(...)`. `app.css` — `@keyframes marquee { from: 0; to: -50% }`.

---

**Q8: Apakah ada dukungan aksesibilitas untuk pengguna yang sensitif terhadap animasi?**

**Jawaban Inti:**
Ada dua lapisan: `MotionConfig reducedMotion="user"` di `welcome.tsx` menonaktifkan semua animasi Motion.js secara otomatis, dan `window.matchMedia('(prefers-reduced-motion: reduce)')` di hook typewriter menampilkan kata pertama secara statis. CSS marquee juga di-pause via `@media (prefers-reduced-motion: reduce)`.

**Bukti di Kode:**
`welcome.tsx` — `<MotionConfig reducedMotion="user">`. `HeroSection.tsx` — `const prefersReduced = window.matchMedia(...)`. `app.css` — `@media (prefers-reduced-motion: reduce) { .animate-marquee { animation-play-state: paused } }`.

---

## C. PERTANYAAN BACKEND / KEAMANAN

---

**Q9: Bagaimana mencegah spam di form inquiry?**

**Jawaban Inti:**
Dua mekanisme berlapis: (1) `throttle:5,1` membatasi 5 request per menit per IP di level routing, (2) honeypot field `website` yang invisible di HTML tapi jika diisi bot langsung ditolak via rule `prohibited`. Bot yang mengisi form otomatis tidak bisa lolos.

**Bukti di Kode:**
`routes/web.php` — `->middleware('throttle:5,1')`. `StoreInquiryRequest.php` — `'website' => ['nullable', 'prohibited']`. `InquiryController.php` — `$request->safe()->except(['website'])`.

---

**Q10: Bagaimana memastikan hanya admin yang bisa akses panel admin, bukan user biasa yang sudah login?**

**Jawaban Inti:**
Tiga lapisan: (1) `auth` — harus login, (2) `verified` — email harus terverifikasi, (3) `EnsureAdmin` middleware mengecek `is_admin === true` di tabel users. Jika user biasa mencoba akses `/admin/*`, langsung mendapat HTTP 403.

**Bukti di Kode:**
`EnsureAdmin.php` — `if (!$request->user()?->is_admin) abort(403, ...)`. `routes/web.php` — `->middleware(['auth', 'verified'])->prefix('admin')->middleware('admin')`. `bootstrap/app.php` — `$middleware->alias(['admin' => EnsureAdmin::class])`.

---

**Q11: Bagaimana manajemen file gambar produk dan partner?**

**Jawaban Inti:**
File disimpan di `storage/app/public/products/` dan `partners/` via `Storage::disk('public')`. URL diakses via storage symlink (`php artisan storage:link`). Saat gambar diganti atau record dihapus, file lama otomatis dihapus untuk mencegah akumulasi file orphan.

**Bukti di Kode:**
`ProductController::update()` — `if ($request->hasFile('image')) { Storage::disk('public')->delete($product->image); $data['image'] = $request->file('image')->store(...) }`. `destroy()` — `Storage::disk('public')->delete($product->image)`.

---

**Q12: Bagaimana type-safety antara route PHP dan kode TypeScript di frontend?**

**Jawaban Inti:**
Laravel Wayfinder otomatis menggenerate TypeScript function untuk setiap route saat `npm run dev`. Tidak ada URL string yang di-hardcode di frontend — jika route di PHP berubah, TypeScript akan error saat build, bukan saat runtime.

**Bukti di Kode:**
`resources/js/actions/App/Http/Controllers/Admin/ProductController.ts` — digenerate otomatis. Penggunaan: `router.post(ProductController.store().url, payload)`. Config: `vite.config.ts` — `wayfinder({ formVariants: true })`.

---

**Q13: Bagaimana data partner yang diupload admin bisa muncul di halaman publik?**

**Jawaban Inti:**
`CatalogController::index()` mengambil `Partner::active()` (is_active=true, ordered by sort_order) dan mengirimkannya sebagai props Inertia ke `welcome.tsx`, yang kemudian pass ke `CorporateSection.tsx` sebagai prop `partners`. Tidak ada API call tambahan.

**Bukti di Kode:**
`CatalogController::index()` — `Partner::query()->active()->get()->map(...)` di-merge ke props `Inertia::render('welcome', ...)`. `welcome.tsx` — `<CorporateSection partners={partners} />`. `CorporateSection.tsx` — render marquee jika `partners.length > 0`.

---

**Q14: Apakah ada static analysis atau linting untuk menjaga kualitas kode?**

**Jawaban Inti:**
Ada tiga alat: Laravel Pint untuk auto-format PHP sesuai PSR-12, Larastan (PHPStan level 7) untuk static analysis tipe PHP termasuk generics Eloquent, dan `vp check` (Vite-Plus) untuk TypeScript dan ESLint pada sisi frontend. Semua dijalankan sebelum commit.

**Bukti di Kode:**
`phpstan.neon` — `level: 7`. `vite.config.ts` — blok `lint` config. `vendor/bin/pint --dirty --format agent` — command yang dijalankan rutin.

---

**Q15: Bagaimana arsitektur routing page admin bisa menggunakan layout berbeda tanpa deklarasi di tiap file?**

**Jawaban Inti:**
Inertia v3 mendukung layout inference berbasis nama halaman di `createInertiaApp`. Satu switch-case di `app.tsx` menentukan layout untuk semua route — `dashboard` dan `admin/*` pakai `AdminLayout`, `settings/*` pakai `[AdminLayout, SettingsLayout]` sebagai nested layout, tanpa perlu menulis `Page.layout = AdminLayout` di tiap file.

**Bukti di Kode:**
`resources/js/app.tsx` — `layout: (name) => { switch(true) { case name.startsWith('admin/'): return AdminLayout; ... } }`. Halaman admin seperti `ProductsIndex.layout = undefined` — tidak perlu deklarasi layout.

---

# RINGKASAN CEPAT — UNTUK PEMBUKA PRESENTASI

> Bacakan ini di 30 detik pertama sebelum masuk slide:

**"Galuh & Co. adalah platform hampers premium full-stack yang menggabungkan pengalaman belanja publik yang elegan dengan sistem manajemen internal yang lengkap. Dibangun dengan Laravel 13, React 19, dan Inertia v3 — tiga komponen utama: landing page dengan 11 section responsif, form inquiry korporat dengan keamanan berlapis, dan panel admin untuk mengelola produk, inquiry, dan partner. Mari kita mulai."**

---

_File ini dibuat otomatis dari analisis codebase proyek Galuh & Co._
_Versi: 1.0 — Tanggal: Sesuai tanggal presentasi_
