import { AnimatePresence, motion } from 'motion/react';
import { MenuIcon, MessageCircleIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
    { href: '#tentang', label: 'Tentang' },
    { href: '#koleksi', label: 'Koleksi' },
    { href: '#cara-pesan', label: 'Cara Pesan' },
    { href: '#corporate', label: 'Corporate' },
    { href: '#faq', label: 'FAQ' },
];

const WA_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

const LOGO_TEXT = 'GALUH & CO.';

const logoContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0, y: 3 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 },
    },
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 40);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            setMobileOpen(false);
        }
    };

    return (
        <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
            {/* ── Main Floating Pill Glass Container ────────────────────────────── */}
            <nav
                aria-label="Navigasi Utama"
                className={`pointer-events-auto mx-auto flex h-[64px] max-w-5xl items-center justify-between rounded-full px-5 transition-all duration-300 sm:px-7 ${
                    isScrolled
                        ? 'border border-[#C5A059]/40 bg-[#FAF7F2]/85 shadow-[0_8px_30px_rgba(44,30,22,0.08)] backdrop-blur-xl'
                        : 'border border-[#C5A059]/35 bg-[#122E21]/65 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl'
                }`}
            >
                {/* 1. Kiri: Logo Serif dengan Animasi Typewriter & Kursor Emas */}
                <a
                    href="#"
                    className={`flex items-center font-serif text-base font-semibold tracking-[0.2em] transition-colors sm:text-lg ${
                        isScrolled ? 'text-[#163828]' : 'text-[#FAF7F2]'
                    }`}
                >
                    <motion.span
                        variants={logoContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex"
                    >
                        {LOGO_TEXT.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                variants={letterVariants}
                                className={char === ' ' ? 'w-1.5' : ''}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="ml-1 inline-block h-3.5 w-[2px] bg-[#C5A059] align-middle"
                    />
                </a>

                {/* 2. Tengah (Desktop): 5 Link Smooth-scroll */}
                <div className="hidden items-center gap-6 md:flex lg:gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`group relative py-1 font-sans text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                                isScrolled
                                    ? 'text-[#2C1E16] hover:text-[#C5A059]'
                                    : 'text-[#FAF7F2]/90 hover:text-[#C5A059]'
                            }`}
                        >
                            <span>{link.label}</span>
                            {/* Indikator garis tipis emas saat hover */}
                            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* 3. Kanan: Tombol CTA Kapsul "Pesan Sekarang" */}
                <div className="flex items-center gap-2">
                    <a
                        href="#koleksi"
                        onClick={(e) => handleNavClick(e, '#koleksi')}
                        className={`hidden rounded-full px-5 py-2 font-sans text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] md:inline-flex ${
                            isScrolled
                                ? 'bg-[#163828] text-[#FAF7F2] hover:bg-[#122E21]'
                                : 'bg-[#C5A059] text-[#122E21] hover:bg-[#D4AF37]'
                        }`}
                    >
                        Pesan Sekarang
                    </a>

                    {/* Tombol Hamburger di Layar Mobile (< 768px) */}
                    <button
                        type="button"
                        aria-label="Buka menu navigasi"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className={`flex size-9 items-center justify-center rounded-full transition-colors md:hidden ${
                            isScrolled
                                ? 'text-[#163828] hover:bg-[#163828]/10'
                                : 'text-[#FAF7F2] hover:bg-white/15'
                        }`}
                    >
                        {mobileOpen ? (
                            <XIcon className="size-5" />
                        ) : (
                            <MenuIcon className="size-5" />
                        )}
                    </button>
                </div>
            </nav>

            {/* ── Mobile Floating Glass Card / Drawer (Tepat di bawah Pill) ───── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="pointer-events-auto mx-auto mt-2 max-w-5xl rounded-3xl border border-[#C5A059]/30 bg-[#FAF7F2]/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
                                Menu Navigasi
                            </span>

                            <div className="flex flex-col divide-y divide-[#E5DEC9]/60">
                                {NAV_LINKS.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) =>
                                            handleNavClick(e, link.href)
                                        }
                                        className="py-3 font-serif text-lg font-normal tracking-wide text-[#163828] transition-colors hover:text-[#C5A059]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2.5 border-t border-[#E5DEC9] pt-2">
                                <a
                                    href="#koleksi"
                                    onClick={(e) =>
                                        handleNavClick(e, '#koleksi')
                                    }
                                    className="inline-flex w-full items-center justify-center rounded-full bg-[#163828] py-3 font-sans text-xs font-semibold tracking-wide text-[#FAF7F2] transition-colors hover:bg-[#122E21]"
                                >
                                    Pesan Sekarang
                                </a>

                                <a
                                    href={WA_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#C5A059] bg-[#C5A059]/10 py-3 font-sans text-xs font-medium tracking-wide text-[#163828] transition-colors hover:bg-[#C5A059]/20"
                                >
                                    <MessageCircleIcon className="size-4 text-[#C5A059]" />
                                    Hubungi via WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
