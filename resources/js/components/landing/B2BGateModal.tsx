import { Link } from '@inertiajs/react';
import { Building2Icon, SparklesIcon, VideoIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { login, register } from '@/routes';

interface B2BGateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isLoggedIn: boolean;
}

export default function B2BGateModal({
    open,
    onOpenChange,
    isLoggedIn,
}: B2BGateModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md border-[#A88B54]/45 bg-[#FAF7F0] text-[#16233B]">
                <DialogHeader>
                    <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#A88B54]/40 bg-[#16233B] px-3 py-1">
                        <Building2Icon className="size-3.5 text-[#A88B54]" />
                        <span className="font-sans text-[10px] font-semibold tracking-wider text-[#F2EBDC] uppercase">
                            Eksklusif Corporate (B2B)
                        </span>
                    </div>
                    <DialogTitle className="font-serif text-2xl font-normal text-[#16233B]">
                        3D Customizer &amp; Video Ucapan Khusus Akun B2B
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 font-sans text-xs leading-relaxed text-[#6E675D] sm:text-sm">
                    <p>
                        {isLoggedIn
                            ? 'Anda saat ini masuk menggunakan akun Personal (B2C). Fitur studio 3D Custom Luxury Box, logo perusahaan, dan video ucapan QR Code tersedia khusus untuk akun Corporate (B2B).'
                            : 'Studio 3D Customizer untuk merancang warna kotak, pita satin, logo perusahaan, serta video ucapan QR Code tersedia khusus bagi mitra Corporate (B2B).'}
                    </p>

                    <div className="space-y-2 rounded-2xl border border-[#A88B54]/25 bg-white/80 p-3.5 text-xs text-[#16233B]">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="size-4 shrink-0 text-[#A88B54]" />
                            <span>
                                Pratinjau kotak hadiah 3D interaktif 360° &amp;
                                cetak logo
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <VideoIcon className="size-4 shrink-0 text-[#A88B54]" />
                            <span>
                                Video ucapan korporat otomatis dengan QR Code
                                eksklusif
                            </span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row">
                    {!isLoggedIn && (
                        <Link
                            href={login()}
                            onClick={() => onOpenChange(false)}
                            className="inline-flex w-full items-center justify-center rounded-full border border-[#A88B54] px-5 py-2.5 font-sans text-xs font-semibold text-[#16233B] transition-colors hover:bg-[#A88B54]/10 sm:w-auto"
                        >
                            Masuk Akun B2B
                        </Link>
                    )}
                    <Link
                        href={register()}
                        onClick={() => onOpenChange(false)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#16233B] px-5 py-2.5 font-sans text-xs font-semibold text-[#F2EBDC] transition-colors hover:bg-[#1F304F] sm:w-auto"
                    >
                        Daftar Akun Corporate (B2B)
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
