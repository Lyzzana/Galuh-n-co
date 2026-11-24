import {
    ArrowUpRightIcon,
    ClockIcon,
    InstagramIcon,
    MailIcon,
    MapPinIcon,
    MessageCircleIcon,
    PhoneIcon,
} from 'lucide-react';
import { getCmsText, type SectionContent } from '@/components/landing/cms';

const WA_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

const QUICK_LINKS = [
    { href: '#tentang', label: 'Tentang Kami' },
    { href: '#koleksi', label: 'Koleksi Hampers' },
    { href: '#cara-pesan', label: 'Cara Pemesanan' },
    { href: '#corporate', label: 'Corporate Gifting' },
    { href: '#faq', label: 'Pertanyaan Umum (FAQ)' },
];

export default function FooterSection({
    content,
}: {
    content?: SectionContent;
}) {
    const ctaEyebrow = getCmsText(
        content,
        'cta_eyebrow',
        'Mulai Kolaborasi Anda',
    );
    const ctaTitle = getCmsText(
        content,
        'cta_title',
        'Siap Merangkai Bingkisan',
    );
    const ctaTitleItalic = getCmsText(
        content,
        'cta_title_italic',
        'Berkesan Hari Ini?',
    );
    const ctaDescription = getCmsText(
        content,
        'cta_description',
        'Konsultasikan kebutuhan hampers personal maupun corporate gifting bersama kurator Galuh & Co. Kami siap mewujudkan bingkisan istimewa Anda dengan sentuhan penuh kehangatan.',
    );
    const brandTagline = getCmsText(
        content,
        'brand_tagline',
        'House of Curated Luxury Hampers & Corporate Gifting. Merangkai estetika, kehangatan rasa, dan ketulusan hati dalam setiap bingkisan istimewa.',
    );
    const address = getCmsText(
        content,
        'address',
        'Jl. Gunawarman No. 42, Kebayoran Baru, Jakarta Selatan 12110',
    );
    const hours = getCmsText(
        content,
        'hours',
        'Senin – Sabtu, 09.00 – 18.00 WIB',
    );
    const phoneDisplay = getCmsText(
        content,
        'phone_display',
        '+62 817-7983-9434',
    );
    const email = getCmsText(content, 'email', 'hello@galuhco.id');
    const instagramHandle = getCmsText(
        content,
        'instagram_handle',
        '@galuh.and.co',
    );
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
        <footer className="relative bg-[#16233B] text-[#F2EBDC]">
            {/* ── Garis Aksen Pita Brass Tipis dengan Ornamen Simpul di Batas Atas ── */}
            <div className="relative border-t border-[#A88B54]/40">
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center justify-center">
                    <div className="flex items-center gap-1.5 rounded-full border border-[#A88B54] bg-[#16233B] px-3 py-1 shadow-md">
                        <span className="size-1 rounded-full bg-[#A88B54]" />
                        <span className="font-serif text-[10px] tracking-[0.25em] text-[#F2EBDC] uppercase">
                            Galuh &amp; Co.
                        </span>
                        <span className="size-1 rounded-full bg-[#A88B54]" />
                    </div>
                </div>
            </div>

            {/* ── Zona 1: Banner CTA Penutup ────────────────────────────────────── */}
            <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
                <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A88B54] uppercase">
                    {ctaEyebrow}
                </span>

                <h2 className="mt-3 font-serif text-3xl leading-tight font-normal tracking-normal text-[#F2EBDC] sm:text-4xl lg:text-5xl">
                    {ctaTitle} <span className="italic">{ctaTitleItalic}</span>
                </h2>

                <p className="mt-4 font-sans text-sm leading-relaxed font-normal text-[#F2EBDC]/85 sm:text-base">
                    {ctaDescription}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A88B54] px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#16233B] shadow-lg shadow-[#A88B54]/15 transition-all duration-300 hover:scale-[1.02] hover:bg-[#B89B64] hover:shadow-[#A88B54]/25 active:scale-[0.98] sm:w-auto"
                    >
                        <MessageCircleIcon className="size-4" />
                        Konsultasi via WhatsApp
                    </a>

                    <a
                        href="#corporate"
                        onClick={(e) => handleSmoothScroll(e, '#corporate')}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F2EBDC]/45 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-[#F2EBDC] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#F2EBDC]/10 active:scale-[0.98] sm:w-auto"
                    >
                        Ajukan Penawaran Corporate
                        <ArrowUpRightIcon className="size-4 text-[#A88B54]" />
                    </a>
                </div>
            </div>

            {/* ── Zona 2: Grid Footer 3 Kolom ──────────────────────────────────── */}
            <div className="border-t border-[#A88B54]/25">
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
                        <p className="font-sans text-xs leading-relaxed font-normal tracking-normal text-[#F2EBDC]/85 sm:text-sm">
                            {brandTagline}
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://instagram.com/galuh.and.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[#A88B54]/45 bg-[#F2EBDC]/5 px-4 py-2 font-sans text-xs font-medium text-[#F2EBDC] transition-colors hover:border-[#A88B54] hover:bg-[#A88B54]/15"
                            >
                                <InstagramIcon className="size-4 text-[#A88B54]" />
                                <span>{instagramHandle}</span>
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Navigasi Cepat */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-[#A88B54]">
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
                                        className="text-[#F2EBDC]/85 transition-colors duration-200 hover:text-[#A88B54]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 3: Workshop Studio & Kontak */}
                    <div className="space-y-3 font-sans text-xs text-[#F2EBDC]/85 sm:text-sm">
                        <h4 className="font-serif text-lg font-semibold text-[#A88B54]">
                            Studio &amp; Kontak Resmi
                        </h4>

                        <div className="flex items-start gap-3 pt-1">
                            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-[#A88B54]" />
                            <span>{address}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ClockIcon className="size-4 shrink-0 text-[#A88B54]" />
                            <span>{hours}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <PhoneIcon className="size-4 shrink-0 text-[#A88B54]" />
                            <a
                                href="https://wa.me/6281779839434"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#A88B54]"
                            >
                                {phoneDisplay}
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <MailIcon className="size-4 shrink-0 text-[#A88B54]" />
                            <a
                                href={`mailto:${email}`}
                                className="transition-colors hover:text-[#A88B54]"
                            >
                                {email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Zona 3: Baris Copyright ──────────────────────────────────────── */}
            <div className="border-t border-[#F2EBDC]/15 py-6 text-center">
                <p className="font-sans text-xs text-[#F2EBDC]/75">
                    &copy; {new Date().getFullYear()} GALUH &amp; CO. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
