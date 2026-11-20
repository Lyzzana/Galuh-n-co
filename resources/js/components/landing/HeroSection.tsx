import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { ArrowRightIcon, MessageCircleIcon } from 'lucide-react';
import type { Product } from '@/types/product';

interface HeroSectionProps {
    products?: Product[];
}

const DEFAULT_HERO_PHOTOS = [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?q=80&w=600&auto=format&fit=crop',
];

const CIRCLE_CONFIGS = [
    {
        id: 'top-left',
        positionClass: 'left-2 top-20 lg:left-8 lg:top-20 xl:left-14',
        sizeClass: 'size-32 md:size-40 lg:size-48',
        floatY: -12,
        duration: 5.2,
        delay: 0.2,
    },
    {
        id: 'top-right',
        positionClass: 'right-2 top-24 lg:right-8 lg:top-24 xl:right-14',
        sizeClass: 'size-28 md:size-36 lg:size-44',
        floatY: 10,
        duration: 6,
        delay: 0.35,
    },
    {
        id: 'bottom-left',
        positionClass: 'bottom-8 left-4 lg:bottom-10 lg:left-12 xl:left-20',
        sizeClass: 'size-36 md:size-44 lg:size-52',
        floatY: -10,
        duration: 5.6,
        delay: 0.45,
    },
    {
        id: 'bottom-right',
        positionClass: 'bottom-10 right-4 lg:bottom-12 lg:right-12 xl:right-20',
        sizeClass: 'size-30 md:size-36 lg:size-44',
        floatY: 12,
        duration: 4.8,
        delay: 0.55,
    },
];

const WA_HERO_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function HeroSection({ products = [] }: HeroSectionProps) {
    // Ambil foto produk asli dari database
    const productsWithImages = products.filter(
        (p) => Boolean(p.image_url) && p.image_url !== '',
    );

    // Siapkan 4 visual lingkaran (prioritaskan produk asli database)
    const heroImages = CIRCLE_CONFIGS.map((cfg, index) => {
        const prod = productsWithImages[index];
        const src = prod?.image_url || DEFAULT_HERO_PHOTOS[index];
        const alt =
            prod?.name ||
            'Koleksi hampers mewah Galuh & Co. dengan pita satin emas';
        return {
            ...cfg,
            src,
            alt,
        };
    });

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string,
    ) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#122E21] px-6 pt-28 pb-16 md:pt-36 md:pb-24">
            {/* Latar Belakang Hangat: Ambient Warm Gold & Emerald Radial Glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
                {/* Cahaya hangat utama di bagian tengah atas */}
                <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/12 blur-[130px] sm:h-[650px] sm:w-[650px]" />
                {/* Aksen kilau lembut di sisi kiri */}
                <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
                {/* Aksen kilau lembut di sisi kanan */}
                <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
            </div>

            {/* Orbit Lingkaran Foto Asli Database Bercahaya — Layar Desktop */}
            {heroImages.map((img) => (
                <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, img.floatY, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.7, delay: img.delay },
                        scale: { duration: 0.7, delay: img.delay },
                        y: {
                            duration: img.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    className={`absolute z-10 hidden md:block ${img.positionClass}`}
                >
                    {/* Efek pendaran cahaya lembut (Soft Warm Glow) */}
                    <div className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-[#D4AF37]/20 blur-2xl" />

                    <div
                        className={`relative ${img.sizeClass} overflow-hidden rounded-full border border-[#C5A059]/40 shadow-[0_0_45px_rgba(212,175,55,0.25)] transition-transform duration-500 hover:scale-105`}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full object-cover"
                            loading="eager"
                        />
                    </div>
                </motion.div>
            ))}

            {/* Kontainer Konten Pusat (Z-Index atas, max-w-2xl mx-auto, teks terpusat) */}
            <div className="relative z-20 mx-auto w-full max-w-7xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto flex max-w-2xl flex-col items-center text-center"
                >
                    {/* 1. Eyebrow Text (Pill Capsule Emas) */}
                    <motion.div variants={fadeUpVariant}>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 backdrop-blur-sm">
                            <span className="size-1.5 animate-pulse rounded-full bg-[#C5A059]" />
                            <span className="font-sans text-[10px] font-semibold tracking-[0.24em] text-[#C5A059] uppercase sm:text-xs">
                                Curated Luxury Hampers &amp; Corporate Gifting
                            </span>
                        </div>
                    </motion.div>

                    {/* 2. Headline Utama (<h1> Serif Editorial) */}
                    <motion.h1
                        variants={fadeUpVariant}
                        className="font-serif text-3xl leading-[1.16] font-normal tracking-tight text-[#FAF7F2] sm:text-5xl md:text-6xl lg:text-[4rem]"
                    >
                        Merangkai Kehangatan{' '}
                        <span className="block font-normal text-[#FAF7F2] italic sm:inline">
                            dalam Setiap Bingkisan Istimewa
                        </span>
                    </motion.h1>

                    {/* 3. Subheadline */}
                    <motion.p
                        variants={fadeUpVariant}
                        className="mt-6 max-w-xl font-sans text-sm leading-relaxed font-light text-[#FAF7F2]/80 sm:text-base md:text-lg"
                    >
                        Kurasi hampers eksklusif dengan kemasan penuh estetika
                        dan sentuhan personal untuk merayakan momen berharga
                        bersama orang terdekat maupun relasi bisnis.
                    </motion.p>

                    {/* 4. Dua Tombol CTA Sejajar */}
                    <motion.div
                        variants={fadeUpVariant}
                        className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row"
                    >
                        {/* Tombol Utama: Solid Emas */}
                        <a
                            href="#koleksi"
                            onClick={(e) => handleSmoothScroll(e, '#koleksi')}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C5A059] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-[#122E21] shadow-lg shadow-[#C5A059]/15 transition-all duration-300 hover:scale-[1.02] hover:bg-[#D4AF37] hover:shadow-[#C5A059]/25 active:scale-[0.98] sm:w-auto sm:text-base"
                        >
                            Lihat Koleksi
                            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </a>

                        {/* Tombol Sekunder: Garis Tipis Elegan */}
                        <a
                            href={WA_HERO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#FAF7F2]/40 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-[#FAF7F2] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#FAF7F2]/10 active:scale-[0.98] sm:w-auto sm:text-base"
                        >
                            <MessageCircleIcon className="size-4 text-[#C5A059]" />
                            Pesan via WhatsApp
                        </a>
                    </motion.div>

                    {/* Barisan Horizontal Lingkaran Foto di Layar Mobile (< 768px) */}
                    <motion.div
                        variants={fadeUpVariant}
                        className="mt-12 flex items-center justify-center gap-3 sm:gap-4 md:hidden"
                    >
                        {heroImages.map((img, idx) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.35 + idx * 0.08,
                                }}
                                className="relative"
                            >
                                <div className="size-16 overflow-hidden rounded-full border border-[#C5A059]/40 shadow-[0_0_25px_rgba(212,175,55,0.22)] sm:size-20">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="h-full w-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
