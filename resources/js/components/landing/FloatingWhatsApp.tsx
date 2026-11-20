import { motion } from 'motion/react';
import { MessageCircleIcon } from 'lucide-react';

const WA_URL =
    'https://wa.me/6281779839434?text=Halo%20Galuh%20%26%20Co.%2C%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20hampers.';

export default function FloatingWhatsApp() {
    return (
        <aside
            aria-label="Kontak Cepat WhatsApp"
            className="fixed right-6 bottom-6 z-40"
        >
            <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2.5 rounded-full border border-[#C5A059] bg-[#163828] py-3 pr-5 pl-3.5 text-[#FAF7F2] shadow-2xl transition-colors duration-300 hover:bg-[#122E21]"
            >
                {/* Luminous Glow Ambient Ring */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-full bg-[#D4AF37]/20 blur-md transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex size-9 items-center justify-center rounded-full bg-[#C5A059] text-[#122E21] shadow-xs">
                    <MessageCircleIcon className="size-5 fill-current" />
                </div>

                <div className="relative flex flex-col items-start">
                    <span className="font-sans text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase">
                        Konsultasi Cepat
                    </span>
                    <span className="font-sans text-xs font-medium text-[#FAF7F2]">
                        Hubungi via WA
                    </span>
                </div>
            </motion.a>
        </aside>
    );
}
