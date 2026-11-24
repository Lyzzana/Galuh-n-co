import { Link, useForm } from '@inertiajs/react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    ArrowRightIcon,
    BriefcaseIcon,
    Building2Icon,
    FileSpreadsheetIcon,
    SendIcon,
    SparklesIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import B2BCustomizerController from '@/actions/App/Http/Controllers/B2BCustomizerController';
import { getCmsText, type SectionContent } from '@/components/landing/cms';
import SectionDivider from '@/components/landing/SectionDivider';
import type { PartnerItem } from '@/pages/welcome';

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

export default function CorporateSection({
    partners = [],
    content,
}: {
    partners?: PartnerItem[];
    content?: SectionContent;
}) {
    const eyebrow = getCmsText(content, 'eyebrow', 'Layanan Korporasi');
    const title = getCmsText(
        content,
        'title',
        'Solusi Corporate Gifting & Kustomisasi Berskala Besar',
    );
    const description = getCmsText(
        content,
        'description',
        'Kami berpengalaman mendampingi perusahaan terkemuka dalam menyusun bingkisan hari raya, apresiasi mitra bisnis, maupun souvenir VIP event dengan efisiensi dan estetika premium.',
    );
    const formEyebrow = getCmsText(
        content,
        'form_eyebrow',
        'Formulir Kerjasama',
    );
    const formTitle = getCmsText(
        content,
        'form_title',
        'Ajukan Penawaran Corporate',
    );
    const formDescription = getCmsText(
        content,
        'form_description',
        'Dapatkan proposal katalog khusus, sampel bahan, dan skema harga spesial skala korporasi.',
    );
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        company: '',
        email: '',
        whatsapp_number: '',
        estimated_quantity: '',
        budget_per_package: '',
        needed_date: '',
        notes: '',
        website: '', // honeypot
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inquiries', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    'Terima kasih! Permintaan penawaran corporate Anda telah kami terima. Tim kami akan segera menghubungi Anda.',
                );
                reset();
            },
            onError: () => {
                toast.error(
                    'Mohon lengkapi seluruh isian formulir dengan benar.',
                );
            },
        });
    };

    return (
        <section
            id="corporate"
            className="relative scroll-mt-20 overflow-hidden bg-[#16233B] text-[#F2EBDC]"
        >
            {/* Latar gradasi radial atmosferik halus */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
                <div
                    className="absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(168,139,84,0.08) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute right-0 bottom-0 h-[480px] w-[480px] rounded-full blur-3xl"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(30,47,77,0.65) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="relative z-10">
                <SectionDivider variant="dark" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
                    {/* Sisi Kiri: Formulir Inquiry Corporate (7 Kolom) — Soft Navy Elevated Card */}
                    <motion.div
                        variants={FADE_UP_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-3xl border border-[#A88B54]/35 bg-[#1E2F4D] p-6 shadow-[0_24px_60px_-15px_rgba(6,12,24,0.65),inset_0_1px_0_rgba(242,235,220,0.06)] sm:p-10 lg:col-span-7"
                    >
                        <div className="mb-6">
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#F2EBDC]/85 uppercase">
                                {formEyebrow}
                            </span>
                            <h3 className="mt-1 font-serif text-2xl font-normal tracking-normal text-[#F2EBDC] sm:text-3xl">
                                {formTitle}
                            </h3>
                            <p className="mt-2 font-sans text-xs font-normal text-[#F2EBDC]/80 sm:text-sm">
                                {formDescription}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Honeypot field (hidden) */}
                            <input
                                type="text"
                                name="website"
                                value={data.website}
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="corp_name"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Nama Lengkap PIC *
                                    </label>
                                    <input
                                        id="corp_name"
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="cth. Sarah Wijaya"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_company"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Nama Perusahaan / Organisasi *
                                    </label>
                                    <input
                                        id="corp_company"
                                        type="text"
                                        required
                                        value={data.company}
                                        onChange={(e) =>
                                            setData('company', e.target.value)
                                        }
                                        placeholder="cth. PT Mahakarya Nusantara"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.company && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.company}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="corp_email"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Alamat Email Kantor *
                                    </label>
                                    <input
                                        id="corp_email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="sarah@perusahaan.com"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_wa"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Nomor WhatsApp *
                                    </label>
                                    <input
                                        id="corp_wa"
                                        type="tel"
                                        required
                                        value={data.whatsapp_number}
                                        onChange={(e) =>
                                            setData(
                                                'whatsapp_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="081234567890"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.whatsapp_number && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.whatsapp_number}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="corp_qty"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Estimasi Jumlah (Box) *
                                    </label>
                                    <input
                                        id="corp_qty"
                                        type="number"
                                        min={1}
                                        required
                                        value={data.estimated_quantity}
                                        onChange={(e) =>
                                            setData(
                                                'estimated_quantity',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="cth. 50"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.estimated_quantity && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.estimated_quantity}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_budget"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Budget per Box (Rp) *
                                    </label>
                                    <input
                                        id="corp_budget"
                                        type="number"
                                        min={50000}
                                        step={10000}
                                        required
                                        value={data.budget_per_package}
                                        onChange={(e) =>
                                            setData(
                                                'budget_per_package',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="cth. 500000"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.budget_per_package && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.budget_per_package}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_date"
                                        className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                    >
                                        Tanggal Dibutuhkan *
                                    </label>
                                    <input
                                        id="corp_date"
                                        type="date"
                                        required
                                        value={data.needed_date}
                                        onChange={(e) =>
                                            setData(
                                                'needed_date',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] [color-scheme:dark] transition-all outline-none focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                    />
                                    {errors.needed_date && (
                                        <p className="mt-1 font-sans text-xs text-rose-300">
                                            {errors.needed_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="corp_notes"
                                    className="block font-sans text-xs font-medium text-[#F2EBDC]"
                                >
                                    Catatan / Kebutuhan Khusus (Opsional)
                                </label>
                                <textarea
                                    id="corp_notes"
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData('notes', e.target.value)
                                    }
                                    placeholder="Tuliskan jika memerlukan custom kartu ucapan, logo perusahaan, pengiriman multi-alamat, dsb."
                                    className="mt-1.5 w-full rounded-xl border border-[#A88B54]/30 bg-[#16233B]/80 px-3.5 py-2.5 font-sans text-sm text-[#F2EBDC] transition-all outline-none placeholder:text-[#F2EBDC]/50 focus:border-[#A88B54] focus:bg-[#16233B] focus:ring-1 focus:ring-[#A88B54]"
                                />
                                {errors.notes && (
                                    <p className="mt-1 font-sans text-xs text-rose-300">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A88B54] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#16233B] shadow-lg shadow-black/25 transition-all duration-300 hover:scale-[1.01] hover:bg-[#B89B64] active:scale-[0.99] disabled:opacity-60"
                            >
                                <SendIcon className="size-4 text-[#16233B]" />
                                {processing
                                    ? 'Mengirim Permintaan...'
                                    : 'Kirim Pengajuan Kerjasama'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Sisi Kanan: Fitur Layanan Korporasi (5 Kolom) */}
                    <motion.div
                        variants={FADE_UP_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col justify-between space-y-8 lg:col-span-5"
                    >
                        <div>
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A88B54] uppercase">
                                {eyebrow}
                            </span>
                            <h2 className="mt-2 font-serif text-3xl leading-tight font-normal tracking-normal text-[#F2EBDC] sm:text-4xl">
                                {title}
                            </h2>
                            <p className="mt-4 font-sans text-sm leading-relaxed font-normal text-[#F2EBDC]/80">
                                {description}
                            </p>
                        </div>

                        {/* List Layanan Unggulan Corporate */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-2xl border border-[#A88B54]/30 bg-[#1E2F4D] p-4 shadow-[0_12px_32px_-12px_rgba(6,12,24,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A88B54]/55">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#A88B54]/35 bg-[#16233B] text-[#A88B54]">
                                    <SparklesIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-semibold text-[#F2EBDC]">
                                        Custom Sleeve &amp; Logo Branding
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-normal text-[#F2EBDC]/80">
                                        Aksen foil logo korporat, kartu ucapan
                                        resmi, dan pita dengan warna identitas
                                        perusahaan Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#A88B54]/30 bg-[#1E2F4D] p-4 shadow-[0_12px_32px_-12px_rgba(6,12,24,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A88B54]/55">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#A88B54]/35 bg-[#16233B] text-[#A88B54]">
                                    <FileSpreadsheetIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-semibold text-[#F2EBDC]">
                                        Multi-Address Delivery Service
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-normal text-[#F2EBDC]/80">
                                        Kirim ke ratusan hingga ribuan alamat
                                        klien sekaligus cukup dengan melampirkan
                                        satu file data spreadsheet.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#A88B54]/30 bg-[#1E2F4D] p-4 shadow-[0_12px_32px_-12px_rgba(6,12,24,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A88B54]/55">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#A88B54]/35 bg-[#16233B] text-[#A88B54]">
                                    <Building2Icon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-semibold text-[#F2EBDC]">
                                        Invoice Resmi &amp; Administrasi Lengkap
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-normal text-[#F2EBDC]/80">
                                        Penerbitan dokumen penawaran resmi,
                                        faktur pajak, dan tata kelola PO yang
                                        mudah serta akuntabel.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#A88B54]/30 bg-[#1E2F4D] p-4 shadow-[0_12px_32px_-12px_rgba(6,12,24,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A88B54]/55">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#A88B54]/35 bg-[#16233B] text-[#A88B54]">
                                    <BriefcaseIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-semibold text-[#F2EBDC]">
                                        Dedicated Corporate Account Manager
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-normal text-[#F2EBDC]/80">
                                        Satu kontak khusus yang sigap memantau
                                        seluruh proses dari konsultasi hingga
                                        laporan bukti terima pengiriman.
                                    </p>
                                </div>
                            </div>

                            {/* CTA 3D Product Customizer */}
                            <div className="rounded-2xl border border-[#A88B54]/45 bg-gradient-to-br from-[#1E2F4D] to-[#16233B] p-5 shadow-lg">
                                <p className="font-serif text-lg font-semibold text-[#F2EBDC]">
                                    Rancang Kotak Hampers 3D Anda
                                </p>
                                <p className="mt-1 font-sans text-xs text-[#F2EBDC]/80">
                                    Pratinjau 360°, pilih warna kotak &amp; pita
                                    satin. Khusus akun Corporate B2B tersedia
                                    fitur cetak logo &amp; video ucapan QR Code.
                                </p>
                                <Link
                                    href={B2BCustomizerController.index()}
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#A88B54] px-5 py-2.5 font-sans text-xs font-semibold text-[#16233B] transition-colors hover:bg-[#B89B64]"
                                >
                                    <span>Buka 3D Customizer</span>
                                    <ArrowRightIcon className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Partner Marquee ─────────────────────────────────── */}
                {partners.length > 0 && (
                    <div className="mt-16 md:mt-20">
                        {/* Divider dengan aksen muted brass */}
                        <div className="mx-auto mb-8 flex max-w-7xl items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A88B54]/45 to-[#A88B54]/20" />
                            <span className="shrink-0 font-sans text-xs font-semibold tracking-[0.22em] text-[#A88B54] uppercase">
                                Dipercaya Oleh
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#A88B54]/45 to-[#A88B54]/20" />
                        </div>

                        {/* Marquee track */}
                        <div
                            className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                            aria-label="Daftar partner korporat"
                            role="region"
                        >
                            {/* Duplikasi 2× agar looping mulus */}
                            <div
                                className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]"
                                aria-hidden="true"
                            >
                                {[...partners, ...partners].map(
                                    (partner, index) => (
                                        <PartnerCard
                                            key={`${partner.id}-${index}`}
                                            partner={partner}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <SectionDivider variant="dark" />
            </div>
        </section>
    );
}

function PartnerCard({ partner }: { partner: PartnerItem }) {
    return (
        <div className="flex shrink-0 flex-col items-center gap-2.5">
            {/* Logo container */}
            <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-[#A88B54]/35 bg-[#FAF7F0] px-3 py-2 shadow-[0_8px_24px_-8px_rgba(6,12,24,0.45)]">
                {partner.logo_url ? (
                    <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                    />
                ) : (
                    /* Placeholder monogram jika logo belum diupload */
                    <span className="font-serif text-lg font-semibold text-[#16233B]">
                        {partner.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>

            {/* Nama perusahaan */}
            <span className="max-w-28 truncate font-sans text-xs font-medium text-[#F2EBDC]/85">
                {partner.name}
            </span>
        </div>
    );
}
