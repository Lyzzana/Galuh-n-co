import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import {
    ArrowLeftIcon,
    CheckIcon,
    EyeIcon,
    GiftIcon,
    MessageCircleIcon,
    SearchIcon,
    XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import FooterSection from '@/components/landing/FooterSection';
import type { Product } from '@/types/product';

export interface KatalogPageProps {
    products?: Product[];
    categories?: string[];
}

const WA_PHONE = '6281779839434';

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
}

function buildWhatsAppUrl(productName: string): string {
    const text = `Halo Galuh & Co., saya tertarik untuk memesan paket hampers "${productName}". Mohon informasi ketersediaan dan detail pemesanannya.`;
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

export default function KatalogPage({
    products = [],
    categories: serverCategories = [],
}: KatalogPageProps) {
    const items = products;

    const categories = [
        'Semua',
        ...Array.from(
            new Set(
                [...serverCategories, ...items.map((p) => p.category)].filter(
                    Boolean,
                ),
            ),
        ),
    ];

    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    // Kunci scroll body saat modal terbuka
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedProduct(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedProduct]);

    // Filter produk berdasarkan kategori dan pencarian nama/deskripsi
    const filteredProducts = items.filter((product) => {
        const matchesCategory =
            activeCategory === 'Semua' ||
            product.category?.toLowerCase() === activeCategory.toLowerCase();

        const matchesSearch =
            searchQuery.trim() === '' ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.short_description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <MotionConfig reducedMotion="user">
            <Head>
                <title>Seluruh Koleksi Hampers Mewah — Galuh &amp; Co.</title>
                <meta
                    name="description"
                    content="Katalog lengkap hampers mewah, souvenir korporat, dan bingkisan istimewa Galuh & Co. Temukan kurasi elegan untuk setiap momen berharga."
                />
            </Head>

            <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#2C1E16] antialiased selection:bg-[#C5A059]/25 selection:text-[#122E21]">
                {/* ── Top Header Bar ────────────────────────────────────────────── */}
                <header className="sticky top-0 z-40 border-b border-[#E5DEC9] bg-[#FAF7F2]/90 backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wider text-[#163828] uppercase transition-colors hover:text-[#C5A059]"
                        >
                            <ArrowLeftIcon className="size-4" />
                            <span>Kembali ke Beranda</span>
                        </Link>

                        <Link
                            href="/"
                            className="font-serif text-lg font-bold tracking-[0.2em] text-[#163828] sm:text-xl"
                        >
                            GALUH &amp; CO.
                        </Link>

                        <a
                            href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                                'Halo Galuh & Co., saya ingin konsultasi katalog hampers.',
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden rounded-full bg-[#163828] px-5 py-2 font-sans text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#122E21] sm:inline-flex"
                        >
                            Konsultasi WhatsApp
                        </a>
                    </div>
                </header>

                {/* ── Main Catalog Content ──────────────────────────────────────── */}
                <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
                    {/* Header Halaman */}
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                            Katalog Lengkap
                        </span>
                        <h1 className="mt-3 font-serif text-3xl leading-tight font-normal text-[#163828] sm:text-4xl lg:text-5xl">
                            Seluruh Koleksi Hampers
                        </h1>
                        <p className="mt-4 font-sans text-sm font-light text-[#6B5E55] sm:text-base">
                            Jelajahi setiap bingkisan mewah yang dirancang
                            dengan keanggunan, rasa kurasi artisan, dan sentuhan
                            personal tanpa batas.
                        </p>

                        {/* Search Bar Input (Hanya tampil jika ada produk) */}
                        {items.length > 0 && (
                            <div className="relative mx-auto mt-8 max-w-md">
                                <SearchIcon className="absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#C5A059]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Cari nama hampers atau isi paket..."
                                    className="w-full rounded-full border border-[#E5DEC9] bg-white py-3 pr-10 pl-11 font-sans text-sm text-[#2C1E16] shadow-2xs transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        aria-label="Hapus kata kunci pencarian"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#6B5E55] hover:text-[#2C1E16]"
                                    >
                                        <XIcon className="size-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Filter Kategori Dinamis */}
                        {categories.length > 1 && (
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                {categories.map((category) => {
                                    const isActive =
                                        activeCategory.toLowerCase() ===
                                        category.toLowerCase();
                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() =>
                                                setActiveCategory(category)
                                            }
                                            className={`rounded-full px-5 py-2 font-sans text-xs font-medium tracking-wide transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-[#163828] text-[#FAF7F2] shadow-sm'
                                                    : 'border border-[#E5DEC9] bg-white/80 text-[#6B5E55] hover:border-[#C5A059] hover:text-[#163828]'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Informasi Total Produk yang Tampil */}
                    {items.length > 0 && (
                        <div className="mt-10 flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3 text-xs text-[#6B5E55]">
                            <span>
                                Menampilkan{' '}
                                <strong className="text-[#163828]">
                                    {filteredProducts.length}
                                </strong>{' '}
                                koleksi hampers
                            </span>
                            {searchQuery && (
                                <span className="italic">
                                    Hasil pencarian untuk: &ldquo;{searchQuery}
                                    &rdquo;
                                </span>
                            )}
                        </div>
                    )}

                    {/* Empty State: Database belum memiliki produk */}
                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1] as const,
                            }}
                            className="mx-auto mt-14 max-w-xl rounded-3xl border border-[#C5A059]/35 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm sm:p-12"
                        >
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#122E21] text-[#C5A059] shadow-inner">
                                <GiftIcon className="size-8 text-[#C5A059]" />
                            </div>
                            <h2 className="mt-6 font-serif text-2xl font-normal text-[#2C1E16]">
                                Koleksi Sedang Dipersiapkan
                            </h2>
                            <p className="mt-3 font-sans text-sm leading-relaxed text-[#6B5E55]">
                                Koleksi hampers sedang dipersiapkan. Hubungi
                                concierge kami via WhatsApp untuk katalog
                                terbaru.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <a
                                    href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                                        'Halo Galuh & Co., saya tertarik untuk melihat katalog hampers terbaru.',
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#163828] px-6 py-3 font-sans text-xs font-semibold tracking-wide text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                                >
                                    <MessageCircleIcon className="size-4 text-[#C5A059]" />
                                    Hubungi Concierge via WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    ) : filteredProducts.length === 0 ? (
                        /* Empty State: Pencarian / Filter tidak menemukan produk */
                        <div className="py-20 text-center">
                            <p className="font-serif text-xl text-[#2C1E16]">
                                Koleksi Tidak Ditemukan
                            </p>
                            <p className="mt-2 font-sans text-sm text-[#6B5E55]">
                                Coba gunakan kata kunci pencarian lain atau
                                pilih kategori &ldquo;Semua&rdquo;.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('Semua');
                                }}
                                className="mt-6 inline-flex rounded-full bg-[#163828] px-6 py-2.5 font-sans text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        /* Grid Seluruh Produk Asli Database */
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product) => {
                                    return (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                ease: [
                                                    0.16, 1, 0.3, 1,
                                                ] as const,
                                            }}
                                            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#C5A059]/25 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/60 hover:shadow-lg"
                                        >
                                            {/* Foto Produk atau Placeholder Elegan */}
                                            <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                                                        <div className="flex size-14 items-center justify-center rounded-full bg-[#122E21] text-[#C5A059] shadow-sm">
                                                            <GiftIcon className="size-7 text-[#C5A059]" />
                                                        </div>
                                                        <span className="mt-3 font-serif text-xs font-medium text-[#2C1E16]">
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="absolute top-3 left-3 rounded-full border border-[#C5A059]/35 bg-[#FAF7F2]/90 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-[#163828] uppercase backdrop-blur-xs">
                                                    {product.category}
                                                </span>
                                            </div>

                                            {/* Deskripsi & Harga */}
                                            <div className="flex flex-1 flex-col justify-between p-5">
                                                <div>
                                                    <h3 className="line-clamp-1 font-serif text-lg font-medium text-[#2C1E16]">
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-relaxed font-light text-[#6B5E55]">
                                                        {
                                                            product.short_description
                                                        }
                                                    </p>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="font-sans text-[11px] font-medium text-[#6B5E55]">
                                                            Mulai
                                                        </span>
                                                        <span className="font-serif text-base font-semibold text-[#163828]">
                                                            {formatRupiah(
                                                                product.price_from,
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-2 border-t border-[#E5DEC9]/60 pt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setSelectedProduct(
                                                                    product,
                                                                )
                                                            }
                                                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#C5A059]/60 bg-white py-2 text-center font-sans text-xs font-medium text-[#2C1E16] transition-colors hover:border-[#C5A059] hover:bg-[#FAF7F2]"
                                                        >
                                                            <EyeIcon className="size-3.5 text-[#C5A059]" />
                                                            Detail Isi
                                                        </button>

                                                        <a
                                                            href={buildWhatsAppUrl(
                                                                product.name,
                                                            )}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#163828] py-2 text-center font-sans text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                                                        >
                                                            <MessageCircleIcon className="size-3.5" />
                                                            Pesan
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </main>

                {/* ── Pop-up Modal Detail Produk ───────────────────────────────── */}
                <AnimatePresence>
                    {selectedProduct && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => setSelectedProduct(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.16, 1, 0.3, 1] as const,
                                }}
                                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#C5A059]/40 bg-[#FAF7F2] shadow-2xl"
                            >
                                <button
                                    type="button"
                                    aria-label="Tutup detail produk"
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#2C1E16] shadow-xs transition-colors hover:bg-white hover:text-[#163828]"
                                >
                                    <XIcon className="size-5" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#FAF7F2] md:aspect-auto md:h-full">
                                        {selectedProduct.image_url ? (
                                            <img
                                                src={selectedProduct.image_url}
                                                alt={selectedProduct.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                                <div className="flex size-20 items-center justify-center rounded-full bg-[#122E21] text-[#C5A059]">
                                                    <GiftIcon className="size-10 text-[#C5A059]" />
                                                </div>
                                                <span className="mt-3 font-serif text-sm font-medium text-[#2C1E16]">
                                                    {selectedProduct.name}
                                                </span>
                                            </div>
                                        )}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden" />
                                    </div>

                                    <div className="flex max-h-[75vh] flex-col justify-between overflow-y-auto p-6 md:max-h-[580px] md:p-8">
                                        <div>
                                            <span className="inline-block rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-1 font-sans text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase">
                                                {selectedProduct.category}
                                            </span>

                                            <h3 className="mt-2.5 font-serif text-2xl font-normal text-[#163828] md:text-3xl">
                                                {selectedProduct.name}
                                            </h3>

                                            <p className="mt-2 font-serif text-lg font-semibold text-[#C5A059]">
                                                {formatRupiah(
                                                    selectedProduct.price_from,
                                                )}
                                            </p>

                                            <p className="mt-3 font-sans text-xs leading-relaxed font-light text-[#6B5E55] sm:text-sm">
                                                {
                                                    selectedProduct.short_description
                                                }
                                            </p>

                                            <div className="mt-6 border-t border-[#E5DEC9] pt-5">
                                                <h4 className="font-sans text-xs font-semibold tracking-wider text-[#2C1E16] uppercase">
                                                    Daftar Isi Paket:
                                                </h4>
                                                <ul className="mt-3 space-y-2">
                                                    {selectedProduct.contents &&
                                                    selectedProduct.contents
                                                        .length > 0 ? (
                                                        selectedProduct.contents.map(
                                                            (item, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-start gap-2.5 font-sans text-xs text-[#2C1E16] sm:text-sm"
                                                                >
                                                                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-[#C5A059]" />
                                                                    <span className="font-light">
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )
                                                    ) : (
                                                        <li className="font-sans text-xs text-[#6B5E55] italic">
                                                            Detail isi paket
                                                            dapat dikustomisasi
                                                            sesuai permintaan.
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-8 border-t border-[#E5DEC9] pt-4">
                                            <a
                                                href={buildWhatsAppUrl(
                                                    selectedProduct.name,
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#163828] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#FAF7F2] shadow-md transition-colors hover:bg-[#122E21]"
                                            >
                                                <MessageCircleIcon className="size-4 text-[#C5A059]" />
                                                Pesan Paket Ini via WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* ── Footer & Floating WhatsApp ────────────────────────────────── */}
                <FooterSection />
                <FloatingWhatsApp />
            </div>
        </MotionConfig>
    );
}
