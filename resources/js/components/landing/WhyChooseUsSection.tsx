import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { AwardIcon, BoxIcon, PaletteIcon, ShieldCheckIcon } from 'lucide-react';
import { getCmsText, type SectionContent } from '@/components/landing/cms';
import SectionDivider from '@/components/landing/SectionDivider';

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
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const HIGHLIGHTS = [
    {
        icon: BoxIcon,
        title: 'Hardbox Kustom Berkualitas Tinggi',
        desc: 'Konstruksi kokoh dengan ketebalan presisi, tekstur sentuhan beludru, dan penutup magnetik elegan.',
    },
    {
        icon: AwardIcon,
        title: 'Bahan Kurasi Terpilih & Terverifikasi',
        desc: 'Produk artisan lokal dan internasional dengan seleksi ketat serta masa simpan terjamin segar.',
    },
    {
        icon: PaletteIcon,
        title: 'Desain Identitas & Kartu Eksklusif',
        desc: 'Pilihan pita satin premium, aksen stempel lilin (wax seal), dan kartu ucapan beraksen emas.',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Garansi Pengiriman Aman & Rapi',
        desc: 'Proteksi protektif double-box dan bubble wrap tebal untuk memastikan hampers tiba utuh tanpa cacat.',
    },
];

export default function WhyChooseUsSection({
    content,
}: {
    content?: SectionContent;
}) {
    const eyebrow = getCmsText(content, 'eyebrow', 'Standar Keunggulan Kami');
    const title = getCmsText(content, 'title', 'Detail Sempurna dalam');
    const titleItalic = getCmsText(
        content,
        'title_italic',
        'Setiap Sentuhan Bingkisan',
    );
    const description = getCmsText(
        content,
        'description',
        'Kami menggabungkan seni kurasi artisan dengan keandalan pengerjaan tingkat tinggi untuk memastikan setiap bingkisan menghadirkan aura kemewahan sejak pertama kali diterima.',
    );
    const statNumber = getCmsText(content, 'stat_number', '5.000+');
    const statLabel = getCmsText(
        content,
        'stat_label',
        'Bingkisan Mewah Terkirim',
    );
    const statSublabel = getCmsText(
        content,
        'stat_sublabel',
        'Ke Seluruh Penjuru Nusantara',
    );
    return (
        <section className="relative overflow-hidden bg-[#F2EBDC] py-20 md:py-28">
            <SectionDivider />
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Kiri: Narasi & 4 Keunggulan */}
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative flex flex-col"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-12 -left-12 z-0 h-64 w-64 rounded-full blur-2xl"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                            }}
                        />

                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10"
                        >
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#6E675D] uppercase">
                                {eyebrow}
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-3 font-serif text-3xl leading-tight font-normal tracking-normal text-[#16233B] sm:text-4xl lg:text-[2.65rem]"
                        >
                            {title}{' '}
                            <span className="italic">{titleItalic}</span>
                        </motion.h2>

                        <motion.p
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-5 font-sans text-base leading-relaxed font-normal text-[#6E675D]"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="relative z-10 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
                        >
                            {HIGHLIGHTS.map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col space-y-2 rounded-xl border border-[#A88B54]/25 bg-[#FAF7F0] p-4 shadow-[0_12px_32px_-12px_rgba(22,35,59,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A88B54]/60 hover:shadow-[0_18px_38px_-12px_rgba(22,35,59,0.16)]"
                                    >
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#A88B54]/15 text-[#A88B54]">
                                            <IconComp className="size-5" />
                                        </div>
                                        <h3 className="font-serif text-base font-semibold text-[#16233B]">
                                            {item.title}
                                        </h3>
                                        <p className="font-sans text-xs leading-relaxed font-normal text-[#6E675D]">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Kolom Kanan: Visual Komposisi Mewah */}
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
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-8 z-0 rounded-full blur-2xl"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                            }}
                        />

                        <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-2xl border border-[#A88B54]/35 bg-[#FAF7F0] p-2 shadow-[0_18px_42px_-14px_rgba(22,35,59,0.16)] sm:aspect-[4/3]">
                            <div className="relative h-full w-full overflow-hidden rounded-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=75&auto=format&fit=crop"
                                    alt="Detail kemasan mewah hampers Galuh & Co."
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16233B]/50 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-6 -left-2 z-20 rounded-2xl border border-[#A88B54]/35 bg-[#FAF7F0]/95 p-4 shadow-[0_14px_34px_-10px_rgba(22,35,59,0.16)] backdrop-blur-md sm:left-6 sm:p-5">
                            <p className="font-serif text-2xl font-semibold text-[#16233B]">
                                {statNumber}
                            </p>
                            <p className="font-sans text-xs font-semibold text-[#16233B]">
                                {statLabel}
                            </p>
                            <p className="font-sans text-[11px] text-[#6E675D]">
                                {statSublabel}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
