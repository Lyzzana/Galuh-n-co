import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    CheckCircle2Icon,
    GiftIcon,
    MessageSquareTextIcon,
    TruckIcon,
} from 'lucide-react';
import { getCmsText, type SectionContent } from '@/components/landing/cms';

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

export default function HowToOrderSection({
    content,
}: {
    content?: SectionContent;
}) {
    const eyebrow = getCmsText(content, 'eyebrow', 'Proses Pemesanan');
    const title = getCmsText(
        content,
        'title',
        'Kemudahan Memesan dalam 4 Langkah',
    );
    const description = getCmsText(
        content,
        'description',
        'Dari pemilihan hingga pengantaran, tim kurator kami siap membantu mewujudkan bingkisan terbaik tanpa kerumitan.',
    );

    return (
        <section
            id="cara-pesan"
            className="relative scroll-mt-20 overflow-hidden border-t border-[#A88B54]/25 bg-[#F2EBDC] py-20 md:py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
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
                        {eyebrow}
                    </span>
                    <h2 className="relative mt-3 font-serif text-3xl leading-tight font-normal tracking-normal text-[#16233B] sm:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                    <p className="relative mt-4 font-sans text-sm font-normal text-[#6E675D] sm:text-base">
                        {description}
                    </p>
                </div>

                {/* 4 Steps Row with Elevated Cards & Connecting Line */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {/* Connecting line on desktop */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-16 right-12 left-12 z-0 hidden h-[1.5px] bg-gradient-to-r from-[#A88B54]/10 via-[#A88B54]/45 to-[#A88B54]/10 lg:block"
                    />

                    {STEPS.map((step, idx) => {
                        const IconComp = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={FADE_UP_VARIANTS}
                                className="relative z-10 flex flex-col items-center rounded-2xl border border-[#A88B54]/25 bg-[#FAF7F0] p-6 text-center shadow-[0_12px_30px_-12px_rgba(22,35,59,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A88B54]/60 hover:shadow-[0_18px_38px_-12px_rgba(22,35,59,0.16)]"
                            >
                                {/* Circle Node */}
                                <div className="relative z-10 flex size-20 items-center justify-center rounded-full border border-[#A88B54]/45 bg-[#FAF7F0] shadow-md transition-transform duration-300 hover:scale-105">
                                    <div className="flex size-14 items-center justify-center rounded-full bg-[#16233B] text-[#F2EBDC]">
                                        <IconComp className="size-6 text-[#A88B54]" />
                                    </div>
                                    <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-[#A88B54] font-sans text-[11px] font-bold text-[#16233B] shadow-xs">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-6 font-serif text-lg font-semibold text-[#16233B]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 font-sans text-xs leading-relaxed font-normal text-[#6E675D]">
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
