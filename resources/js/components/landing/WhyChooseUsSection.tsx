import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { AwardIcon, BoxIcon, PaletteIcon, ShieldCheckIcon } from 'lucide-react';

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

export default function WhyChooseUsSection() {
    return (
        <section className="border-t border-[#E5DEC9]/60 bg-[#FAF7F2] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Kiri: Narasi & 4 Keunggulan */}
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col"
                    >
                        <motion.div variants={FADE_UP_VARIANTS}>
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                                Standar Keunggulan Kami
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={FADE_UP_VARIANTS}
                            className="mt-3 font-serif text-3xl leading-tight font-normal text-[#2C1E16] sm:text-4xl lg:text-[2.65rem]"
                        >
                            Detail Sempurna dalam{' '}
                            <span className="italic">
                                Setiap Sentuhan Bingkisan
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={FADE_UP_VARIANTS}
                            className="mt-5 font-sans text-base leading-relaxed font-light text-[#6B5E55]"
                        >
                            Kami menggabungkan seni kurasi artisan dengan
                            keandalan pengerjaan tingkat tinggi untuk memastikan
                            setiap bingkisan menghadirkan aura kemewahan sejak
                            pertama kali diterima.
                        </motion.p>

                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
                        >
                            {HIGHLIGHTS.map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col space-y-2 rounded-xl border border-[#E5DEC9]/80 bg-white/70 p-4 shadow-2xs transition-colors hover:border-[#C5A059]/50 hover:bg-white"
                                    >
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                                            <IconComp className="size-5" />
                                        </div>
                                        <h3 className="font-serif text-base font-medium text-[#2C1E16]">
                                            {item.title}
                                        </h3>
                                        <p className="font-sans text-xs leading-relaxed font-light text-[#6B5E55]">
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
                            className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#D4AF37]/10 blur-2xl"
                        />

                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C5A059]/35 bg-white shadow-xl sm:aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop"
                                alt="Detail kemasan mewah hampers Galuh & Co."
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#122E21]/50 via-transparent to-transparent" />
                        </div>

                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-6 -left-2 rounded-2xl border border-[#C5A059]/40 bg-[#FAF7F2]/95 p-4 shadow-xl backdrop-blur-md sm:left-6 sm:p-5">
                            <p className="font-serif text-2xl font-bold text-[#163828]">
                                5.000+
                            </p>
                            <p className="font-sans text-xs font-medium text-[#C5A059]">
                                Bingkisan Mewah Terkirim
                            </p>
                            <p className="font-sans text-[11px] text-[#6B5E55]">
                                Ke Seluruh Penjuru Nusantara
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
