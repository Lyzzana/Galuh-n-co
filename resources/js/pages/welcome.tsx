import { Head } from '@inertiajs/react';
import { MotionConfig } from 'motion/react';
import AboutSection from '@/components/landing/AboutSection';
import CatalogSection from '@/components/landing/CatalogSection';
import CorporateSection from '@/components/landing/CorporateSection';
import FaqSection from '@/components/landing/FaqSection';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import FooterSection from '@/components/landing/FooterSection';
import HeroSection from '@/components/landing/HeroSection';
import HowToOrderSection from '@/components/landing/HowToOrderSection';
import Navbar from '@/components/landing/Navbar';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import type { Product } from '@/types/product';

export type { Product };

export interface WelcomeProps {
    products?: Product[];
    categories?: string[];
}

export default function Welcome({
    products = [],
    categories = [],
}: WelcomeProps) {
    return (
        <MotionConfig reducedMotion="user">
            <Head>
                <title>
                    Galuh &amp; Co. — Curated Luxury Hampers &amp; Corporate
                    Gifting
                </title>
                <meta
                    name="description"
                    content="Kurasi hampers mewah dan bingkisan eksklusif dengan kemasan penuh estetika dan sentuhan personal untuk merayakan setiap momen istimewa."
                />
            </Head>

            {/* Root Container dengan Tema Warm Luxury yang Terkunci (Tanpa Inversi Dark Mode) */}
            <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#2C1E16] antialiased selection:bg-[#C5A059]/25 selection:text-[#122E21]">
                {/* Section 1: Sticky Navbar */}
                <Navbar />

                {/* Section 2: Hero Section */}
                <HeroSection products={products} />

                {/* Section 3: Tentang Brand */}
                <AboutSection products={products} />

                {/* Section 4: Koleksi Hampers & Modal Detail Produk */}
                <CatalogSection products={products} categories={categories} />

                {/* Section 5: Mengapa Memilih Galuh & Co. */}
                <WhyChooseUsSection />

                {/* Section 6: Cara Pemesanan */}
                <HowToOrderSection />

                {/* Section 7: Layanan & Form Inquiry Corporate */}
                <CorporateSection />

                {/* Section 8: Testimoni Kartu Ucapan Gantung */}
                <TestimonialsSection />

                {/* Section 9: Pertanyaan Umum (FAQ Accordion) */}
                <FaqSection />

                {/* Section 10: CTA Penutup & Footer */}
                <FooterSection />

                {/* Floating WhatsApp Quick Contact Button */}
                <FloatingWhatsApp />
            </div>
        </MotionConfig>
    );
}
