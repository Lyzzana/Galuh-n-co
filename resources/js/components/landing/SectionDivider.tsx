/**
 * SectionDivider — ornamen pemisah antar-section bergaya "Deep Navy & Warm Ivory".
 *
 * Menggantikan garis pembatas kaku dengan:
 *   1. Gradien fade kiri-kanan berwarna muted brass tipis (#A88B54).
 *   2. Ornamen berlian + garis brass di tengah.
 *
 * Mendukung `prefers-reduced-motion` — ornamen tetap tampil statis jika aktif.
 *
 * Prop `variant`:
 *   "light"  → digunakan di section bg-[#F2EBDC] (mayoritas section)
 *   "dark"   → digunakan di section bg-[#16233B] (Hero → About transition)
 */

interface SectionDividerProps {
    variant?: 'light' | 'dark';
}

export default function SectionDivider({
    variant = 'light',
}: SectionDividerProps) {
    const lineColor =
        variant === 'dark' ? 'rgba(168,139,84,0.3)' : 'rgba(168,139,84,0.4)';
    const dotColor = '#A88B54';
    const bgPin = variant === 'dark' ? '#16233B' : '#F2EBDC';
    const textColor = variant === 'dark' ? '#A88B54' : '#6E675D';

    return (
        <div
            aria-hidden="true"
            className="relative flex items-center justify-center py-0"
        >
            {/* Garis gradien kiri */}
            <div
                className="h-px flex-1"
                style={{
                    background: `linear-gradient(to right, transparent, ${lineColor})`,
                }}
            />

            {/* Ornamen berlian + titik tengah */}
            <div
                className="relative mx-3 flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1"
                style={{ background: bgPin }}
            >
                {/* Titik kiri */}
                <span
                    className="size-1 rounded-full"
                    style={{ background: dotColor, opacity: 0.6 }}
                />

                {/* Berlian SVG tengah */}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <polygon
                        points="6,0 12,6 6,12 0,6"
                        fill={dotColor}
                        opacity="0.9"
                    />
                    <polygon
                        points="6,2 10,6 6,10 2,6"
                        fill={bgPin}
                        opacity="1"
                    />
                </svg>

                {/* Label brand mikro */}
                <span
                    className="font-serif text-[9px] tracking-[0.22em] uppercase"
                    style={{ color: textColor }}
                >
                    G&amp;C
                </span>

                {/* Berlian kanan */}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <polygon
                        points="6,0 12,6 6,12 0,6"
                        fill={dotColor}
                        opacity="0.9"
                    />
                    <polygon
                        points="6,2 10,6 6,10 2,6"
                        fill={bgPin}
                        opacity="1"
                    />
                </svg>

                {/* Titik kanan */}
                <span
                    className="size-1 rounded-full"
                    style={{ background: dotColor, opacity: 0.6 }}
                />
            </div>

            {/* Garis gradien kanan */}
            <div
                className="h-px flex-1"
                style={{
                    background: `linear-gradient(to left, transparent, ${lineColor})`,
                }}
            />
        </div>
    );
}
