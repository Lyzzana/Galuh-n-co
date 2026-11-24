import { Head, Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import {
    ArrowLeftIcon,
    CheckIcon,
    EyeIcon,
    GiftIcon,
    MinusIcon,
    PlusIcon,
    SearchIcon,
    ShoppingBagIcon,
    SparklesIcon,
    StarIcon,
    UserIcon,
    XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AccountController from '@/actions/App/Http/Controllers/AccountController';
import B2BCustomizerController from '@/actions/App/Http/Controllers/B2BCustomizerController';
import CartController from '@/actions/App/Http/Controllers/CartController';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import FooterSection from '@/components/landing/FooterSection';
import { home, login } from '@/routes';
import type { SharedPageProps } from '@/types';
import type { Product } from '@/types/product';

export interface KatalogPageProps {
    products?: Product[];
    categories?: string[];
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
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
                [
                    ...serverCategories,
                    ...items.map((p) => p.category),
                    ...items.map((p) => p.event_category),
                ].filter(Boolean),
            ),
        ),
    ];

    const seasons = [
        'Semua',
        ...Array.from(
            new Set(
                items
                    .map((p) => p.season_tag)
                    .filter((s): s is string => Boolean(s && s.trim() !== '')),
            ),
        ),
    ];

    const { auth, cartCount } = usePage<SharedPageProps>().props;
    const user = auth?.user ?? null;

    const [activeCategory, setActiveCategory] = useState('Semua');
    const [activeSeason, setActiveSeason] = useState('Semua');
    const [onlyBestSeller, setOnlyBestSeller] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [modalQuantity, setModalQuantity] = useState(1);
    const [addingProductId, setAddingProductId] = useState<number | null>(null);

    const openDetailModal = (product: Product) => {
        setModalQuantity(1);
        setSelectedProduct(product);
    };

    const handleAddToCart = (
        product: Product,
        quantity: number,
        closeOnSuccess = false,
    ) => {
        if (!user) {
            toast.info(
                'Silakan masuk terlebih dahulu untuk menambahkan ke keranjang.',
            );
            router.visit(login().url);
            return;
        }

        setAddingProductId(product.id);
        router.post(
            CartController.store().url,
            {
                product_id: product.id,
                quantity,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        `${quantity}× ${product.name} ditambahkan ke keranjang.`,
                    );
                    if (closeOnSuccess) {
                        setSelectedProduct(null);
                    }
                },
                onError: () => {
                    toast.error('Gagal menambahkan produk ke keranjang.');
                },
                onFinish: () => {
                    setAddingProductId(null);
                },
            },
        );
    };

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

    // Filter produk berdasarkan kategori/event, best-seller/season, dan pencarian
    const filteredProducts = items.filter((product) => {
        const matchesCategory =
            activeCategory === 'Semua' ||
            product.category?.toLowerCase() === activeCategory.toLowerCase() ||
            product.event_category?.toLowerCase() ===
                activeCategory.toLowerCase();

        const matchesBestSeller =
            !onlyBestSeller || Boolean(product.is_best_seller);

        const matchesSeason =
            activeSeason === 'Semua' ||
            (product.season_tag ?? '').toLowerCase() ===
                activeSeason.toLowerCase();

        const matchesSearch =
            searchQuery.trim() === '' ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.short_description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return (
            matchesCategory &&
            matchesBestSeller &&
            matchesSeason &&
            matchesSearch
        );
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

            <div className="min-h-screen bg-[#F2EBDC] font-sans text-[#16233B] antialiased selection:bg-[#A88B54]/25 selection:text-[#16233B]">
                {/* ── Top Header Bar ────────────────────────────────────────────── */}
                <header className="sticky top-0 z-40 border-b border-[#A88B54]/30 bg-[#16233B]/95 backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wider text-[#F2EBDC] uppercase transition-colors hover:text-[#A88B54]"
                        >
                            <ArrowLeftIcon className="size-4" />
                            <span>Kembali ke Beranda</span>
                        </Link>

                        <Link
                            href="/"
                            aria-label="Galuh & Co. Beranda"
                            className="flex items-center transition-opacity hover:opacity-90"
                        >
                            <img
                                src="/asset/logo/Logo_galu&co.png"
                                alt="Galuh & Co."
                                className="h-8 w-auto object-contain sm:h-9"
                            />
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href={B2BCustomizerController.index()}
                                className="hidden items-center gap-1.5 rounded-full border border-[#A88B54]/45 bg-[#A88B54]/15 px-3.5 py-2 font-sans text-xs font-semibold text-[#F2EBDC] transition-colors hover:bg-[#A88B54]/25 md:inline-flex"
                            >
                                <SparklesIcon className="size-3.5 text-[#A88B54]" />
                                <span>3D Customizer</span>
                            </Link>

                            <Link
                                href={user ? CartController.index() : login()}
                                className="relative inline-flex items-center gap-1.5 rounded-full bg-[#F2EBDC] px-4 py-2 font-sans text-xs font-semibold text-[#16233B] transition-colors hover:bg-white"
                            >
                                <ShoppingBagIcon className="size-3.5" />
                                <span className="hidden sm:inline">
                                    Keranjang
                                </span>
                                {cartCount > 0 && (
                                    <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#16233B] px-1 text-[10px] font-bold text-[#F2EBDC]">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                href={
                                    user ? AccountController.index() : login()
                                }
                                className="inline-flex items-center gap-1.5 rounded-full border border-[#A88B54]/40 px-3.5 py-2 font-sans text-xs font-medium text-[#F2EBDC] transition-colors hover:bg-[#F2EBDC]/10"
                            >
                                <UserIcon className="size-3.5 text-[#A88B54]" />
                                <span className="hidden sm:inline">
                                    {user ? 'Akun' : 'Masuk'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ── Main Catalog Content ──────────────────────────────────────── */}
                <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
                    {/* Header Halaman */}
                    <div className="relative mx-auto max-w-2xl text-center">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-10 left-1/2 h-56 w-80 -translate-x-1/2 rounded-full blur-2xl"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                            }}
                        />
                        <span className="relative font-sans text-xs font-semibold tracking-[0.24em] text-[#6E675D] uppercase">
                            Katalog Lengkap
                        </span>
                        <h1 className="relative mt-3 font-serif text-3xl leading-tight font-normal tracking-normal text-[#16233B] sm:text-4xl lg:text-5xl">
                            Seluruh Koleksi Hampers
                        </h1>
                        <p className="relative mt-4 font-sans text-sm font-normal text-[#6E675D] sm:text-base">
                            Jelajahi setiap bingkisan mewah yang dirancang
                            dengan keanggunan, rasa kurasi artisan, dan sentuhan
                            personal tanpa batas.
                        </p>

                        {/* Search Bar Input (Hanya tampil jika ada produk) */}
                        {items.length > 0 && (
                            <div className="relative mx-auto mt-8 max-w-md">
                                <SearchIcon className="absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#A88B54]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Cari nama hampers atau isi paket..."
                                    className="w-full rounded-full border border-[#A88B54]/30 bg-[#FAF7F0] py-3 pr-10 pl-11 font-sans text-sm text-[#16233B] shadow-[0_4px_14px_-4px_rgba(22,35,59,0.08)] transition-all outline-none placeholder:text-[#6E675D] focus:border-[#16233B] focus:bg-white focus:ring-1 focus:ring-[#16233B]"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        aria-label="Hapus kata kunci pencarian"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#6E675D] hover:text-[#16233B]"
                                    >
                                        <XIcon className="size-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Filter Kategori / Event Dinamis */}
                        {categories.length > 1 && (
                            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
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
                                                    ? 'bg-[#16233B] text-[#F2EBDC] shadow-sm'
                                                    : 'border border-[#A88B54]/30 bg-[#FAF7F0] text-[#6E675D] shadow-[0_2px_8px_-2px_rgba(22,35,59,0.06)] hover:border-[#16233B] hover:text-[#16233B]'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Filter Best Selling per Season */}
                        {items.length > 0 && (
                            <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOnlyBestSeller((prev) => !prev)
                                    }
                                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 ${
                                        onlyBestSeller
                                            ? 'bg-[#16233B] text-[#F2EBDC] shadow-sm'
                                            : 'border border-[#A88B54]/30 bg-[#FAF7F0] text-[#16233B] hover:border-[#16233B]'
                                    }`}
                                >
                                    <StarIcon
                                        className={`size-3.5 ${
                                            onlyBestSeller
                                                ? 'fill-[#A88B54] text-[#A88B54]'
                                                : 'text-[#A88B54]'
                                        }`}
                                    />
                                    Best Seller
                                </button>

                                {seasons.length > 1 &&
                                    seasons.map((season) => {
                                        const isSeasonActive =
                                            activeSeason.toLowerCase() ===
                                            season.toLowerCase();
                                        return (
                                            <button
                                                key={season}
                                                type="button"
                                                onClick={() =>
                                                    setActiveSeason(season)
                                                }
                                                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-300 ${
                                                    isSeasonActive
                                                        ? 'bg-[#1E2F4D] text-[#F2EBDC] shadow-xs'
                                                        : 'border border-[#A88B54]/25 bg-[#FAF7F0] text-[#6E675D] hover:border-[#16233B] hover:text-[#16233B]'
                                                }`}
                                            >
                                                {season !== 'Semua' && (
                                                    <SparklesIcon className="size-3 text-[#A88B54]" />
                                                )}
                                                {season === 'Semua'
                                                    ? 'Semua Season'
                                                    : season}
                                            </button>
                                        );
                                    })}
                            </div>
                        )}
                    </div>

                    {/* Informasi Total Produk yang Tampil */}
                    {items.length > 0 && (
                        <div className="mt-10 flex items-center justify-between border-b border-[#A88B54]/25 pb-3 text-xs text-[#6E675D]">
                            <span>
                                Menampilkan{' '}
                                <strong className="text-[#16233B]">
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
                            className="mx-auto mt-14 max-w-xl rounded-3xl border border-[#A88B54]/25 bg-[#FAF7F0] p-8 text-center shadow-[0_12px_32px_-12px_rgba(22,35,59,0.10)] sm:p-12"
                        >
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#16233B] text-[#A88B54] shadow-inner">
                                <GiftIcon className="size-8 text-[#A88B54]" />
                            </div>
                            <h2 className="mt-6 font-serif text-2xl font-normal text-[#16233B]">
                                Koleksi Sedang Dipersiapkan
                            </h2>
                            <p className="mt-3 font-sans text-sm leading-relaxed text-[#6E675D]">
                                Koleksi hampers eksklusif kami sedang
                                dipersiapkan untuk musim perayaan mendatang.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <Link
                                    href={home()}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#16233B] px-6 py-3 font-sans text-xs font-semibold tracking-wide text-[#F2EBDC] transition-colors hover:bg-[#1F304F]"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </motion.div>
                    ) : filteredProducts.length === 0 ? (
                        /* Empty State: Pencarian / Filter tidak menemukan produk */
                        <div className="py-20 text-center">
                            <p className="font-serif text-xl text-[#16233B]">
                                Koleksi Tidak Ditemukan
                            </p>
                            <p className="mt-2 font-sans text-sm text-[#6E675D]">
                                Coba gunakan kata kunci pencarian lain atau
                                pilih kategori &ldquo;Semua&rdquo;.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('Semua');
                                    setActiveSeason('Semua');
                                    setOnlyBestSeller(false);
                                }}
                                className="mt-6 inline-flex rounded-full bg-[#16233B] px-6 py-2.5 font-sans text-xs font-semibold text-[#F2EBDC] transition-colors hover:bg-[#1F304F]"
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
                                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#A88B54]/25 bg-[#FAF7F0] shadow-[0_12px_32px_-12px_rgba(22,35,59,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A88B54]/60 hover:shadow-[0_18px_38px_-12px_rgba(22,35,59,0.16)]"
                                        >
                                            {/* Foto Produk atau Placeholder Elegan */}
                                            <div className="relative aspect-square w-full overflow-hidden bg-[#16233B]/5">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                                                        <div className="flex size-14 items-center justify-center rounded-full bg-[#16233B] text-[#A88B54] shadow-sm">
                                                            <GiftIcon className="size-7 text-[#A88B54]" />
                                                        </div>
                                                        <span className="mt-3 font-serif text-xs font-semibold text-[#16233B]">
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="absolute top-3 left-3 rounded-full border border-[#A88B54]/45 bg-[#FAF7F0]/95 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-[#16233B] uppercase backdrop-blur-xs">
                                                    {product.category}
                                                </span>
                                                {product.is_best_seller && (
                                                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#16233B] px-2.5 py-0.5 font-sans text-[10px] font-semibold text-[#F2EBDC] shadow-sm">
                                                        <StarIcon className="size-2.5 fill-[#A88B54] text-[#A88B54]" />
                                                        Best Seller
                                                    </span>
                                                )}
                                            </div>

                                            {/* Deskripsi & Harga */}
                                            <div className="flex flex-1 flex-col justify-between p-5">
                                                <div>
                                                    <h3 className="line-clamp-1 font-serif text-lg font-semibold text-[#16233B]">
                                                        {product.name}
                                                    </h3>
                                                    {(product.event_category ||
                                                        product.season_tag) && (
                                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                                            {product.event_category &&
                                                                product.event_category !==
                                                                    'All Occasion' && (
                                                                    <span className="rounded-md bg-[#16233B]/8 px-2 py-0.5 font-sans text-[10px] font-medium text-[#16233B]">
                                                                        {
                                                                            product.event_category
                                                                        }
                                                                    </span>
                                                                )}
                                                            {product.season_tag && (
                                                                <span className="rounded-md border border-[#A88B54]/30 px-2 py-0.5 font-sans text-[10px] font-medium text-[#6E675D]">
                                                                    {
                                                                        product.season_tag
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-relaxed font-normal text-[#6E675D]">
                                                        {
                                                            product.short_description
                                                        }
                                                    </p>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="font-sans text-[11px] font-medium text-[#6E675D]">
                                                            Mulai
                                                        </span>
                                                        <span className="font-serif text-base font-semibold text-[#16233B]">
                                                            {formatRupiah(
                                                                product.price_from,
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-2 border-t border-[#A88B54]/25 pt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDetailModal(
                                                                    product,
                                                                )
                                                            }
                                                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#A88B54] bg-transparent py-2 text-center font-sans text-xs font-medium text-[#16233B] transition-colors hover:bg-[#A88B54]/12"
                                                        >
                                                            <EyeIcon className="size-3.5 text-[#A88B54]" />
                                                            Detail Isi
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                addingProductId ===
                                                                product.id
                                                            }
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    product,
                                                                    1,
                                                                )
                                                            }
                                                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#16233B] py-2 text-center font-sans text-xs font-semibold text-[#F2EBDC] transition-colors hover:bg-[#1F304F] disabled:opacity-60"
                                                        >
                                                            <ShoppingBagIcon className="size-3.5 text-[#A88B54]" />
                                                            {addingProductId ===
                                                            product.id
                                                                ? 'Menambah...'
                                                                : 'Keranjang'}
                                                        </button>
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
                                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#A88B54]/45 bg-[#FAF7F0] shadow-2xl"
                            >
                                <button
                                    type="button"
                                    aria-label="Tutup detail produk"
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-[#FAF7F0]/95 text-[#16233B] shadow-xs transition-colors hover:bg-white"
                                >
                                    <XIcon className="size-5" />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#16233B]/5 md:aspect-auto md:h-full">
                                        {selectedProduct.image_url ? (
                                            <img
                                                src={selectedProduct.image_url}
                                                alt={selectedProduct.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                                <div className="flex size-20 items-center justify-center rounded-full bg-[#16233B] text-[#A88B54]">
                                                    <GiftIcon className="size-10 text-[#A88B54]" />
                                                </div>
                                                <span className="mt-3 font-serif text-sm font-semibold text-[#16233B]">
                                                    {selectedProduct.name}
                                                </span>
                                            </div>
                                        )}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden" />
                                    </div>

                                    <div className="flex max-h-[75vh] flex-col justify-between overflow-y-auto p-6 md:max-h-[580px] md:p-8">
                                        <div>
                                            <span className="inline-block rounded-full border border-[#A88B54]/45 bg-[#A88B54]/15 px-3 py-1 font-sans text-[10px] font-semibold tracking-wider text-[#16233B] uppercase">
                                                {selectedProduct.category}
                                            </span>

                                            <h3 className="mt-2.5 font-serif text-2xl font-normal text-[#16233B] md:text-3xl">
                                                {selectedProduct.name}
                                            </h3>

                                            <p className="mt-2 font-serif text-lg font-semibold text-[#16233B]">
                                                {formatRupiah(
                                                    selectedProduct.price_from,
                                                )}
                                            </p>

                                            <p className="mt-3 font-sans text-xs leading-relaxed font-normal text-[#6E675D] sm:text-sm">
                                                {
                                                    selectedProduct.short_description
                                                }
                                            </p>

                                            <div className="mt-6 border-t border-[#A88B54]/25 pt-5">
                                                <h4 className="font-sans text-xs font-semibold tracking-wider text-[#16233B] uppercase">
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
                                                                    className="flex items-start gap-2.5 font-sans text-xs text-[#16233B] sm:text-sm"
                                                                >
                                                                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-[#A88B54]" />
                                                                    <span className="font-normal">
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )
                                                    ) : (
                                                        <li className="font-sans text-xs text-[#6E675D] italic">
                                                            Detail isi paket
                                                            dapat dikustomisasi
                                                            sesuai permintaan.
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-3 border-t border-[#A88B54]/25 pt-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="font-sans text-xs font-semibold text-[#16233B]">
                                                    Jumlah
                                                </span>
                                                <div className="inline-flex items-center gap-2 rounded-full border border-[#A88B54]/40 bg-white px-2 py-1">
                                                    <button
                                                        type="button"
                                                        aria-label="Kurangi jumlah"
                                                        onClick={() =>
                                                            setModalQuantity(
                                                                (q) =>
                                                                    Math.max(
                                                                        1,
                                                                        q - 1,
                                                                    ),
                                                            )
                                                        }
                                                        className="flex size-7 items-center justify-center rounded-full text-[#16233B] hover:bg-[#F2EBDC]"
                                                    >
                                                        <MinusIcon className="size-3.5" />
                                                    </button>
                                                    <span className="min-w-[28px] text-center font-sans text-xs font-bold text-[#16233B]">
                                                        {modalQuantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label="Tambah jumlah"
                                                        onClick={() =>
                                                            setModalQuantity(
                                                                (q) => q + 1,
                                                            )
                                                        }
                                                        className="flex size-7 items-center justify-center rounded-full text-[#16233B] hover:bg-[#F2EBDC]"
                                                    >
                                                        <PlusIcon className="size-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                disabled={
                                                    addingProductId ===
                                                    selectedProduct.id
                                                }
                                                onClick={() =>
                                                    handleAddToCart(
                                                        selectedProduct,
                                                        modalQuantity,
                                                        true,
                                                    )
                                                }
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16233B] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F2EBDC] shadow-md transition-colors hover:bg-[#1F304F] disabled:opacity-60"
                                            >
                                                <ShoppingBagIcon className="size-4 text-[#A88B54]" />
                                                {addingProductId ===
                                                selectedProduct.id
                                                    ? 'Menambahkan...'
                                                    : `Tambah ke Keranjang (${formatRupiah(selectedProduct.price_from * modalQuantity)})`}
                                            </button>
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
