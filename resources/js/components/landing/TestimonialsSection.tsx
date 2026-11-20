import { motion } from 'motion/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    QuoteIcon,
    StarIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';

const TESTIMONIALS = [
    {
        id: 1,
        quote: 'Setiap detail dari paket hampers yang kami kirimkan ke 120 direksi mitra korporat kami dipuji luar biasa. Kotaknya kokoh, aromanya harum saat dibuka, dan pita satinnya dirangkai sangat presisi.',
        author: 'Anindya Prasetyo',
        role: 'Head of People & Culture',
        company: 'PT Nusantara Digital Pratama',
        initials: 'AP',
        rating: 5,
    },
    {
        id: 2,
        quote: 'Koleksi hampers Idul Fitri dari Galuh & Co. selalu jadi andalan keluarga besar kami. Kue artisanalnya lezat dan toples kacanya terlihat sangat eksklusif. Tamu-tamu kami sangat terkesan.',
        author: 'Rina Kartikasari',
        role: 'Klien Hampers Hari Raya',
        company: 'Jakarta Selatan',
        initials: 'RK',
        rating: 5,
    },
    {
        id: 3,
        quote: 'Layanan multi-address delivery-nya sangat membantu! Kami hanya perlu kirim satu file spreadsheet, dan seluruh hampers VIP langsung terdistribusi tepat waktu ke 5 kota besar tanpa ada satu pun yang rusak.',
        author: 'Bambang Sudiro',
        role: 'VP Corporate Relations',
        company: 'Sinarmas Tech Ventures',
        initials: 'BS',
        rating: 5,
    },
    {
        id: 4,
        quote: 'Kami memesan 200 souvenir custom box untuk VIP wedding guests. Sentuhan stempel lilin dan kartu ucapan tulisan tangan membuat souvenir kami terasa begitu intim dan mewah.',
        author: 'Jessica & Dimas',
        role: 'Wedding Souvenir Hampers',
        company: 'Plataran Dharmawangsa',
        initials: 'JD',
        rating: 5,
    },
    {
        id: 5,
        quote: 'Kualitas teh artisan dan scented candle di paket hampers Serenity benar-benar premium. Rekan kerja yang menerimanya langsung bertanya di mana memesan bingkisan seindah ini.',
        author: 'Fajar Nugraha',
        role: 'Senior Marketing Director',
        company: 'Astra Graphia Group',
        initials: 'FN',
        rating: 5,
    },
    {
        id: 6,
        quote: 'Respons tim kurator sangat cepat dan penuh perhatian. Mulai dari penentuan budget hingga pemilihan ornamen kartu, semuanya dilayani dengan profesionalitas tingkat tinggi.',
        author: 'Clara Meilani',
        role: 'Executive Secretary',
        company: 'Mandiri Sekuritas',
        initials: 'CM',
        rating: 5,
    },
];

export default function TestimonialsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 20);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 380;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            setTimeout(checkScrollButtons, 350);
        }
    };

    return (
        <section className="relative overflow-hidden border-t border-[#E5DEC9]/60 bg-[#FAF7F2] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header Rata Tengah */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                        Cerita &amp; Apresiasi
                    </span>
                    <h2 className="mt-3 font-serif text-3xl leading-tight font-normal text-[#2C1E16] sm:text-4xl lg:text-5xl">
                        Kehangatan yang Dirasakan Penerima
                    </h2>
                    <p className="mt-4 font-sans text-sm font-light text-[#6B5E55] sm:text-base">
                        Untaian kesan tulus dari mereka yang telah mempercayakan
                        momen berharga bersama Galuh &amp; Co.
                    </p>

                    {/* Tombol Panah Navigasi Carousel */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            aria-label="Geser testimoni ke kiri"
                            onClick={() => handleScroll('left')}
                            disabled={!canScrollLeft}
                            className="flex size-10 items-center justify-center rounded-full border border-[#C5A059]/40 bg-white text-[#163828] shadow-xs transition-all hover:scale-105 hover:bg-[#FAF7F2] active:scale-95 disabled:opacity-40"
                        >
                            <ChevronLeftIcon className="size-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Geser testimoni ke kanan"
                            onClick={() => handleScroll('right')}
                            disabled={!canScrollRight}
                            className="flex size-10 items-center justify-center rounded-full border border-[#C5A059]/40 bg-white text-[#163828] shadow-xs transition-all hover:scale-105 hover:bg-[#FAF7F2] active:scale-95 disabled:opacity-40"
                        >
                            <ChevronRightIcon className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Untaian Tali Pita Emas (Golden Ribbon String SVG) di Atas Kartu */}
                <div className="relative mt-12 w-full">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-4 right-0 left-0 z-0 hidden w-full overflow-hidden md:block"
                    >
                        <svg
                            className="h-8 w-full text-[#C5A059]/50"
                            preserveAspectRatio="none"
                            viewBox="0 0 1200 40"
                            fill="none"
                        >
                            <path
                                d="M0 20 Q 150 35, 300 20 T 600 20 T 900 20 T 1200 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                            />
                        </svg>
                    </div>

                    {/* Lintasan Kartu Ucapan Gantung (Drag & Scrollable Carousel) */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScrollButtons}
                        className="relative z-10 no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-8 active:cursor-grabbing"
                    >
                        {TESTIMONIALS.map((item) => (
                            <motion.div
                                key={item.id}
                                style={{ transformOrigin: 'top center' }}
                                whileHover={{
                                    scale: 1.02,
                                    rotate: [0, -1.5, 1.5, 0],
                                    transition: {
                                        duration: 0.6,
                                        ease: 'easeInOut',
                                    },
                                }}
                                className="relative flex w-[320px] shrink-0 snap-center flex-col justify-between rounded-2xl border border-[#C5A059]/35 bg-white p-7 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:w-[360px]"
                            >
                                {/* Ornamen Simpul Gantung Pita Emas di Tengah Atas Kartu */}
                                <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center justify-center">
                                    <div className="size-6 rounded-full border border-[#C5A059] bg-[#FAF7F2] p-1 shadow-xs">
                                        <div className="size-full rounded-full bg-[#C5A059]" />
                                    </div>
                                </div>

                                <div>
                                    {/* Star Rating & Quote Icon */}
                                    <div className="flex items-center justify-between border-b border-[#E5DEC9]/50 pb-4">
                                        <div className="flex items-center gap-1 text-[#C5A059]">
                                            {Array.from({
                                                length: item.rating,
                                            }).map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className="size-4 fill-current"
                                                />
                                            ))}
                                        </div>
                                        <QuoteIcon className="size-6 text-[#C5A059]/40" />
                                    </div>

                                    {/* Kutipan Testimoni */}
                                    <p className="mt-5 font-sans text-sm leading-relaxed font-light text-[#2C1E16]">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                </div>

                                {/* Penulis & Perusahaan */}
                                <div className="mt-8 flex items-center gap-3.5 border-t border-[#E5DEC9]/50 pt-5">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#163828] font-serif text-sm font-semibold text-[#C5A059] shadow-xs">
                                        {item.initials}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="truncate font-serif text-base font-medium text-[#163828]">
                                            {item.author}
                                        </h4>
                                        <p className="truncate font-sans text-xs text-[#6B5E55]">
                                            {item.role}
                                        </p>
                                        <p className="truncate font-sans text-[11px] font-medium text-[#C5A059]">
                                            {item.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
