import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

interface SharedProps {
    whatsappNumber: string;
    [key: string]: unknown;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function FloatingWhatsAppButton() {
    const { whatsappNumber } = usePage<SharedProps>().props;

    const defaultMessage =
        'Halo GALUH & CO., saya tertarik untuk memesan hampers.';
    const href = buildWhatsAppUrl(whatsappNumber, defaultMessage);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi GALUH & CO. via WhatsApp"
            className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-700"
        >
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Chat WhatsApp</span>
        </a>
    );
}