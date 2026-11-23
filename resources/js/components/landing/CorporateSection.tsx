import { useForm } from '@inertiajs/react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import {
    BriefcaseIcon,
    Building2Icon,
    FileSpreadsheetIcon,
    SendIcon,
    SparklesIcon,
} from 'lucide-react';
import { toast } from 'sonner';
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

export default function CorporateSection({ partners = [] }: { partners?: PartnerItem[] }) {
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
            className="scroll-mt-20 border-t border-[#E5DEC9]/60 bg-[#FAF7F2] py-20 md:py-28"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
                    {/* Sisi Kiri: Formulir Inquiry Corporate (7 Kolom) */}
                    <motion.div
                        variants={FADE_UP_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-3xl border border-[#C5A059]/35 bg-white p-6 shadow-xl sm:p-10 lg:col-span-7"
                    >
                        <div className="mb-6">
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                                Formulir Kerjasama
                            </span>
                            <h3 className="mt-1 font-serif text-2xl font-normal text-[#163828] sm:text-3xl">
                                Ajukan Penawaran Corporate
                            </h3>
                            <p className="mt-2 font-sans text-xs font-light text-[#6B5E55] sm:text-sm">
                                Dapatkan proposal katalog khusus, sampel bahan,
                                dan skema harga spesial skala korporasi.
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
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_company"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.company && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.company}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="corp_email"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_wa"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.whatsapp_number && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.whatsapp_number}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="corp_qty"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.estimated_quantity && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.estimated_quantity}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_budget"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.budget_per_package && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.budget_per_package}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="corp_date"
                                        className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                        className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    {errors.needed_date && (
                                        <p className="mt-1 font-sans text-xs text-red-600">
                                            {errors.needed_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="corp_notes"
                                    className="block font-sans text-xs font-medium text-[#2C1E16]"
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
                                    className="mt-1.5 w-full rounded-xl border border-[#E5DEC9] bg-[#FAF7F2]/50 px-3.5 py-2.5 font-sans text-sm text-[#2C1E16] transition-all outline-none placeholder:text-[#6B5E55]/50 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]"
                                />
                                {errors.notes && (
                                    <p className="mt-1 font-sans text-xs text-red-600">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#163828] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#FAF7F2] shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-[#122E21] active:scale-[0.99] disabled:opacity-60"
                            >
                                <SendIcon className="size-4 text-[#C5A059]" />
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
                            <span className="font-sans text-xs font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
                                Layanan Korporasi
                            </span>
                            <h2 className="mt-2 font-serif text-3xl leading-tight font-normal text-[#163828] sm:text-4xl">
                                Solusi Corporate Gifting &amp; Kustomisasi
                                Berskala Besar
                            </h2>
                            <p className="mt-4 font-sans text-sm leading-relaxed font-light text-[#6B5E55]">
                                Kami berpengalaman mendampingi perusahaan
                                terkemuka dalam menyusun bingkisan hari raya,
                                apresiasi mitra bisnis, maupun souvenir VIP
                                event dengan efisiensi dan estetika premium.
                            </p>
                        </div>

                        {/* List Layanan Unggulan Corporate */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-2xl border border-[#E5DEC9] bg-white/80 p-4 shadow-2xs">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#163828] text-[#C5A059]">
                                    <SparklesIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-medium text-[#2C1E16]">
                                        Custom Sleeve &amp; Logo Branding
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-light text-[#6B5E55]">
                                        Aksen foil logo korporat, kartu ucapan
                                        resmi, dan pita dengan warna identitas
                                        perusahaan Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#E5DEC9] bg-white/80 p-4 shadow-2xs">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#163828] text-[#C5A059]">
                                    <FileSpreadsheetIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-medium text-[#2C1E16]">
                                        Multi-Address Delivery Service
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-light text-[#6B5E55]">
                                        Kirim ke ratusan hingga ribuan alamat
                                        klien sekaligus cukup dengan melampirkan
                                        satu file data spreadsheet.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#E5DEC9] bg-white/80 p-4 shadow-2xs">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#163828] text-[#C5A059]">
                                    <Building2Icon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-medium text-[#2C1E16]">
                                        Invoice Resmi &amp; Administrasi Lengkap
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-light text-[#6B5E55]">
                                        Penerbitan dokumen penawaran resmi,
                                        faktur pajak, dan tata kelola PO yang
                                        mudah serta akuntabel.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-[#E5DEC9] bg-white/80 p-4 shadow-2xs">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#163828] text-[#C5A059]">
                                    <BriefcaseIcon className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-base font-medium text-[#2C1E16]">
                                        Dedicated Corporate Account Manager
                                    </h4>
                                    <p className="mt-1 font-sans text-xs font-light text-[#6B5E55]">
                                        Satu kontak khusus yang sigap memantau
                                        seluruh proses dari konsultasi hingga
                                        laporan bukti terima pengiriman.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Partner Marquee ─────────────────────────────────── */}
            {partners.length > 0 && (
                <div className="mt-16 md:mt-20">
                    {/* Divider dengan aksen champagne */}
                    <div className="mx-auto mb-8 flex max-w-7xl items-center gap-4 px-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]/20" />
                        <span className="shrink-0 font-sans text-xs font-semibold tracking-[0.22em] text-[#C5A059] uppercase">
                            Dipercaya Oleh
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]/20" />
                    </div>

                    {/* Marquee track */}
                    <div
                        className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                        aria-label="Daftar partner korporat"
                        role="region"
                    >
                        {/* Duplikasi 2× agar looping mulus */}
                        <div
                            className="animate-marquee group-hover:[animation-play-state:paused] flex w-max items-center gap-10"
                            aria-hidden="true"
                        >
                            {[...partners, ...partners].map((partner, index) => (
                                <PartnerCard key={`${partner.id}-${index}`} partner={partner} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function PartnerCard({ partner }: { partner: PartnerItem }) {
    return (
        <div className="flex shrink-0 flex-col items-center gap-2.5">
            {/* Logo container */}
            <div
                className="flex h-14 w-28 items-center justify-center rounded-xl border border-[#C5A059]/20 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm"
            >
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
                    <span className="font-serif text-lg font-semibold text-[#C5A059]/70">
                        {partner.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>

            {/* Nama perusahaan */}
            <span className="max-w-28 truncate font-sans text-xs font-medium text-[#6B5E55]">
                {partner.name}
            </span>
        </div>
    );
}
