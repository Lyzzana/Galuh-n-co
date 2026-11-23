import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import {
    CheckIcon,
    EyeIcon,
    GiftIcon,
    MessageCircleIcon,
    XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';

interface CatalogSectionProps {
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

export default function CatalogSection({
    products = [],
    categories: serverCategories = [],
}: CatalogSectionProps) {
    const items = products;

    // Kategori dinamis dari data produk yang diterima & backend categories
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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    // Kunci scroll body ketika modal terbuka
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

    // Filter produk (case-insensitive) dan batasi maksimal 8 produk unggulan
    const filteredProducts =
        activeCategory === 'Semua'
            ? items
            : items.filter(
                  (p) =>
                      p.category?.toLowerCase() ===
                      activeCategory.toLowerCase(),
              );

    const displayedProducts = filteredProducts.slice(0, 8);

    return (
        <section
            id="koleksi"
            className="scroll-mt-20 bg-[#FAF7F2] py-20 md:py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                {/* ── Tingkat 1: Header & Filter Kategori Dinamis ────────────── */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                        Koleksi Eksklusif
                    </span>
                    <h2 className="mt-3 font-serif text-3xl leading-tight font-normal text-[#2C1E16] sm:text-4xl lg:text-5xl">
                        Kurasi Hampers untuk Setiap Momen
                    </h2>
                    <p className="mt-4 font-sans text-sm font-light text-[#6B5E55] sm:text-base">
                        Setiap koleksi dirangkai dengan harmoni rasa, aroma, dan
                        estetika visual untuk menyampaikan apresiasi tertinggi.
                    </p>

                    {/* Filter Tab Kategori Dinamis (Hanya tampil jika ada kategori) */}
                    {categories.length > 1 && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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

                {/* ── Tingkat 2: Grid Kartu Produk atau Empty State ─────────── */}
                {items.length === 0 ? (
                    /* Empty State: Belum ada produk di database */
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
                        <h3 className="mt-6 font-serif text-2xl font-normal text-[#2C1E16]">
                            Koleksi Sedang Dipersiapkan
                        </h3>
                        <p className="mt-3 font-sans text-sm leading-relaxed text-[#6B5E55]">
                            Koleksi hampers sedang dipersiapkan. Hubungi
                            concierge kami via WhatsApp untuk katalog terbaru.
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
                    /* Empty State: Kategori filter tidak memiliki produk */
                    <div className="mx-auto mt-14 max-w-md py-12 text-center">
                        <p className="font-sans text-sm text-[#6B5E55]">
                            Tidak ada produk dalam kategori &ldquo;
                            {activeCategory}&rdquo;.
                        </p>
                        <button
                            type="button"
                            onClick={() => setActiveCategory('Semua')}
                            className="mt-3 font-sans text-xs font-medium text-[#C5A059] underline underline-offset-4 hover:text-[#163828]"
                        >
                            Lihat semua koleksi
                        </button>
                    </div>
                ) : (
                    /* Grid Kartu Produk Asli Database (Maksimal 8) */
                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <AnimatePresence mode="popLayout">
                            {displayedProducts.map((product) => {
                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.42,
                                            ease: [0.16, 1, 0.3, 1] as const,
                                        }}
                                        viewport={{ once: true }}
                                        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#C5A059]/25 bg-white shadow-[0_2px_12px_rgba(44,30,22,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C5A059]/55 hover:shadow-[0_12px_40px_rgba(44,30,22,0.14),inset_0_0_0_1px_rgba(197,160,89,0.18)]"
                                    >
                                        {/* Foto Produk atau Placeholder Elegan */}
                                        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                    decoding="async"
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
                                            {/* Inner hairline ring — kesan bingkai kemasan */}
                                            <div
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-[6px] rounded-[6px] ring-1 ring-[#C5A059]/20 transition-all duration-300 ring-inset group-hover:ring-[#C5A059]/38"
                                            />
                                            <span className="absolute top-3 left-3 rounded-full border border-[#C5A059]/35 bg-[#FAF7F2]/90 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-[#163828] uppercase backdrop-blur-xs">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Informasi Produk */}
                                        <div className="flex flex-1 flex-col justify-between p-5">
                                            <div>
                                                <h3 className="line-clamp-1 font-serif text-lg font-medium text-[#2C1E16]">
                                                    {product.name}
                                                </h3>
                                                <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-relaxed font-light text-[#6B5E55]">
                                                    {product.short_description}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                {/* Harga Mulai */}
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

                                                {/* Baris Dua Tombol Aksi */}
                                                <div className="mt-4 flex items-center gap-2 border-t border-[#E5DEC9]/60 pt-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedProduct(
                                                                product,
                                                            )
                                                        }
                                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#C5A059] bg-transparent py-2 font-sans text-xs font-medium text-[#163828] transition-colors hover:bg-[#C5A059]/10"
                                                    >
                                                        <EyeIcon className="size-3.5 text-[#C5A059]" />
                                                        Detail
                                                    </button>
                                                    <a
                                                        href={buildWhatsAppUrl(
                                                            product.name,
                                                        )}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Pesan ${product.name} via WhatsApp`}
                                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#163828] py-2 font-sans text-xs font-semibold text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                                                    >
                                                        <MessageCircleIcon className="size-3.5 text-[#C5A059]" />
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

                {/* ── Tingkat 3: Tombol Menuju Halaman Katalog Lengkap ────────── */}
                {items.length > 0 && (
                    <div className="mt-14 text-center">
                        <Link
                            href="/katalog"
                            className="inline-flex items-center gap-2 rounded-full border border-[#C5A059] bg-transparent px-8 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#163828] uppercase transition-all duration-300 hover:bg-[#163828] hover:text-[#FAF7F2] hover:shadow-md"
                        >
                            <span>Lihat Katalog Lengkap</span>
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* ── Pop-up Modal Detail Produk (Warm Ivory & Emerald) ──────────── */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop Gelap Transparan */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setSelectedProduct(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        {/* Modal Dialog Card */}
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
                            {/* Tombol Tutup X */}
                            <button
                                type="button"
                                aria-label="Tutup detail produk"
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#2C1E16] shadow-xs transition-colors hover:bg-white hover:text-[#163828]"
                            >
                                <XIcon className="size-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Sisi Kiri (Atas di mobile): Visual Hampers Besar */}
                                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#FAF7F2] md:aspect-auto md:h-full">
                                    {selectedProduct.image_url ? (
                                        <img
                                            src={selectedProduct.image_url}
                                            alt={selectedProduct.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                            decoding="async"
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

                                {/* Sisi Kanan: Detail & Daftar Isi Hampers */}
                                <div className="no-scrollbar flex max-h-[75vh] flex-col justify-between overflow-y-auto p-6 md:max-h-[580px] md:p-8">
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
                                            {selectedProduct.short_description}
                                        </p>

                                        {/* Daftar Lengkap Isi Hampers */}
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
                                                        Detail isi paket dapat
                                                        dikustomisasi sesuai
                                                        permintaan.
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Tombol CTA Pesan via WhatsApp */}
                                    <div className="mt-8 border-t border-[#E5DEC9] pt-4">
                                        <a
                                            href={buildWhatsAppUrl(
                                                selectedProduct.name,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#163828] py-3.5 font-sans text-xs font-semibold tracking-wide text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                                        >
                                            <MessageCircleIcon className="size-4 text-[#C5A059]" />
                                            Pesan via WhatsApp
                                        </a>
                                        <p className="mt-2 text-center font-sans text-[11px] text-[#6B5E55]">
                                            Konsultasi personal &amp;
                                            kustomisasi kartu ucapan gratis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
