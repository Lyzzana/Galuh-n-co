import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    SparklesIcon,
    PackageCheckIcon,
    HeartHandshakeIcon,
} from 'lucide-react';
import type { Product } from '@/types/product';
import SectionDivider from '@/components/landing/SectionDivider';

interface AboutSectionProps {
    products?: Product[];
}

const DEFAULT_EDITORIAL_PHOTO =
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=75&auto=format&fit=crop';

const FADE_UP_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

const STAGGER_CONTAINER: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const PILLARS = [
    {
        icon: SparklesIcon,
        title: 'Kurasi Pilihan',
        desc: 'Produk artisan dan bahan berkualitas tinggi.',
    },
    {
        icon: PackageCheckIcon,
        title: 'Packaging Premium',
        desc: 'Kotak kokoh dengan estetika warm luxury.',
    },
    {
        icon: HeartHandshakeIcon,
        title: 'Sentuhan Personal',
        desc: 'Bebas kustomisasi kartu ucapan dan branding.',
    },
];

export default function AboutSection({ products = [] }: AboutSectionProps) {
    // Gunakan foto produk riil dari database jika tersedia
    const featuredProduct = products.find(
        (p) => Boolean(p.image_url) && p.image_url !== '',
    );
    const editorialImage =
        featuredProduct?.image_url || DEFAULT_EDITORIAL_PHOTO;
    const editorialAlt =
        featuredProduct?.name ||
        'Detail hampers mewah Galuh & Co. dengan pita satin dan ornamen artisanal';

    return (
        <section
            id="tentang"
            className="scroll-mt-20 bg-[#FAF7F2] py-20 md:py-28"
        >
            <SectionDivider />
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Kiri: Visual Editorial dengan Frame Mewah & Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1] as const,
                        }}
                        className="relative mx-auto w-full max-w-lg lg:max-w-none"
                    >
                        {/* Soft Glow Ambient Latar Visual */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#C5A059]/10 blur-2xl"
                        />

                        {/* Bingkai Foto Potret Editorial */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#C5A059]/30 bg-white shadow-xl">
                            <img
                                src={editorialImage}
                                alt={editorialAlt}
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Gradient Overlay Lembut di Bagian Bawah */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#122E21]/40 via-transparent to-transparent" />
                        </div>

                        {/* Floating Badge Editorial (Warm Ivory Glass Card) */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.25,
                                ease: [0.16, 1, 0.3, 1] as const,
                            }}
                            className="absolute -right-2 -bottom-6 rounded-2xl border border-[#C5A059]/40 bg-[#FAF7F2]/95 p-4 shadow-xl backdrop-blur-md sm:right-6 sm:p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-[#163828] text-[#C5A059]">
                                    <SparklesIcon className="size-5" />
                                </div>
                                <div>
                                    <p className="font-serif text-sm font-semibold text-[#163828]">
                                        100% Curated Quality
                                    </p>
                                    <p className="font-sans text-xs text-[#6B5E55]">
                                        Artisanal, Elegant &amp; Personal
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Kolom Kanan: Narasi Brand & 3 Pilar Nilai */}
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Eyebrow */}
                        <motion.div variants={FADE_UP_VARIANTS}>
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                                Tentang Galuh &amp; Co.
                            </span>
                        </motion.div>

                        {/* Judul Serif Utama */}
                        <motion.h2
                            variants={FADE_UP_VARIANTS}
                            className="mt-3 font-serif text-3xl leading-[1.22] font-normal text-[#2C1E16] sm:text-4xl lg:text-[2.65rem]"
                        >
                            Lebih dari Sekadar Hadiah,{' '}
                            <span className="italic">
                                Sebuah Pengalaman Membuka Kebahagiaan
                            </span>
                        </motion.h2>

                        {/* Paragraf Cerita */}
                        <motion.p
                            variants={FADE_UP_VARIANTS}
                            className="mt-6 font-sans text-base leading-relaxed font-light text-[#6B5E55] sm:text-lg"
                        >
                            Kami percaya setiap bingkisan membawa cerita dan
                            ketulusan pengirimnya. Di Galuh &amp; Co., setiap
                            elemen dipilih dengan saksama—mulai dari kualitas
                            isi, keharuman kemasan, hingga kartu ucapan tulisan
                            tangan—untuk menciptakan kesan yang tak terlupakan.
                        </motion.p>

                        {/* Sub-Grid 3 Pilar Nilai Brand */}
                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="mt-8 grid grid-cols-1 gap-6 border-t border-[#C5A059]/30 pt-8 sm:grid-cols-3 sm:gap-4"
                        >
                            {PILLARS.map((pillar, idx) => {
                                const IconComponent = pillar.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col space-y-2 rounded-xl p-3 transition-colors hover:bg-white/60"
                                    >
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                                            <IconComponent className="size-5" />
                                        </div>
                                        <h3 className="font-serif text-base font-medium text-[#2C1E16]">
                                            {pillar.title}
                                        </h3>
                                        <p className="font-sans text-xs leading-relaxed font-light text-[#6B5E55]">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
