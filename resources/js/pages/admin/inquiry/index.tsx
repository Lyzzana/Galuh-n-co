import { Head, router } from '@inertiajs/react';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import InquiryController from '@/actions/App/Http/Controllers/Admin/InquiryController';
import { dashboard } from '@/routes';
import { cn } from '@/utils';

type InquiryStatus = 'new' | 'contacted' | 'closed';

type Inquiry = {
    id: number;
    name: string;
    company: string;
    email: string;
    whatsapp_number: string;
    estimated_quantity: number;
    budget_per_package: number;
    needed_date: string;
    needed_date_formatted: string;
    notes: string | null;
    status: InquiryStatus;
    created_at: string;
};

type PageProps = {
    inquiries: Inquiry[];
};

const statusConfig: Record<
    InquiryStatus,
    { label: string; bg: string; text: string; dot: string }
> = {
    new: {
        label: 'Baru',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        dot: 'bg-blue-500',
    },
    contacted: {
        label: 'Dihubungi',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
    },
    closed: {
        label: 'Selesai',
        bg: 'bg-green-50',
        text: 'text-green-700',
        dot: 'bg-green-500',
    },
};

const allStatuses: InquiryStatus[] = ['new', 'contacted', 'closed'];

export default function InquiryIndex({ inquiries }: PageProps) {
    const [search, setSearch] = useState('');
    const [detailTarget, setDetailTarget] = useState<Inquiry | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);

    const filtered = inquiries.filter(
        (i) =>
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.company.toLowerCase().includes(search.toLowerCase()) ||
            i.email.toLowerCase().includes(search.toLowerCase()),
    );

    const countByStatus = (s: InquiryStatus) => inquiries.filter((i) => i.status === s).length;

    const handleStatusChange = (inquiry: Inquiry, newStatus: InquiryStatus) => {
        if (inquiry.status === newStatus) return;
        router.put(
            InquiryController.update(inquiry.id),
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => toast.success('Status berhasil diperbarui.'),
            },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(InquiryController.destroy(deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteTarget(null);
                toast.success('Inquiry berhasil dihapus.');
            },
        });
    };

    return (
        <>
            <Head title="Manajemen Inquiry" />

            <div className="p-6 space-y-5">
                {/* Page title */}
                <h1 className="text-xl font-bold text-gray-900">Daftar Inquiry</h1>

                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-3">
                    <SummaryCard label="Inquiry Baru" count={countByStatus('new')} bg="bg-emerald-800" />
                    <SummaryCard label="Dihubungi" count={countByStatus('contacted')} bg="bg-amber-500" />
                    <SummaryCard label="Selesai" count={countByStatus('closed')} bg="bg-stone-500" />
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm max-w-xs">
                        <SearchIcon className="size-4 shrink-0 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, perusahaan..."
                            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                    </div>
                    <span className="text-xs text-gray-400 ml-1">{filtered.length} inquiry</span>
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60">
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Nama / Perusahaan
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Kontak
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Jml Paket
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Budget
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Tgl Butuh
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-12 text-center text-sm text-gray-400"
                                        >
                                            {search
                                                ? 'Tidak ada hasil yang cocok.'
                                                : 'Belum ada inquiry masuk.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((inquiry) => (
                                        <tr
                                            key={inquiry.id}
                                            className="hover:bg-gray-50/60 transition-colors"
                                        >
                                            <td className="px-4 py-3.5">
                                                <button
                                                    type="button"
                                                    className="text-left"
                                                    onClick={() => setDetailTarget(inquiry)}
                                                >
                                                    <p className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                                        {inquiry.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {inquiry.company}
                                                    </p>
                                                </button>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <p className="text-gray-700">{inquiry.email}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {inquiry.whatsapp_number}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3.5 text-right font-medium text-gray-900">
                                                {inquiry.estimated_quantity.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3.5 text-right text-gray-700">
                                                {formatRupiah(inquiry.budget_per_package)}
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-600">
                                                {inquiry.needed_date_formatted}
                                            </td>
                                            <td className="px-4 py-3.5 text-center">
                                                <StatusPill
                                                    status={inquiry.status}
                                                    onSelect={(s) =>
                                                        handleStatusChange(inquiry, s)
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteTarget(inquiry)}
                                                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2Icon className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail dialog */}
            <Dialog
                open={detailTarget !== null}
                onOpenChange={(open) => !open && setDetailTarget(null)}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detail Inquiry</DialogTitle>
                    </DialogHeader>
                    {detailTarget && (
                        <div className="space-y-3 text-sm">
                            <DetailRow label="Nama PIC" value={detailTarget.name} />
                            <DetailRow label="Perusahaan" value={detailTarget.company} />
                            <DetailRow label="Email" value={detailTarget.email} />
                            <DetailRow label="WhatsApp" value={detailTarget.whatsapp_number} />
                            <DetailRow
                                label="Jumlah Paket"
                                value={detailTarget.estimated_quantity.toLocaleString('id-ID')}
                            />
                            <DetailRow
                                label="Budget/Paket"
                                value={formatRupiah(detailTarget.budget_per_package)}
                            />
                            <DetailRow
                                label="Tanggal Butuh"
                                value={detailTarget.needed_date_formatted}
                            />
                            <DetailRow label="Diterima" value={detailTarget.created_at} />
                            {detailTarget.notes && (
                                <div>
                                    <p className="font-medium text-gray-500">Catatan</p>
                                    <p className="mt-1 rounded-lg bg-gray-50 p-3 whitespace-pre-wrap">
                                        {detailTarget.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailTarget(null)}>
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete dialog */}
            <Dialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Hapus Inquiry?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">
                        Inquiry dari{' '}
                        <span className="font-medium text-gray-900">{deleteTarget?.name}</span> (
                        {deleteTarget?.company}) akan dihapus permanen.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function SummaryCard({
    label,
    count,
    bg,
}: {
    label: string;
    count: number;
    bg: string;
}) {
    return (
        <div className={cn('rounded-2xl px-5 py-4 text-white shadow-sm', bg)}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="mt-1 text-3xl font-bold">{count}</p>
        </div>
    );
}

function StatusPill({
    status,
    onSelect,
}: {
    status: InquiryStatus;
    onSelect: (s: InquiryStatus) => void;
}) {
    const cfg = statusConfig[status];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer">
                <span
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                        cfg.bg,
                        cfg.text,
                    )}
                >
                    <span className={cn('size-1.5 rounded-full', cfg.dot)} />
                    {cfg.label}
                    <span className="ml-0.5 text-current opacity-50">▾</span>
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={4}>
                {allStatuses.map((s) => (
                    <DropdownMenuItem
                        key={s}
                        onClick={() => onSelect(s)}
                        className={cn(s === status && 'font-semibold')}
                    >
                        <span
                            className={cn(
                                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs',
                                statusConfig[s].bg,
                                statusConfig[s].text,
                            )}
                        >
                            <span
                                className={cn('size-1.5 rounded-full', statusConfig[s].dot)}
                            />
                            {statusConfig[s].label}
                        </span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex gap-2">
            <span className="w-32 shrink-0 font-medium text-gray-500">{label}</span>
            <span className="text-gray-900">{value}</span>
        </div>
    );
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
}

InquiryIndex.layout = undefined;
