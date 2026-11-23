import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import type { Product } from '@/types/product';

// ── Above-the-fold — eager import (LCP critical path) ────────────────────────
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';

// ── Below-the-fold — lazy import (code-split, downloaded after FCP) ───────────
const CatalogSection = lazy(
    () => import('@/components/landing/CatalogSection'),
);
const WhyChooseUsSection = lazy(
    () => import('@/components/landing/WhyChooseUsSection'),
);
const HowToOrderSection = lazy(
    () => import('@/components/landing/HowToOrderSection'),
);
const CorporateSection = lazy(
    () => import('@/components/landing/CorporateSection'),
);
const TestimonialsSection = lazy(
    () => import('@/components/landing/TestimonialsSection'),
);
const FaqSection = lazy(() => import('@/components/landing/FaqSection'));
const FooterSection = lazy(() => import('@/components/landing/FooterSection'));

export type { Product };

export interface PartnerItem {
    id: number;
    name: string;
    sector: string | null;
    logo_url: string | null;
}

export interface WelcomeProps {
    products?: Product[];
    categories?: string[];
    partners?: PartnerItem[];
}

// Skeleton placeholder ringan — ditampilkan saat chunk lazy sedang diunduh.
// Tinggi min-h sesuai section agar tidak ada layout jump.
function SectionSkeleton({
    minHeight = 'min-h-[480px]',
}: {
    minHeight?: string;
}) {
    return <div className={`${minHeight} bg-[#FAF7F2]`} aria-hidden="true" />;
}

export default function Welcome({
    products = [],
    categories = [],
    partners = [],
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
                    content="Kurasi hampers eksklusif dengan kemasan penuh estetika dan sentuhan personal untuk merayakan setiap momen istimewa."
                />
            </Head>

            <div className="no-scrollbar min-h-screen bg-[#FAF7F2] font-sans text-[#2C1E16] antialiased selection:bg-[#C5A059]/25 selection:text-[#122E21]">
                {/* ── Above-the-fold (eager) ── */}
                <Navbar />
                <HeroSection products={products} />
                <AboutSection products={products} />

                {/* ── Below-the-fold (lazy + Suspense) ── */}

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[600px]" />}
                >
                    <CatalogSection
                        products={products}
                        categories={categories}
                    />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[480px]" />}
                >
                    <WhyChooseUsSection />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[400px]" />}
                >
                    <HowToOrderSection />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[600px]" />}
                >
                    <CorporateSection partners={partners} />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[480px]" />}
                >
                    <TestimonialsSection />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[400px]" />}
                >
                    <FaqSection />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[320px]" />}
                >
                    <FooterSection />
                </Suspense>

                {/* FloatingWhatsApp — kecil, selalu eager */}
                <FloatingWhatsApp />
            </div>
        </MotionConfig>
    );
}
