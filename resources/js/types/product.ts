export interface Product {
    id: number;
    name: string;
    slug: string;
    category: string;
    short_description: string;
    contents: string[];
    price_from: number;
    image?: string | null;
    image_url: string | null;
    sort_order: number;
    is_active?: boolean;
}
