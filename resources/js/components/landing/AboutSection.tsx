import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    SparklesIcon,
    PackageCheckIcon,
    HeartHandshakeIcon,
} from 'lucide-react';
import { getCmsText, type SectionContent } from '@/components/landing/cms';
import SectionDivider from '@/components/landing/SectionDivider';
import type { Product } from '@/types/product';

interface AboutSectionProps {
    products?: Product[];
    content?: SectionContent;
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

export default function AboutSection({
    products = [],
    content,
}: AboutSectionProps) {
    // Gunakan foto produk riil dari database jika tersedia
    const featuredProduct = products.find(
        (p) => Boolean(p.image_url) && p.image_url !== '',
    );
    const editorialImage =
        featuredProduct?.image_url || DEFAULT_EDITORIAL_PHOTO;
    const editorialAlt =
        featuredProduct?.name ||
        'Detail hampers mewah Galuh & Co. dengan pita satin dan ornamen artisanal';

    const eyebrow = getCmsText(content, 'eyebrow', 'Tentang Galuh & Co.');
    const title = getCmsText(content, 'title', 'Lebih dari Sekadar Hadiah,');
    const titleItalic = getCmsText(
        content,
        'title_italic',
        'Sebuah Pengalaman Membuka Kebahagiaan',
    );
    const description = getCmsText(
        content,
        'description',
        'Kami percaya setiap bingkisan membawa cerita dan ketulusan pengirimnya. Di Galuh & Co., setiap elemen dipilih dengan saksama—mulai dari kualitas isi, keharuman kemasan, hingga kartu ucapan tulisan tangan—untuk menciptakan kesan yang tak terlupakan.',
    );
    const badgeTitle = getCmsText(
        content,
        'badge_title',
        '100% Curated Quality',
    );
    const badgeSubtitle = getCmsText(
        content,
        'badge_subtitle',
        'Artisanal, Elegant & Personal',
    );

    return (
        <section
            id="tentang"
            className="relative scroll-mt-20 overflow-hidden bg-[#F2EBDC] py-20 md:py-28"
        >
            <SectionDivider />
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Kiri: Visual Editorial dengan Bingkai Ganda & Ambient Glow */}
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
                        {/* Sorotan Gradasi Radial Muted Brass 8% */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-10 z-0 rounded-full blur-2xl"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                            }}
                        />

                        {/* Bingkai Garis Tipis Ganda Bergaya Kartu Undangan / Kotak Hadiah */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-2.5 z-0 rounded-[22px] border border-[#A88B54]/35 sm:-inset-3"
                        />

                        {/* Bingkai Foto Potret Editorial Elevated */}
                        <div className="relative z-10 overflow-hidden rounded-2xl border border-[#A88B54]/45 bg-[#FAF7F0] p-2 shadow-[0_18px_42px_-14px_rgba(22,35,59,0.16)]">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                                <img
                                    src={editorialImage}
                                    alt={editorialAlt}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Hairline inner frame di atas foto */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-2 rounded-lg ring-1 ring-[#A88B54]/35 ring-inset"
                                />
                                {/* Gradient Overlay Lembut di Bagian Bawah */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16233B]/45 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Floating Badge Editorial (Light Paper Glass Card) */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.25,
                                ease: [0.16, 1, 0.3, 1] as const,
                            }}
                            className="absolute -right-2 -bottom-6 z-20 rounded-2xl border border-[#A88B54]/35 bg-[#FAF7F0]/95 p-4 shadow-[0_14px_34px_-10px_rgba(22,35,59,0.16)] backdrop-blur-md sm:right-6 sm:p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-[#16233B] text-[#A88B54]">
                                    <SparklesIcon className="size-5" />
                                </div>
                                <div>
                                    <p className="font-serif text-sm font-semibold text-[#16233B]">
                                        {badgeTitle}
                                    </p>
                                    <p className="font-sans text-xs text-[#6E675D]">
                                        {badgeSubtitle}
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
                        className="relative flex flex-col"
                    >
                        {/* Ambient radial glow halus di belakang judul section */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-12 -left-12 z-0 h-64 w-64 rounded-full blur-2xl"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                            }}
                        />

                        {/* Eyebrow */}
                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10"
                        >
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#6E675D] uppercase">
                                {eyebrow}
                            </span>
                        </motion.div>

                        {/* Judul Serif Utama */}
                        <motion.h2
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-3 font-serif text-3xl leading-[1.22] font-normal tracking-normal text-[#16233B] sm:text-4xl lg:text-[2.65rem]"
                        >
                            {title}{' '}
                            <span className="italic">{titleItalic}</span>
                        </motion.h2>

                        {/* Paragraf Cerita */}
                        <motion.p
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-6 font-sans text-base leading-relaxed font-normal text-[#6E675D] sm:text-lg"
                        >
                            {description}
                        </motion.p>

                        {/* Sub-Grid 3 Pilar Nilai Brand */}
                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-8 grid grid-cols-1 gap-4 border-t border-[#A88B54]/30 pt-8 sm:grid-cols-3"
                        >
                            {PILLARS.map((pillar, idx) => {
                                const IconComponent = pillar.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col space-y-2 rounded-xl border border-[#A88B54]/25 bg-[#FAF7F0] p-4 shadow-[0_12px_30px_-12px_rgba(22,35,59,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A88B54]/60 hover:shadow-[0_18px_38px_-12px_rgba(22,35,59,0.16)]"
                                    >
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#A88B54]/15 text-[#A88B54]">
                                            <IconComponent className="size-5" />
                                        </div>
                                        <h3 className="font-serif text-base font-semibold text-[#16233B]">
                                            {pillar.title}
                                        </h3>
                                        <p className="font-sans text-xs leading-relaxed font-normal text-[#6E675D]">
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
