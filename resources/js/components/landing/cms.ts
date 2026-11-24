export type SectionContent = Record<string, string | null | undefined>;

export type GroupedLandingContent = Record<string, SectionContent>;

export function getCmsText(
    content: SectionContent | undefined,
    key: string,
    fallback: string,
): string {
    const value = content?.[key];
    return value !== undefined && value !== null && value.trim() !== ''
        ? value
        : fallback;
}
