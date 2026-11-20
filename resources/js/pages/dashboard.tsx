import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import * as AdminInquiryController from '@/actions/App/Http/Controllers/Admin/InquiryController';
import * as AdminProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import type { Auth } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils';

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

const statusConfig: Record<
    RecentInquiry['status'],
    { label: string; color: 'primary' | 'warning' | 'gray' }
> = {
    new: { label: 'Baru', color: 'primary' },
    contacted: { label: 'Dihubungi', color: 'warning' },
    closed: { label: 'Selesai', color: 'gray' },
};

export default function Dashboard({ stats, recent_inquiries }: PageProps) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const firstName = auth.user?.name.split(' ')[0] ?? 'Admin';

    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                {/* Greeting */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Halo, {firstName}!
                        </h1>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Ini ringkasan aktivitas admin bulan ini.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                            Bulan ini
                        </span>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        label="Total Produk"
                        value={stats.total_products}
                        gradient="from-emerald-800 to-green-700"
                        textColor="text-white"
                        href={AdminProductController.index().url}
                    />
                    <StatCard
                        label="Produk Aktif"
                        value={stats.active_products}
                        gradient="from-white to-white"
                        textColor="text-gray-900"
                        border
                        href={AdminProductController.index().url}
                    />
                    <StatCard
                        label="Total Inquiry"
                        value={stats.total_inquiries}
                        gradient="from-white to-white"
                        textColor="text-gray-900"
                        border
                        href={AdminInquiryController.index().url}
                    />
                    <StatCard
                        label="Inquiry Baru"
                        value={stats.new_inquiries}
                        gradient={
                            stats.new_inquiries > 0
                                ? 'from-amber-500 to-orange-500'
                                : 'from-white to-white'
                        }
                        textColor={
                            stats.new_inquiries > 0
                                ? 'text-white'
                                : 'text-gray-900'
                        }
                        border={stats.new_inquiries === 0}
                        href={AdminInquiryController.index().url}
                    />
                </div>

                {/* Bottom section: quick actions + recent table */}
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <QuickActionCard
                            value={stats.total_products}
                            label="produk terdaftar"
                            note="Kelola katalog hampers"
                            href={AdminProductController.index().url}
                        />
                        <QuickActionCard
                            value={stats.new_inquiries}
                            label="inquiry menunggu"
                            note={`${stats.new_inquiries} belum ditindaklanjuti`}
                            href={AdminInquiryController.index().url}
                            highlight={stats.new_inquiries > 0}
                        />
                    </div>

                    {/* Recent inquiries */}
                    <div className="col-span-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <p className="text-sm font-semibold text-gray-900">
                                Inquiry Terbaru
                            </p>
                            <Link
                                href={AdminInquiryController.index().url}
                                className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
                            >
                                Lihat semua →
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {recent_inquiries.length === 0 ? (
                                <p className="py-8 text-center text-sm text-gray-400">
                                    Belum ada inquiry masuk.
                                </p>
                            ) : (
                                recent_inquiries.map((inq) => (
                                    <div
                                        key={inq.id}
                                        className="flex items-center gap-3 px-5 py-3"
                                    >
                                        <div
                                            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                                            style={{
                                                background: '#e8f0eb',
                                                color: '#2d5a3d',
                                            }}
                                        >
                                            {inq.company
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {inq.name}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {inq.company}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-xs text-gray-500">
                                                {inq.needed_date}
                                            </p>
                                            <Badge
                                                variant="light"
                                                color={
                                                    statusConfig[inq.status]
                                                        .color
                                                }
                                                size="sm"
                                            >
                                                {statusConfig[inq.status].label}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({
    label,
    value,
    gradient,
    textColor,
    border = false,
    href,
}: {
    label: string;
    value: number;
    gradient: string;
    textColor: string;
    border?: boolean;
    href: string;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'relative flex flex-col justify-between rounded-2xl p-4 shadow-sm transition-all hover:shadow-md',
                `bg-gradient-to-br ${gradient}`,
                border && 'border border-gray-200',
            )}
        >
            <div className="flex items-start justify-between">
                <p className={cn('text-xs font-medium opacity-80', textColor)}>
                    {label}
                </p>
                <ArrowUpRight className={cn('size-4 opacity-60', textColor)} />
            </div>
            <p className={cn('mt-3 text-3xl font-bold', textColor)}>
                {value.toLocaleString('id-ID')}
            </p>
        </Link>
    );
}

function QuickActionCard({
    value,
    label,
    note,
    href,
    highlight = false,
}: {
    value: number;
    label: string;
    note: string;
    href: string;
    highlight?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md',
                highlight
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-gray-200 bg-white',
            )}
        >
            <div
                className={cn(
                    'text-3xl font-bold',
                    highlight ? 'text-orange-500' : 'text-gray-900',
                )}
            >
                {value}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{note}</p>
            </div>
        </Link>
    );
}

Dashboard.layout = undefined;
