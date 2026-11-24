import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import type { GroupedLandingContent } from '@/components/landing/cms';
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
    contents?: GroupedLandingContent;
}

// Skeleton placeholder ringan — ditampilkan saat chunk lazy sedang diunduh.
// Tinggi min-h sesuai section agar tidak ada layout jump.
function SectionSkeleton({
    minHeight = 'min-h-[480px]',
}: {
    minHeight?: string;
}) {
    return <div className={`${minHeight} bg-[#F2EBDC]`} aria-hidden="true" />;
}

export default function Welcome({
    products = [],
    categories = [],
    partners = [],
    contents = {},
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

            <div className="no-scrollbar min-h-screen bg-[#F2EBDC] font-sans text-[#16233B] antialiased selection:bg-[#A88B54]/25 selection:text-[#16233B]">
                {/* ── Above-the-fold (eager) ── */}
                <Navbar />
                <HeroSection products={products} content={contents.hero} />
                <AboutSection products={products} content={contents.about} />

                {/* ── Below-the-fold (lazy + Suspense) ── */}

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[600px]" />}
                >
                    <CatalogSection
                        products={products}
                        categories={categories}
                        content={contents.catalog}
                    />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[480px]" />}
                >
                    <WhyChooseUsSection content={contents.why_us} />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[400px]" />}
                >
                    <HowToOrderSection content={contents.how_to_order} />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[600px]" />}
                >
                    <CorporateSection
                        partners={partners}
                        content={contents.corporate}
                    />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[480px]" />}
                >
                    <TestimonialsSection content={contents.testimonials} />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[400px]" />}
                >
                    <FaqSection content={contents.faq} />
                </Suspense>

                <Suspense
                    fallback={<SectionSkeleton minHeight="min-h-[320px]" />}
                >
                    <FooterSection content={contents.footer} />
                </Suspense>

                {/* FloatingWhatsApp — kecil, selalu eager */}
                <FloatingWhatsApp />
            </div>
        </MotionConfig>
    );
}
