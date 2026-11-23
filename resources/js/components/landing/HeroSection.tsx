import type { Variants } from 'motion/react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowRightIcon, MessageCircleIcon } from 'lucide-react';
import type { Product } from '@/types/product';

interface HeroSectionProps {
    products?: Product[];
}

const DEFAULT_HERO_PHOTOS = [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=75&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=75&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&q=75&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?w=600&q=75&auto=format&fit=crop',
];

// Tiap lingkaran punya origin arah masuk dari dalam (skala kecil di tengah lalu mekar)
const CIRCLE_CONFIGS = [
    {
        id: 'top-left',
        positionClass: 'left-2 top-20 lg:left-8 lg:top-20 xl:left-14',
        sizeClass: 'size-32 md:size-40 lg:size-48',
        floatY: -12,
        floatDuration: 5.2,
        revealDelay: 0.55,
    },
    {
        id: 'top-right',
        positionClass: 'right-2 top-24 lg:right-8 lg:top-24 xl:right-14',
        sizeClass: 'size-28 md:size-36 lg:size-44',
        floatY: 10,
        floatDuration: 6,
        revealDelay: 0.65,
    },
    {
        id: 'bottom-left',
        positionClass: 'bottom-8 left-4 lg:bottom-10 lg:left-12 xl:left-20',
        sizeClass: 'size-36 md:size-44 lg:size-52',
        floatY: -10,
        floatDuration: 5.6,
        revealDelay: 0.6,
    },
    {
        id: 'bottom-right',
        positionClass: 'bottom-10 right-4 lg:bottom-12 lg:right-12 xl:right-20',
        sizeClass: 'size-30 md:size-36 lg:size-44',
        floatY: 12,
        floatDuration: 4.8,
        revealDelay: 0.7,
    },
];

const WA_HERO_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

const ROTATING_WORDS = ['Istimewa', 'Korporat', 'Hari Raya', 'Pernikahan'];

// ── Rotating Typewriter Hook ──────────────────────────────────────────────────
type Phase = 'typing' | 'pausing' | 'erasing' | 'switching';

interface TypewriterState {
    displayText: string;
    wordIndex: number;
    phase: Phase;
}

function useRotatingTypewriter(
    words: string[],
    {
        typeSpeed = 80,
        eraseSpeed = 45,
        pauseAfterType = 2200,
        pauseAfterErase = 350,
        active = true,
        reducedMotion = false,
    } = {},
) {
    const [state, setState] = useState<TypewriterState>({
        displayText: words[0] ?? '',
        wordIndex: 0,
        phase: 'pausing',
    });

    useEffect(() => {
        if (!active || reducedMotion) {
            setState({
                displayText: words[0] ?? '',
                wordIndex: 0,
                phase: 'pausing',
            });
            return;
        }

        const { displayText, wordIndex, phase } = state;
        const currentWord = words[wordIndex] ?? '';

        if (phase === 'typing') {
            if (displayText.length < currentWord.length) {
                const t = setTimeout(
                    () =>
                        setState((s) => ({
                            ...s,
                            displayText: currentWord.slice(
                                0,
                                s.displayText.length + 1,
                            ),
                        })),
                    typeSpeed,
                );
                return () => clearTimeout(t);
            }
            setState((s) => ({ ...s, phase: 'pausing' }));
            return;
        }

        if (phase === 'pausing') {
            const t = setTimeout(
                () => setState((s) => ({ ...s, phase: 'erasing' })),
                pauseAfterType,
            );
            return () => clearTimeout(t);
        }

        if (phase === 'erasing') {
            if (displayText.length > 0) {
                const t = setTimeout(
                    () =>
                        setState((s) => ({
                            ...s,
                            displayText: s.displayText.slice(0, -1),
                        })),
                    eraseSpeed,
                );
                return () => clearTimeout(t);
            }
            setState((s) => ({ ...s, phase: 'switching' }));
            return;
        }

        if (phase === 'switching') {
            const nextIndex = (wordIndex + 1) % words.length;
            const t = setTimeout(
                () =>
                    setState({
                        displayText: '',
                        wordIndex: nextIndex,
                        phase: 'typing',
                    }),
                pauseAfterErase,
            );
            return () => clearTimeout(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, active, reducedMotion]);

    return {
        displayText: state.displayText,
        isTyping: state.phase === 'typing' || state.phase === 'pausing',
    };
}

function longestWord(words: string[]) {
    return words.reduce((a, b) => (b.length > a.length ? b : a), '');
}

// ── Motion variants ───────────────────────────────────────────────────────────

// Pita emas latar: fade in dulu, lalu elemen lain menyusul
const ribbonVariant: Variants = {
    hidden: { opacity: 0, scaleX: 0.6 },
    visible: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
};

// Blok tipografi tengah: scale + opacity
const heroContentVariant: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
    },
};

// Container stagger untuk anak-anak konten
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.13, delayChildren: 0.22 },
    },
};

const fadeUpChild: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function HeroSection({ products = [] }: HeroSectionProps) {
    // Motion/react hook — otomatis false di SSR, true di browser jika reduced motion aktif
    const shouldReduceMotion = useReducedMotion() ?? false;

    const headlineRef = useRef<HTMLHeadingElement>(null);
    const inView = useInView(headlineRef, { once: true, margin: '-80px' });

    const { displayText, isTyping } = useRotatingTypewriter(ROTATING_WORDS, {
        typeSpeed: 85,
        eraseSpeed: 50,
        pauseAfterType: 2400,
        pauseAfterErase: 380,
        active: inView,
        reducedMotion: shouldReduceMotion,
    });

    const productsWithImages = products.filter(
        (p) => Boolean(p.image_url) && p.image_url !== '',
    );

    const heroImages = CIRCLE_CONFIGS.map((cfg, index) => {
        const prod = productsWithImages[index];
        return {
            ...cfg,
            src: prod?.image_url ?? DEFAULT_HERO_PHOTOS[index] ?? '',
            alt:
                prod?.name ??
                'Koleksi hampers mewah Galuh & Co. dengan pita satin emas',
        };
    });

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string,
    ) => {
        e.preventDefault();
        document
            .querySelector(targetId)
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#122E21] px-6 pt-28 pb-16 md:pt-36 md:pb-24">
            {/* ── 1. Grain texture — inline SVG data-URI, zero network request ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '200px 200px',
                }}
            />

            {/* ── 2. Hairline inner frame — kesan bingkai tutup kotak hampers ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 z-[2] rounded-2xl sm:inset-4 md:inset-5"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(197,160,89,0.22)' }}
            />

            {/* ── 3. Pita emas horizontal — latar detail kreatif ── */}
            {/* Muncul pertama dalam urutan unboxing (ribbonVariant) */}
            <motion.div
                aria-hidden="true"
                variants={shouldReduceMotion ? undefined : ribbonVariant}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
                className="pointer-events-none absolute top-1/2 right-0 left-0 z-[2] -translate-y-1/2"
            >
                {/* Garis horizontal utama */}
                <div
                    className="h-px w-full"
                    style={{
                        background:
                            'linear-gradient(to right, transparent 0%, rgba(197,160,89,0.18) 15%, rgba(197,160,89,0.28) 50%, rgba(197,160,89,0.18) 85%, transparent 100%)',
                    }}
                />
                {/* Garis horizontal kedua — lebih tipis, 1px di bawah */}
                <div
                    className="mt-[3px] h-px w-full"
                    style={{
                        background:
                            'linear-gradient(to right, transparent 0%, rgba(197,160,89,0.09) 20%, rgba(197,160,89,0.15) 50%, rgba(197,160,89,0.09) 80%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* ── 4. Pita emas vertikal — melengkapi motif tanda silang pita ── */}
            <motion.div
                aria-hidden="true"
                variants={shouldReduceMotion ? undefined : ribbonVariant}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
                className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-[2] -translate-x-1/2"
            >
                <div
                    className="h-full w-px"
                    style={{
                        background:
                            'linear-gradient(to bottom, transparent 0%, rgba(197,160,89,0.18) 15%, rgba(197,160,89,0.28) 50%, rgba(197,160,89,0.18) 85%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* ── 5. Ambient radial glows ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
                <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/12 blur-[130px] sm:h-[650px] sm:w-[650px]" />
                <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
                <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
            </div>

            {/* ── 6. Foto lingkaran — mekar dari tengah ke posisi sudut ── */}
            {heroImages.map((img) => (
                <motion.div
                    key={img.id}
                    initial={
                        shouldReduceMotion
                            ? undefined
                            : { opacity: 0, scale: 0.55 }
                    }
                    animate={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  opacity: 1,
                                  scale: 1,
                                  y: [0, img.floatY, 0],
                              }
                    }
                    transition={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  opacity: {
                                      duration: 0.6,
                                      delay: img.revealDelay,
                                  },
                                  scale: {
                                      duration: 0.75,
                                      delay: img.revealDelay,
                                      ease: [0.16, 1, 0.3, 1],
                                  },
                                  y: {
                                      duration: img.floatDuration,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                      // float mulai setelah reveal selesai
                                      delay: img.revealDelay + 0.75,
                                  },
                              }
                    }
                    className={`absolute z-10 hidden md:block ${img.positionClass}`}
                >
                    <div className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-[#D4AF37]/20 blur-2xl" />
                    <div
                        className={`relative ${img.sizeClass} overflow-hidden rounded-full border border-[#C5A059]/40 shadow-[0_0_45px_rgba(212,175,55,0.25)] transition-transform duration-500 hover:scale-105`}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full object-cover"
                            loading="eager"
                            decoding="async"
                            fetchPriority={
                                img.id === 'top-left' || img.id === 'top-right'
                                    ? 'high'
                                    : 'auto'
                            }
                        />
                    </div>
                </motion.div>
            ))}

            {/* ── 7. Konten tengah — reveal scale + opacity setelah pita ── */}
            <div className="relative z-20 mx-auto w-full max-w-7xl">
                <motion.div
                    variants={
                        shouldReduceMotion ? undefined : heroContentVariant
                    }
                    initial={shouldReduceMotion ? undefined : 'hidden'}
                    animate={shouldReduceMotion ? undefined : 'visible'}
                >
                    <motion.div
                        variants={
                            shouldReduceMotion ? undefined : staggerContainer
                        }
                        initial={shouldReduceMotion ? undefined : 'hidden'}
                        animate={shouldReduceMotion ? undefined : 'visible'}
                        className="mx-auto flex max-w-2xl flex-col items-center text-center"
                    >
                        {/* Eyebrow pill */}
                        <motion.div
                            variants={
                                shouldReduceMotion ? undefined : fadeUpChild
                            }
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-1.5 backdrop-blur-sm">
                                <span className="size-1.5 animate-pulse rounded-full bg-[#C5A059]" />
                                <span className="font-sans text-[10px] font-semibold tracking-[0.24em] text-[#C5A059] uppercase sm:text-xs">
                                    Curated Luxury Hampers &amp; Corporate
                                    Gifting
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline + rotating typewriter */}
                        <motion.h1
                            ref={headlineRef}
                            variants={
                                shouldReduceMotion ? undefined : fadeUpChild
                            }
                            aria-label={`Merangkai Kehangatan dalam Setiap Bingkisan ${ROTATING_WORDS[0]}`}
                            className="font-serif text-3xl leading-[1.2] font-normal tracking-tight text-[#FAF7F2] sm:text-5xl md:text-6xl lg:text-[4rem]"
                        >
                            {/* Baris 1: statis */}
                            <span className="block" aria-hidden="true">
                                Merangkai Kehangatan
                            </span>

                            {/*
                             * Baris 2: "dalam Setiap Bingkisan" + kata rotating
                             * Pakai inline-flex items-baseline agar kata rotating
                             * tidak turun ke baris baru saat kosong saat dihapus.
                             */}
                            <span
                                className="mt-1 flex flex-wrap items-baseline justify-center gap-x-[0.3em] italic sm:mt-0"
                                aria-hidden="true"
                            >
                                <span className="whitespace-nowrap">
                                    dalam Setiap Bingkisan
                                </span>

                                {/* Container kata rotating — lebar dikunci ghost text */}
                                <span className="relative inline-block">
                                    {/* Ghost text untuk lock min-width (kata terpanjang) */}
                                    <span
                                        className="invisible whitespace-nowrap select-none"
                                        aria-hidden="true"
                                    >
                                        {longestWord(ROTATING_WORDS)}
                                    </span>

                                    {/* Kata aktual overlay */}
                                    <span className="absolute inset-0 flex items-baseline justify-start">
                                        <span className="whitespace-nowrap text-[#C5A059]">
                                            {displayText}
                                        </span>

                                        {/* Kursor champagne gold — smooth blink */}
                                        <span
                                            aria-hidden="true"
                                            className={[
                                                'ml-[2px] inline-block self-stretch w-[1.5px] rounded-full bg-[#C5A059]',
                                                'animate-cursor-blink',
                                                !isTyping && !shouldReduceMotion
                                                    ? 'opacity-0'
                                                    : '',
                                            ].join(' ')}
                                        />
                                    </span>
                                </span>
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={
                                shouldReduceMotion ? undefined : fadeUpChild
                            }
                            className="mt-6 max-w-xl font-sans text-sm leading-relaxed font-light text-[#FAF7F2]/80 sm:text-base md:text-lg"
                        >
                            Kurasi hampers eksklusif dengan kemasan penuh
                            estetika dan sentuhan personal untuk merayakan momen
                            berharga bersama orang terdekat maupun relasi
                            bisnis.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={
                                shouldReduceMotion ? undefined : fadeUpChild
                            }
                            className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row"
                        >
                            <a
                                href="#koleksi"
                                onClick={(e) =>
                                    handleSmoothScroll(e, '#koleksi')
                                }
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C5A059] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-[#122E21] shadow-lg shadow-[#C5A059]/15 transition-all duration-300 hover:scale-[1.02] hover:bg-[#D4AF37] hover:shadow-[#C5A059]/25 active:scale-[0.98] sm:w-auto sm:text-base"
                            >
                                Lihat Koleksi
                                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </a>

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

                        {/* Lingkaran foto — mobile row */}
                        <motion.div
                            variants={
                                shouldReduceMotion ? undefined : fadeUpChild
                            }
                            className="mt-12 flex items-center justify-center gap-3 sm:gap-4 md:hidden"
                        >
                            {heroImages.map((img, idx) => (
                                <motion.div
                                    key={img.id}
                                    initial={
                                        shouldReduceMotion
                                            ? undefined
                                            : { opacity: 0, scale: 0.8 }
                                    }
                                    animate={
                                        shouldReduceMotion
                                            ? undefined
                                            : { opacity: 1, scale: 1 }
                                    }
                                    transition={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                  duration: 0.5,
                                                  delay: 0.35 + idx * 0.08,
                                              }
                                    }
                                >
                                    <div className="size-16 overflow-hidden rounded-full border border-[#C5A059]/40 shadow-[0_0_25px_rgba(212,175,55,0.22)] sm:size-20">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="h-full w-full object-cover"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
