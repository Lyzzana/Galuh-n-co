import {
    ArrowUpRightIcon,
    ClockIcon,
    InstagramIcon,
    MailIcon,
    MapPinIcon,
    MessageCircleIcon,
    PhoneIcon,
} from 'lucide-react';

const WA_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

const QUICK_LINKS = [
    { href: '#tentang', label: 'Tentang Kami' },
    { href: '#koleksi', label: 'Koleksi Hampers' },
    { href: '#cara-pesan', label: 'Cara Pemesanan' },
    { href: '#corporate', label: 'Corporate Gifting' },
    { href: '#faq', label: 'Pertanyaan Umum (FAQ)' },
];

export default function FooterSection() {
    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string,
    ) => {
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="relative bg-[#122E21] text-[#FAF7F2]">
            {/* ── Garis Aksen Pita Emas Tipis dengan Ornamen Simpul di Batas Atas ── */}
            <div className="relative border-t border-[#C5A059]/40">
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center justify-center">
                    <div className="flex items-center gap-1.5 rounded-full border border-[#C5A059] bg-[#122E21] px-3 py-1 shadow-md">
                        <span className="size-1 rounded-full bg-[#C5A059]" />
                        <span className="font-serif text-[10px] tracking-[0.25em] text-[#C5A059] uppercase">
                            Galuh &amp; Co.
                        </span>
                        <span className="size-1 rounded-full bg-[#C5A059]" />
                    </div>
                </div>
            </div>

            {/* ── Zona 1: Banner CTA Penutup ────────────────────────────────────── */}
            <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
                <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                    Mulai Kolaborasi Anda
                </span>

                <h2 className="mt-3 font-serif text-3xl leading-tight font-normal text-[#FAF7F2] sm:text-4xl lg:text-5xl">
                    Siap Merangkai Bingkisan{' '}
                    <span className="italic">Berkesan Hari Ini?</span>
                </h2>

                <p className="mt-4 font-sans text-sm leading-relaxed font-light text-[#FAF7F2]/80 sm:text-base">
                    Konsultasikan kebutuhan hampers personal maupun corporate
                    gifting bersama kurator Galuh &amp; Co. Kami siap mewujudkan
                    bingkisan istimewa Anda dengan sentuhan penuh kehangatan.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C5A059] px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#122E21] shadow-lg shadow-[#C5A059]/15 transition-all duration-300 hover:scale-[1.02] hover:bg-[#D4AF37] hover:shadow-[#C5A059]/25 active:scale-[0.98] sm:w-auto"
                    >
                        <MessageCircleIcon className="size-4" />
                        Konsultasi via WhatsApp
                    </a>

                    <a
                        href="#corporate"
                        onClick={(e) => handleSmoothScroll(e, '#corporate')}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#FAF7F2]/40 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-[#FAF7F2] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#FAF7F2]/10 active:scale-[0.98] sm:w-auto"
                    >
                        Ajukan Penawaran Corporate
                        <ArrowUpRightIcon className="size-4 text-[#C5A059]" />
                    </a>
                </div>
            </div>

            {/* ── Zona 2: Grid Footer 3 Kolom ──────────────────────────────────── */}
            <div className="border-t border-[#C5A059]/25">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 md:gap-10">
                    {/* Kolom 1: Brand & Medsos */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img
                                src="/asset/logo/Logo_galu&co.png"
                                alt="Galuh & Co."
                                loading="lazy"
                                decoding="async"
                                className="h-10 w-auto object-contain sm:h-12"
                            />
                        </div>
                        <p className="font-sans text-xs leading-relaxed font-light text-[#FAF7F2]/75 sm:text-sm">
                            House of Curated Luxury Hampers &amp; Corporate
                            Gifting. Merangkai estetika, kehangatan rasa, dan
                            ketulusan hati dalam setiap bingkisan istimewa.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://instagram.com/galuh.and.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-[#FAF7F2] transition-colors hover:border-[#C5A059] hover:bg-[#C5A059]/10 hover:text-[#C5A059]"
                            >
                                <InstagramIcon className="size-4 text-[#C5A059]" />
                                <span>@galuh.and.co</span>
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Navigasi Cepat */}
                    <div>
                        <h4 className="font-serif text-lg font-medium text-[#C5A059]">
                            Navigasi
                        </h4>
                        <ul className="mt-4 space-y-2.5 font-sans text-xs sm:text-sm">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) =>
                                            handleSmoothScroll(e, link.href)
                                        }
                                        className="text-[#FAF7F2]/75 transition-colors duration-200 hover:text-[#C5A059]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 3: Workshop Studio & Kontak */}
                    <div className="space-y-3 font-sans text-xs text-[#FAF7F2]/80 sm:text-sm">
                        <h4 className="font-serif text-lg font-medium text-[#C5A059]">
                            Studio &amp; Kontak Resmi
                        </h4>

                        <div className="flex items-start gap-3 pt-1">
                            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-[#C5A059]" />
                            <span>
                                Jl. Gunawarman No. 42, Kebayoran Baru, Jakarta
                                Selatan 12110
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ClockIcon className="size-4 shrink-0 text-[#C5A059]" />
                            <span>Senin – Sabtu, 09.00 – 18.00 WIB</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <PhoneIcon className="size-4 shrink-0 text-[#C5A059]" />
                            <a
                                href="https://wa.me/6281779839434"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#C5A059]"
                            >
                                +62 817-7983-9434
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <MailIcon className="size-4 shrink-0 text-[#C5A059]" />
                            <a
                                href="mailto:hello@galuhco.id"
                                className="transition-colors hover:text-[#C5A059]"
                            >
                                hello@galuhco.id
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Zona 3: Baris Copyright ──────────────────────────────────────── */}
            <div className="border-t border-[#FAF7F2]/10 py-6 text-center">
                <p className="font-sans text-xs text-[#FAF7F2]/60">
                    &copy; {new Date().getFullYear()} GALUH &amp; CO. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
