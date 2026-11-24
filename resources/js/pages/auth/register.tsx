import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    Building2Icon,
    CheckIcon,
    EyeIcon,
    EyeOffIcon,
    UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { home, login } from '@/routes';
import { store as registerStore } from '@/routes/register';

type AccountRole = 'customer' | 'b2b';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        role: AccountRole;
        phone: string;
        company_name: string;
        password: string;
        password_confirmation: string;
    }>({
        name: '',
        email: '',
        role: 'customer',
        phone: '',
        company_name: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(registerStore().url, {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Daftar Akun — Galuh & Co." />

            <div className="min-h-screen bg-[#F2EBDC] px-4 py-10 font-sans text-[#16233B] antialiased selection:bg-[#A88B54]/25 selection:text-[#16233B] sm:px-6 lg:py-14">
                <div className="mx-auto max-w-xl">
                    {/* Back Link */}
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wider text-[#16233B] uppercase transition-colors hover:text-[#1F304F]"
                        >
                            <ArrowLeftIcon className="size-4" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                        <Link
                            href={login()}
                            className="font-sans text-xs font-semibold text-[#16233B] underline decoration-[#A88B54] underline-offset-4 hover:text-[#1F304F]"
                        >
                            Sudah punya akun? Masuk
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="overflow-hidden rounded-3xl border border-[#A88B54]/30 bg-[#FAF7F0] shadow-[0_20px_50px_-15px_rgba(22,35,59,0.16)]">
                        {/* Header Deep Navy */}
                        <div className="border-b border-[#A88B54]/30 bg-[#16233B] px-6 py-8 text-center text-[#F2EBDC] sm:px-10">
                            <Link
                                href={home()}
                                className="inline-flex items-center justify-center"
                            >
                                <img
                                    src="/asset/logo/Logo_galu&co.png"
                                    alt="Galuh & Co."
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                            <h1 className="mt-4 font-serif text-3xl font-normal tracking-normal text-[#F2EBDC]">
                                Buat Akun Galuh &amp; Co.
                            </h1>
                            <p className="mt-1.5 font-sans text-xs text-[#F2EBDC]/80 sm:text-sm">
                                Nikmati kemudahan memesan hampers mewah, buku
                                alamat, serta layanan khusus korporasi.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6 sm:p-10"
                        >
                            {/* Pilihan Tipe Akun */}
                            <div>
                                <span className="block font-sans text-xs font-semibold tracking-wider text-[#16233B] uppercase">
                                    Pilih Tipe Akun *
                                </span>
                                <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData('role', 'customer')
                                        }
                                        className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                                            data.role === 'customer'
                                                ? 'border-[#16233B] bg-[#16233B] text-[#F2EBDC] shadow-md'
                                                : 'border-[#A88B54]/30 bg-white/70 text-[#16233B] hover:border-[#A88B54]'
                                        }`}
                                    >
                                        <div
                                            className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                                                data.role === 'customer'
                                                    ? 'bg-[#A88B54] text-[#16233B]'
                                                    : 'bg-[#16233B]/10 text-[#16233B]'
                                            }`}
                                        >
                                            <UserIcon className="size-4.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-serif text-base font-semibold">
                                                Personal
                                            </p>
                                            <p
                                                className={`mt-0.5 font-sans text-[11px] leading-snug ${
                                                    data.role === 'customer'
                                                        ? 'text-[#F2EBDC]/80'
                                                        : 'text-[#6E675D]'
                                                }`}
                                            >
                                                Bingkisan pribadi, keluarga,
                                                &amp; momen spesial.
                                            </p>
                                        </div>
                                        {data.role === 'customer' && (
                                            <CheckIcon className="size-4 shrink-0 text-[#A88B54]" />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setData('role', 'b2b')}
                                        className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                                            data.role === 'b2b'
                                                ? 'border-[#16233B] bg-[#16233B] text-[#F2EBDC] shadow-md'
                                                : 'border-[#A88B54]/30 bg-white/70 text-[#16233B] hover:border-[#A88B54]'
                                        }`}
                                    >
                                        <div
                                            className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                                                data.role === 'b2b'
                                                    ? 'bg-[#A88B54] text-[#16233B]'
                                                    : 'bg-[#16233B]/10 text-[#16233B]'
                                            }`}
                                        >
                                            <Building2Icon className="size-4.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-serif text-base font-semibold">
                                                Corporate (B2B)
                                            </p>
                                            <p
                                                className={`mt-0.5 font-sans text-[11px] leading-snug ${
                                                    data.role === 'b2b'
                                                        ? 'text-[#F2EBDC]/80'
                                                        : 'text-[#6E675D]'
                                                }`}
                                            >
                                                Akses 3D Customizer, kustom
                                                logo, &amp; video ucapan.
                                            </p>
                                        </div>
                                        {data.role === 'b2b' && (
                                            <CheckIcon className="size-4 shrink-0 text-[#A88B54]" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.role}
                                    className="mt-1.5"
                                />
                            </div>

                            {/* Nama Lengkap */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block font-sans text-xs font-semibold text-[#16233B]"
                                >
                                    Nama Lengkap *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="cth. Sarah Wijaya"
                                    className="mt-1.5 w-full rounded-xl border border-[#A88B54]/35 bg-white px-4 py-2.5 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1"
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-sans text-xs font-semibold text-[#16233B]"
                                    >
                                        Alamat Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="nama@email.com"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/35 bg-white px-4 py-2.5 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block font-sans text-xs font-semibold text-[#16233B]"
                                    >
                                        Nomor Telepon / WhatsApp *
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        placeholder="081234567890"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/35 bg-white px-4 py-2.5 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                    />
                                    <InputError
                                        message={errors.phone}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Nama Perusahaan (wajib jika Corporate/B2B) */}
                            {data.role === 'b2b' && (
                                <div>
                                    <label
                                        htmlFor="company_name"
                                        className="block font-sans text-xs font-semibold text-[#16233B]"
                                    >
                                        Nama Perusahaan / Organisasi *
                                    </label>
                                    <input
                                        id="company_name"
                                        type="text"
                                        required
                                        value={data.company_name}
                                        onChange={(e) =>
                                            setData(
                                                'company_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="cth. PT Mahakarya Nusantara"
                                        className="mt-1.5 w-full rounded-xl border border-[#A88B54]/35 bg-white px-4 py-2.5 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                    />
                                    <InputError
                                        message={errors.company_name}
                                        className="mt-1"
                                    />
                                </div>
                            )}

                            {/* Password & Confirmation */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block font-sans text-xs font-semibold text-[#16233B]"
                                    >
                                        Password *
                                    </label>
                                    <div className="relative mt-1.5">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            required
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Minimal 8 karakter"
                                            className="w-full rounded-xl border border-[#A88B54]/35 bg-white py-2.5 pr-10 pl-4 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Tampilkan password"
                                            onClick={() =>
                                                setShowPassword((v) => !v)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6E675D] hover:text-[#16233B]"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="size-4" />
                                            ) : (
                                                <EyeIcon className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError
                                        message={errors.password}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block font-sans text-xs font-semibold text-[#16233B]"
                                    >
                                        Konfirmasi Password *
                                    </label>
                                    <div className="relative mt-1.5">
                                        <input
                                            id="password_confirmation"
                                            type={
                                                showConfirm
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            required
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ulangi password"
                                            className="w-full rounded-xl border border-[#A88B54]/35 bg-white py-2.5 pr-10 pl-4 font-sans text-sm text-[#16233B] transition-all outline-none placeholder:text-[#6E675D]/70 focus:border-[#16233B] focus:ring-1 focus:ring-[#16233B]"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Tampilkan konfirmasi password"
                                            onClick={() =>
                                                setShowConfirm((v) => !v)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6E675D] hover:text-[#16233B]"
                                        >
                                            {showConfirm ? (
                                                <EyeOffIcon className="size-4" />
                                            ) : (
                                                <EyeIcon className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16233B] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-[#F2EBDC] shadow-md transition-all duration-300 hover:bg-[#1F304F] disabled:opacity-60"
                            >
                                {processing && <Spinner className="size-4" />}
                                {processing
                                    ? 'Mendaftarkan Akun...'
                                    : 'Daftar Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
