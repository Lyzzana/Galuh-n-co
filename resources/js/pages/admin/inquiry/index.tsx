import { Head, router } from '@inertiajs/react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import InquiryController from '@/actions/App/Http/Controllers/Admin/InquiryController';
import { dashboard } from '@/routes';

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

const statusLabels: Record<InquiryStatus, string> = {
    new: 'Baru',
    contacted: 'Dihubungi',
    closed: 'Selesai',
};

const statusVariants: Record<
    InquiryStatus,
    'default' | 'secondary' | 'outline'
> = {
    new: 'default',
    contacted: 'secondary',
    closed: 'outline',
};

const allStatuses: InquiryStatus[] = ['new', 'contacted', 'closed'];

export default function InquiryIndex({ inquiries }: PageProps) {
    const [detailTarget, setDetailTarget] = useState<Inquiry | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);

    const handleStatusChange = (inquiry: Inquiry, newStatus: InquiryStatus) => {
        if (inquiry.status === newStatus) {
            return;
        }

        router.put(
            InquiryController.update(inquiry.id),
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () =>
                    toast.success('Status inquiry berhasil diperbarui.'),
            },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) {
            return;
        }

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

            <div className="space-y-6 p-4 md:p-6">
                <div>
                    <h1 className="text-xl font-semibold">Manajemen Inquiry</h1>
                    <p className="text-sm text-muted-foreground">
                        Daftar permintaan penawaran kerjasama yang masuk.
                    </p>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama / Perusahaan</TableHead>
                                    <TableHead>Kontak</TableHead>
                                    <TableHead className="text-right">
                                        Jml Paket
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Budget/Paket
                                    </TableHead>
                                    <TableHead>Tgl Butuh</TableHead>
                                    <TableHead>Diterima</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="py-10 text-center text-muted-foreground"
                                        >
                                            Belum ada inquiry yang masuk.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    inquiries.map((inquiry) => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell>
                                                <button
                                                    type="button"
                                                    className="text-left"
                                                    onClick={() =>
                                                        setDetailTarget(inquiry)
                                                    }
                                                >
                                                    <p className="font-medium hover:underline">
                                                        {inquiry.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {inquiry.company}
                                                    </p>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm">
                                                    {inquiry.email}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {inquiry.whatsapp_number}
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {inquiry.estimated_quantity.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatRupiah(
                                                    inquiry.budget_per_package,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.needed_date_formatted}
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {inquiry.created_at}
                                            </TableCell>
                                            <TableCell>
                                                <StatusDropdown
                                                    currentStatus={
                                                        inquiry.status
                                                    }
                                                    onSelect={(s) =>
                                                        handleStatusChange(
                                                            inquiry,
                                                            s,
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        setDeleteTarget(inquiry)
                                                    }
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog detail inquiry */}
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
                            <DetailRow
                                label="Nama PIC"
                                value={detailTarget.name}
                            />
                            <DetailRow
                                label="Perusahaan"
                                value={detailTarget.company}
                            />
                            <DetailRow
                                label="Email"
                                value={detailTarget.email}
                            />
                            <DetailRow
                                label="WhatsApp"
                                value={detailTarget.whatsapp_number}
                            />
                            <DetailRow
                                label="Jumlah Paket"
                                value={detailTarget.estimated_quantity.toLocaleString(
                                    'id-ID',
                                )}
                            />
                            <DetailRow
                                label="Budget/Paket"
                                value={formatRupiah(
                                    detailTarget.budget_per_package,
                                )}
                            />
                            <DetailRow
                                label="Tanggal Butuh"
                                value={detailTarget.needed_date_formatted}
                            />
                            <DetailRow
                                label="Diterima"
                                value={detailTarget.created_at}
                            />
                            {detailTarget.notes && (
                                <div>
                                    <p className="font-medium text-muted-foreground">
                                        Catatan
                                    </p>
                                    <p className="mt-1 rounded-md bg-muted p-3 whitespace-pre-wrap">
                                        {detailTarget.notes}
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-muted-foreground">
                                    Status
                                </span>
                                <Badge
                                    variant={
                                        statusVariants[detailTarget.status]
                                    }
                                >
                                    {statusLabels[detailTarget.status]}
                                </Badge>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDetailTarget(null)}
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog konfirmasi hapus */}
            <Dialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Hapus Inquiry?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Inquiry dari{' '}
                        <span className="font-medium text-foreground">
                            {deleteTarget?.name}
                        </span>{' '}
                        ({deleteTarget?.company}) akan dihapus permanen.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                        >
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

function StatusDropdown({
    currentStatus,
    onSelect,
}: {
    currentStatus: InquiryStatus;
    onSelect: (status: InquiryStatus) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-xs"
                >
                    <Badge
                        variant={statusVariants[currentStatus]}
                        className="pointer-events-none"
                    >
                        {statusLabels[currentStatus]}
                    </Badge>
                    <ChevronDown className="size-3 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {allStatuses.map((s) => (
                    <DropdownMenuItem
                        key={s}
                        onSelect={() => onSelect(s)}
                        className="gap-2"
                    >
                        <Badge variant={statusVariants[s]}>
                            {statusLabels[s]}
                        </Badge>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex gap-2">
            <span className="w-32 shrink-0 font-medium text-muted-foreground">
                {label}
            </span>
            <span>{value}</span>
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

InquiryIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Inquiry',
            href: InquiryController.index(),
        },
    ],
};
