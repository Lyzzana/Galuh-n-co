import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    CheckCircle2Icon,
    GiftIcon,
    MessageSquareTextIcon,
    TruckIcon,
} from 'lucide-react';
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
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const STEPS = [
    {
        number: '01',
        icon: GiftIcon,
        title: 'Pilih Koleksi',
        desc: 'Eksplorasi katalog kurasi kami atau diskusikan konsep khusus yang Anda inginkan.',
    },
    {
        number: '02',
        icon: MessageSquareTextIcon,
        title: 'Konsultasi & Kustom',
        desc: 'Tentukan kombinasi item, warna pita satin, ornamen kartu, dan personalisasi nama.',
    },
    {
        number: '03',
        icon: CheckCircle2Icon,
        title: 'Konfirmasi & Produksi',
        desc: 'Penyusunan hampers dilakukan secara presisi, higienis, dan penuh ketelitian.',
    },
    {
        number: '04',
        icon: TruckIcon,
        title: 'Pengiriman Aman',
        desc: 'Dikirim dengan proteksi berlapis tepat waktu langsung ke penerima di seluruh Indonesia.',
    },
];

export default function HowToOrderSection() {
    return (
        <section
            id="cara-pesan"
            className="scroll-mt-20 border-t border-[#E5DEC9]/60 bg-[#FAF7F2] py-20 md:py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                        Proses Pemesanan
                    </span>
                    <h2 className="mt-3 font-serif text-3xl leading-tight font-normal text-[#2C1E16] sm:text-4xl lg:text-5xl">
                        Kemudahan Memesan dalam 4 Langkah
                    </h2>
                    <p className="mt-4 font-sans text-sm font-light text-[#6B5E55] sm:text-base">
                        Dari pemilihan hingga pengantaran, tim kurator kami siap
                        membantu mewujudkan bingkisan terbaik tanpa kerumitan.
                    </p>
                </div>

                {/* 4 Steps Row with Connecting Line */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {/* Connecting line on desktop */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-12 right-12 left-12 hidden h-[1.5px] bg-gradient-to-r from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10 lg:block"
                    />

                    {STEPS.map((step, idx) => {
                        const IconComp = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={FADE_UP_VARIANTS}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Circle Node */}
                                <div className="relative z-10 flex size-20 items-center justify-center rounded-full border border-[#C5A059]/40 bg-white shadow-md transition-transform duration-300 hover:scale-105">
                                    <div className="flex size-14 items-center justify-center rounded-full bg-[#163828] text-[#FAF7F2]">
                                        <IconComp className="size-6 text-[#C5A059]" />
                                    </div>
                                    <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-[#C5A059] font-sans text-[11px] font-bold text-[#122E21] shadow-xs">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-6 font-serif text-lg font-medium text-[#2C1E16]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 font-sans text-xs leading-relaxed font-light text-[#6B5E55]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
