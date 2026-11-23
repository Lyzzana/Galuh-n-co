import { Link, router, usePage } from '@inertiajs/react';
import {
    BarChart3Icon,
    BellIcon,
    BuildingIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LayoutGridIcon,
    LogOutIcon,
    MenuIcon,
    MessageSquareTextIcon,
    PackageIcon,
    SettingsIcon,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';
import * as AdminInquiryController from '@/actions/App/Http/Controllers/Admin/InquiryController';
import * as AdminPartnerController from '@/actions/App/Http/Controllers/Admin/PartnerController';
import * as AdminProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';
import { cn } from '@/utils';

type Props = {
    children: ReactNode;
};

const navItems = [
    { href: dashboard().url, icon: LayoutGridIcon, label: 'Dashboard' },
    { href: AdminProductController.index().url, icon: PackageIcon, label: 'Produk' },
    { href: AdminInquiryController.index().url, icon: MessageSquareTextIcon, label: 'Inquiry' },
    { href: AdminPartnerController.index().url, icon: BuildingIcon, label: 'Partner' },
    { href: '/settings/profile', icon: SettingsIcon, label: 'Pengaturan' },
];

// Dark green: #1a3a2a  Active: #2d5a3d  Cream content bg: #f5f0e8
export default function AdminLayout({ children }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const getInitials = useInitials();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        router.visit(logout().url, { method: 'post' });
    };

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ background: '#f5f0e8' }}
        >
            {/* ── Sidebar ───────────────────────────────────────────── */}
            <aside
                className={cn(
                    'relative flex flex-shrink-0 flex-col py-5 transition-all duration-300 ease-in-out',
                    collapsed ? 'w-16 items-center' : 'w-56',
                )}
                style={{ background: '#1a3a2a' }}
            >
                {/* Logo row */}
                <div
                    className={cn(
                        'mb-6 flex items-center gap-3 px-4',
                        collapsed && 'justify-center px-0',
                    )}
                >
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-white"
                        style={{ background: '#2d5a3d' }}
                    >
                        <BarChart3Icon className="size-5" />
                    </div>
                    {!collapsed && (
                        <span className="truncate text-sm font-bold tracking-wide text-white/90">
                            Galuh Co.
                        </span>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex flex-1 flex-col gap-0.5 px-2">
                    {navItems.map((item) => {
                        const isActive = isCurrentOrParentUrl(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={cn(
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                                    collapsed && 'justify-center px-0',
                                    isActive
                                        ? 'text-white shadow-md'
                                        : 'text-white/60 hover:bg-white/10 hover:text-white/90',
                                )}
                                style={
                                    isActive
                                        ? { background: '#2d5a3d' }
                                        : undefined
                                }
                            >
                                <item.icon className="size-4.5 shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User + logout */}
                <div className="mt-auto space-y-1 px-2">
                    {!collapsed && auth.user && (
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5">
                            <div
                                className="flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                                style={{ background: '#2d5a3d' }}
                            >
                                {getInitials(auth.user.name)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-white/90">
                                    {auth.user.name}
                                </p>
                            </div>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleLogout}
                        title="Logout"
                        className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white/90',
                            collapsed && 'justify-center px-0',
                        )}
                    >
                        <LogOutIcon className="size-4.5 shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>

                {/* Collapse toggle — floating on the right edge */}
                <button
                    type="button"
                    onClick={() => setCollapsed((v) => !v)}
                    className="absolute top-20 -right-3 flex size-6 items-center justify-center rounded-full border border-white/20 text-white/80 shadow-md transition-colors hover:text-white"
                    style={{ background: '#2d5a3d' }}
                    aria-label={
                        collapsed ? 'Expand sidebar' : 'Collapse sidebar'
                    }
                >
                    {collapsed ? (
                        <ChevronRightIcon className="size-3.5" />
                    ) : (
                        <ChevronLeftIcon className="size-3.5" />
                    )}
                </button>
            </aside>

            {/* ── Main area ─────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header
                    className="flex h-14 flex-shrink-0 items-center gap-3 px-4 shadow-sm"
                    style={{
                        background: '#f5f0e8',
                        borderBottom: '1px solid #e0d9cc',
                    }}
                >
                    {/* Mobile / extra toggle */}
                    <button
                        type="button"
                        onClick={() => setCollapsed((v) => !v)}
                        className="flex size-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5 md:hidden"
                    >
                        <MenuIcon className="size-5 text-gray-600" />
                    </button>

                    {/* Page breadcrumb area — left side */}
                    <div className="flex-1" />

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        {/* Date */}
                        <span className="hidden text-xs font-medium text-gray-500 md:block">
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>

                        {/* Bell */}
                        <button
                            type="button"
                            className="flex size-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5"
                        >
                            <BellIcon className="size-4.5 text-gray-500" />
                        </button>

                        {/* Settings */}
                        <Link
                            href="/settings/profile"
                            className="flex size-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5"
                        >
                            <SettingsIcon className="size-4.5 text-gray-500" />
                        </Link>

                        {/* Avatar */}
                        <div
                            className="flex size-9 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm"
                            style={{ background: '#2d5a3d' }}
                        >
                            {auth.user ? getInitials(auth.user.name) : '?'}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div
                        className="min-h-full overflow-hidden rounded-2xl shadow-sm"
                        style={{
                            background: '#ffffff',
                            border: '1px solid #e0d9cc',
                        }}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
