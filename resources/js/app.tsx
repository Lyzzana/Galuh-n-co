import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome' ||
                name === 'katalog' ||
                name === 'auth/register' ||
                name === 'admin/login' ||
                name.startsWith('account/') ||
                name.startsWith('cart/') ||
                name.startsWith('checkout/') ||
                name.startsWith('b2b/') ||
                name.startsWith('greeting/'):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AdminLayout, SettingsLayout];
            case name === 'dashboard':
            case name.startsWith('admin/'):
                return AdminLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#A88B54',
    },
});

// This will set light / dark mode on load...
initializeTheme();
