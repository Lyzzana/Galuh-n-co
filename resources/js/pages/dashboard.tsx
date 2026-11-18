import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    MessageSquareText,
    Package,
    PackageCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import * as AdminInquiryController from '@/actions/App/Http/Controllers/Admin/InquiryController';
import { dashboard } from '@/routes';

type Stats = {
    total_products: number;
    active_products: number;
    total_inquiries: number;
    new_inquiries: number;
};

type RecentInquiry = {
    id: number;
    name: string;
    company: string;
    estimated_quantity: number;
    needed_date: string;
    status: 'new' | 'contacted' | 'closed';
};

type PageProps = {
    stats: Stats;
    recent_inquiries: RecentInquiry[];
};

const statusLabels: Record<RecentInquiry['status'], string> = {
    new: 'Baru',
    contacted: 'Dihubungi',
    closed: 'Selesai',
};

const statusVariants: Record<
    RecentInquiry['status'],
    'default' | 'secondary' | 'outline'
> = {
    new: 'default',
    contacted: 'secondary',
    closed: 'outline',
};

export default function Dashboard({ stats, recent_inquiries }: PageProps) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Produk"
                        value={stats.total_products}
                        icon={
                            <Package className="size-5 text-muted-foreground" />
                        }
                    />
                    <StatCard
                        title="Produk Aktif"
                        value={stats.active_products}
                        icon={
                            <PackageCheck className="size-5 text-muted-foreground" />
                        }
                    />
                    <StatCard
                        title="Total Inquiry"
                        value={stats.total_inquiries}
                        icon={
                            <BarChart3 className="size-5 text-muted-foreground" />
                        }
                    />
                    <StatCard
                        title="Inquiry Baru"
                        value={stats.new_inquiries}
                        icon={
                            <MessageSquareText className="size-5 text-muted-foreground" />
                        }
                        highlight={stats.new_inquiries > 0}
                    />
                </div>

                {/* Recent inquiries */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-semibold">
                            Inquiry Terbaru
                        </CardTitle>
                        <Link
                            href={AdminInquiryController.index()}
                            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                        >
                            Lihat semua
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Perusahaan</TableHead>
                                    <TableHead className="text-right">
                                        Jml Paket
                                    </TableHead>
                                    <TableHead>Tgl Butuh</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recent_inquiries.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-10 text-center text-muted-foreground"
                                        >
                                            Belum ada inquiry masuk.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    recent_inquiries.map((inquiry) => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell className="font-medium">
                                                {inquiry.name}
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.company}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {inquiry.estimated_quantity.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.needed_date}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusVariants[
                                                            inquiry.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        statusLabels[
                                                            inquiry.status
                                                        ]
                                                    }
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function StatCard({
    title,
    value,
    icon,
    highlight = false,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <Card className={highlight ? 'border-primary/50' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">
                    {value.toLocaleString('id-ID')}
                </p>
            </CardContent>
        </Card>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
