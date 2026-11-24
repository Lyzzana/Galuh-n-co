import { Head, router } from '@inertiajs/react';
import { SaveIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AdminLandingContentController from '@/actions/App/Http/Controllers/Admin/LandingContentController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils';

interface FieldSchema {
    key: string;
    label: string;
    type: 'text' | 'textarea';
    defaultValue: string;
    helper?: string;
}

interface SectionSchema {
    id: string;
    title: string;
    description: string;
    fields: FieldSchema[];
}

const SECTION_SCHEMAS: SectionSchema[] = [
    {
        id: 'hero',
        title: 'Hero Banner',
        description: 'Teks utama pembuka halaman depan dan tombol CTA.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow Badge',
                type: 'text',
                defaultValue: 'Curated Luxury Hampers & Corporate Gifting',
            },
            {
                key: 'headline_line_1',
                label: 'Headline Baris 1',
                type: 'text',
                defaultValue: 'Merangkai Kehangatan',
            },
            {
                key: 'headline_line_2',
                label: 'Headline Baris 2 (sebelum kata berjalan)',
                type: 'text',
                defaultValue: 'dalam Setiap Bingkisan',
            },
            {
                key: 'rotating_words',
                label: 'Kata Berjalan (pisahkan dengan koma)',
                type: 'text',
                defaultValue: 'Istimewa,Korporat,Hari Raya,Pernikahan',
                helper: 'Contoh: Istimewa,Korporat,Hari Raya,Pernikahan',
            },
            {
                key: 'subheadline',
                label: 'Subheadline',
                type: 'textarea',
                defaultValue:
                    'Kurasi hampers eksklusif dengan kemasan penuh estetika dan sentuhan personal untuk merayakan momen berharga bersama orang terdekat maupun relasi bisnis.',
            },
            {
                key: 'primary_cta_label',
                label: 'Label Tombol Utama',
                type: 'text',
                defaultValue: 'Lihat Koleksi',
            },
            {
                key: 'secondary_cta_label',
                label: 'Label Tombol Sekunder',
                type: 'text',
                defaultValue: 'Pesan via WhatsApp',
            },
        ],
    },
    {
        id: 'about',
        title: 'Tentang Kami',
        description: 'Narasi filosofi Galuh & Co. dan badge kualitas.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Tentang Galuh & Co.',
            },
            {
                key: 'title',
                label: 'Judul Utama',
                type: 'text',
                defaultValue: 'Lebih dari Sekadar Hadiah,',
            },
            {
                key: 'title_italic',
                label: 'Judul Lanjutan (Italic)',
                type: 'text',
                defaultValue: 'Sebuah Pengalaman Membuka Kebahagiaan',
            },
            {
                key: 'description',
                label: 'Paragraf Cerita Brand',
                type: 'textarea',
                defaultValue:
                    'Kami percaya setiap bingkisan membawa cerita dan ketulusan pengirimnya. Di Galuh & Co., setiap elemen dipilih dengan saksama—mulai dari kualitas isi, keharuman kemasan, hingga kartu ucapan tulisan tangan—untuk menciptakan kesan yang tak terlupakan.',
            },
            {
                key: 'badge_title',
                label: 'Judul Floating Badge',
                type: 'text',
                defaultValue: '100% Curated Quality',
            },
            {
                key: 'badge_subtitle',
                label: 'Subjudul Floating Badge',
                type: 'text',
                defaultValue: 'Artisanal, Elegant & Personal',
            },
        ],
    },
    {
        id: 'catalog',
        title: 'Katalog Koleksi',
        description: 'Header section katalog produk di halaman depan.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Koleksi Eksklusif',
            },
            {
                key: 'title',
                label: 'Judul Section',
                type: 'text',
                defaultValue: 'Kurasi Hampers untuk Setiap Momen',
            },
            {
                key: 'description',
                label: 'Deskripsi Singkat',
                type: 'textarea',
                defaultValue:
                    'Setiap koleksi dirangkai dengan harmoni rasa, aroma, dan estetika visual untuk menyampaikan apresiasi tertinggi.',
            },
            {
                key: 'cta_label',
                label: 'Label Tombol Katalog Lengkap',
                type: 'text',
                defaultValue: 'Lihat Katalog Lengkap',
            },
        ],
    },
    {
        id: 'why_us',
        title: 'Keunggulan',
        description: 'Narasi standar kualitas dan statistik pengiriman.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Standar Keunggulan Kami',
            },
            {
                key: 'title',
                label: 'Judul Utama',
                type: 'text',
                defaultValue: 'Detail Sempurna dalam',
            },
            {
                key: 'title_italic',
                label: 'Judul Lanjutan (Italic)',
                type: 'text',
                defaultValue: 'Setiap Sentuhan Bingkisan',
            },
            {
                key: 'description',
                label: 'Deskripsi Keunggulan',
                type: 'textarea',
                defaultValue:
                    'Kami menggabungkan seni kurasi artisan dengan keandalan pengerjaan tingkat tinggi untuk memastikan setiap bingkisan menghadirkan aura kemewahan sejak pertama kali diterima.',
            },
            {
                key: 'stat_number',
                label: 'Angka Statistik Badge',
                type: 'text',
                defaultValue: '5.000+',
            },
            {
                key: 'stat_label',
                label: 'Judul Statistik',
                type: 'text',
                defaultValue: 'Bingkisan Mewah Terkirim',
            },
            {
                key: 'stat_sublabel',
                label: 'Keterangan Statistik',
                type: 'text',
                defaultValue: 'Ke Seluruh Penjuru Nusantara',
            },
        ],
    },
    {
        id: 'how_to_order',
        title: 'Cara Pesan',
        description: 'Header 4 langkah proses pemesanan hampers.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Proses Pemesanan',
            },
            {
                key: 'title',
                label: 'Judul Section',
                type: 'text',
                defaultValue: 'Kemudahan Memesan dalam 4 Langkah',
            },
            {
                key: 'description',
                label: 'Deskripsi',
                type: 'textarea',
                defaultValue:
                    'Dari pemilihan hingga pengantaran, tim kurator kami siap membantu mewujudkan bingkisan terbaik tanpa kerumitan.',
            },
        ],
    },
    {
        id: 'corporate',
        title: 'Corporate B2B',
        description: 'Teks section layanan korporasi & formulir penawaran.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow Layanan',
                type: 'text',
                defaultValue: 'Layanan Korporasi',
            },
            {
                key: 'title',
                label: 'Judul Layanan Korporasi',
                type: 'text',
                defaultValue:
                    'Solusi Corporate Gifting & Kustomisasi Berskala Besar',
            },
            {
                key: 'description',
                label: 'Deskripsi Layanan Korporasi',
                type: 'textarea',
                defaultValue:
                    'Kami berpengalaman mendampingi perusahaan terkemuka dalam menyusun bingkisan hari raya, apresiasi mitra bisnis, maupun souvenir VIP event dengan efisiensi dan estetika premium.',
            },
            {
                key: 'form_eyebrow',
                label: 'Eyebrow Formulir',
                type: 'text',
                defaultValue: 'Formulir Kerjasama',
            },
            {
                key: 'form_title',
                label: 'Judul Formulir',
                type: 'text',
                defaultValue: 'Ajukan Penawaran Corporate',
            },
            {
                key: 'form_description',
                label: 'Deskripsi Formulir',
                type: 'textarea',
                defaultValue:
                    'Dapatkan proposal katalog khusus, sampel bahan, dan skema harga spesial skala korporasi.',
            },
        ],
    },
    {
        id: 'testimonials',
        title: 'Testimoni',
        description: 'Judul dan pengantar section cerita penerima.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Cerita & Apresiasi',
            },
            {
                key: 'title',
                label: 'Judul Section',
                type: 'text',
                defaultValue: 'Kehangatan yang Dirasakan Penerima',
            },
            {
                key: 'description',
                label: 'Deskripsi',
                type: 'textarea',
                defaultValue:
                    'Untaian kesan tulus dari mereka yang telah mempercayakan momen berharga bersama Galuh & Co.',
            },
        ],
    },
    {
        id: 'faq',
        title: 'FAQ',
        description: 'Judul section pertanyaan umum pemesanan.',
        fields: [
            {
                key: 'eyebrow',
                label: 'Eyebrow',
                type: 'text',
                defaultValue: 'Pertanyaan Umum',
            },
            {
                key: 'title',
                label: 'Judul Section',
                type: 'text',
                defaultValue: 'Informasi Seputar Pemesanan',
            },
            {
                key: 'description',
                label: 'Deskripsi',
                type: 'textarea',
                defaultValue:
                    'Segala hal penting yang perlu Anda ketahui mengenai layanan kurasi, proses pengemasan, dan kebijakan pengiriman kami.',
            },
        ],
    },
    {
        id: 'footer',
        title: 'CTA Penutup & Footer',
        description: 'Banner ajakan penutup serta informasi studio & kontak.',
        fields: [
            {
                key: 'cta_eyebrow',
                label: 'Eyebrow CTA Penutup',
                type: 'text',
                defaultValue: 'Mulai Kolaborasi Anda',
            },
            {
                key: 'cta_title',
                label: 'Judul CTA Penutup',
                type: 'text',
                defaultValue: 'Siap Merangkai Bingkisan',
            },
            {
                key: 'cta_title_italic',
                label: 'Judul CTA Lanjutan (Italic)',
                type: 'text',
                defaultValue: 'Berkesan Hari Ini?',
            },
            {
                key: 'cta_description',
                label: 'Deskripsi CTA Penutup',
                type: 'textarea',
                defaultValue:
                    'Konsultasikan kebutuhan hampers personal maupun corporate gifting bersama kurator Galuh & Co. Kami siap mewujudkan bingkisan istimewa Anda dengan sentuhan penuh kehangatan.',
            },
            {
                key: 'brand_tagline',
                label: 'Tagline Brand di Footer',
                type: 'textarea',
                defaultValue:
                    'House of Curated Luxury Hampers & Corporate Gifting. Merangkai estetika, kehangatan rasa, dan ketulusan hati dalam setiap bingkisan istimewa.',
            },
            {
                key: 'address',
                label: 'Alamat Studio',
                type: 'text',
                defaultValue:
                    'Jl. Gunawarman No. 42, Kebayoran Baru, Jakarta Selatan 12110',
            },
            {
                key: 'hours',
                label: 'Jam Operasional',
                type: 'text',
                defaultValue: 'Senin – Sabtu, 09.00 – 18.00 WIB',
            },
            {
                key: 'phone_display',
                label: 'Nomor Telepon Tampil',
                type: 'text',
                defaultValue: '+62 817-7983-9434',
            },
            {
                key: 'email',
                label: 'Email Resmi',
                type: 'text',
                defaultValue: 'hello@galuhco.id',
            },
            {
                key: 'instagram_handle',
                label: 'Instagram Handle',
                type: 'text',
                defaultValue: '@galuh.and.co',
            },
        ],
    },
];

type GroupedContents = Record<string, Record<string, string | null>>;

function buildInitialValues(contents: GroupedContents): Record<string, string> {
    const map: Record<string, string> = {};
    for (const section of SECTION_SCHEMAS) {
        for (const field of section.fields) {
            const compositeKey = `${section.id}.${field.key}`;
            const existing = contents[section.id]?.[field.key];
            map[compositeKey] =
                existing !== undefined && existing !== null
                    ? existing
                    : field.defaultValue;
        }
    }
    return map;
}

export default function LandingContentCms({
    contents = {},
}: {
    contents?: GroupedContents;
}) {
    const [activeSectionId, setActiveSectionId] = useState<string>(
        SECTION_SCHEMAS[0].id,
    );
    const [values, setValues] = useState<Record<string, string>>(() =>
        buildInitialValues(contents),
    );
    const [saving, setSaving] = useState(false);

    const activeSection =
        SECTION_SCHEMAS.find((s) => s.id === activeSectionId) ??
        SECTION_SCHEMAS[0];

    const handleFieldChange = (
        sectionId: string,
        key: string,
        nextValue: string,
    ) => {
        setValues((prev) => ({
            ...prev,
            [`${sectionId}.${key}`]: nextValue,
        }));
    };

    const handleSaveSection = (sectionOnly: boolean) => {
        const targetSections = sectionOnly ? [activeSection] : SECTION_SCHEMAS;

        const payload = targetSections.flatMap((section) =>
            section.fields.map((field) => ({
                section: section.id,
                key: field.key,
                value: values[`${section.id}.${field.key}`] ?? '',
                type: field.type,
            })),
        );

        setSaving(true);
        router.post(
            AdminLandingContentController.update().url,
            { contents: payload },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        sectionOnly
                            ? `Konten section "${activeSection.title}" berhasil disimpan.`
                            : 'Seluruh konten landing page berhasil disimpan.',
                    );
                },
                onError: () => {
                    toast.error(
                        'Gagal menyimpan perubahan konten. Periksa kembali isian Anda.',
                    );
                },
                onFinish: () => {
                    setSaving(false);
                },
            },
        );
    };

    return (
        <>
            <Head title="CMS Konten Landing Page" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                            <SparklesIcon className="size-3.5" />
                            CMS Halaman Depan
                        </div>
                        <h1 className="mt-2 text-xl font-bold text-gray-900">
                            Konten Landing Page
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Ubah teks tajuk, deskripsi, dan informasi kontak
                            halaman depan Galuh &amp; Co. secara dinamis.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={saving}
                            onClick={() => handleSaveSection(true)}
                            className="gap-2 rounded-xl"
                        >
                            <SaveIcon className="size-4" />
                            Simpan Section Ini
                        </Button>
                        <Button
                            type="button"
                            disabled={saving}
                            onClick={() => handleSaveSection(false)}
                            className="gap-2 rounded-xl bg-[#16233B] text-[#F2EBDC] hover:bg-[#1F304F]"
                        >
                            <SaveIcon className="size-4" />
                            {saving ? 'Menyimpan...' : 'Simpan Semua'}
                        </Button>
                    </div>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2">
                    {SECTION_SCHEMAS.map((section) => {
                        const isActive = section.id === activeSection.id;
                        return (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => setActiveSectionId(section.id)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-xs font-semibold transition-all',
                                    isActive
                                        ? 'bg-[#16233B] text-[#F2EBDC] shadow-sm'
                                        : 'border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                                )}
                            >
                                {section.title}
                            </button>
                        );
                    })}
                </div>

                {/* Active Section Editor Card */}
                <div className="rounded-2xl border border-[#A88B54]/25 bg-[#FAF7F0] p-6 shadow-xs sm:p-8">
                    <div className="border-b border-[#A88B54]/20 pb-4">
                        <h2 className="font-serif text-2xl font-semibold text-[#16233B]">
                            {activeSection.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#6E675D] sm:text-sm">
                            {activeSection.description}
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                        {activeSection.fields.map((field) => {
                            const fieldValue =
                                values[`${activeSection.id}.${field.key}`] ??
                                '';
                            const isTextarea = field.type === 'textarea';
                            return (
                                <div
                                    key={field.key}
                                    className={cn(
                                        'grid gap-1.5',
                                        isTextarea && 'md:col-span-2',
                                    )}
                                >
                                    <Label
                                        htmlFor={`${activeSection.id}_${field.key}`}
                                        className="text-xs font-semibold text-[#16233B]"
                                    >
                                        {field.label}
                                    </Label>
                                    {isTextarea ? (
                                        <Textarea
                                            id={`${activeSection.id}_${field.key}`}
                                            rows={3}
                                            value={fieldValue}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    activeSection.id,
                                                    field.key,
                                                    e.target.value,
                                                )
                                            }
                                            className="border-[#A88B54]/30 bg-white text-sm text-[#16233B]"
                                        />
                                    ) : (
                                        <Input
                                            id={`${activeSection.id}_${field.key}`}
                                            value={fieldValue}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    activeSection.id,
                                                    field.key,
                                                    e.target.value,
                                                )
                                            }
                                            className="border-[#A88B54]/30 bg-white text-sm text-[#16233B]"
                                        />
                                    )}
                                    {field.helper && (
                                        <p className="text-[11px] text-[#6E675D]">
                                            {field.helper}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
