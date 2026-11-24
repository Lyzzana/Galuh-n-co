export const BASE_BOX_PRICE = 150000;
export const MAX_PARCEL_SLOTS = 6;

export type ParcelItemId =
    | 'nastar-jar'
    | 'earl-grey-tin'
    | 'raw-honey'
    | 'scented-candle'
    | 'brass-mug'
    | 'dark-chocolate';

export interface ParcelCatalogItem {
    id: ParcelItemId;
    name: string;
    price: number;
    category: string;
    shortDesc: string;
}

export interface StoredParcelItem {
    id: string;
    name: string;
    price: number;
    slot?: number;
    category?: string;
}

export const PARCEL_ITEMS: ParcelCatalogItem[] = [
    {
        id: 'nastar-jar',
        name: 'Artisanal Nastar & Cookies Jar',
        price: 125000,
        category: 'Pastry',
        shortDesc: 'Toples kaca silinder bertutup brass isi kue keemasan.',
    },
    {
        id: 'earl-grey-tin',
        name: 'Royal Earl Grey Tea Tin',
        price: 95000,
        category: 'Tea & Coffee',
        shortDesc: 'Kaleng teh premium Deep Navy beraksen list emas.',
    },
    {
        id: 'raw-honey',
        name: 'Forest Blossom Raw Honey',
        price: 110000,
        category: 'Gourmet',
        shortDesc: 'Botol kaca berisi madu hutan murni bernuansa amber.',
    },
    {
        id: 'scented-candle',
        name: 'Sandalwood & Vanilla Scented Candle',
        price: 135000,
        category: 'Home Living',
        shortDesc: 'Lilin aromaterapi wadah keramik Warm Ivory elegan.',
    },
    {
        id: 'brass-mug',
        name: 'Signature Brass-Trimmed Mug',
        price: 145000,
        category: 'Tableware',
        shortDesc: 'Cangkir porselen Deep Navy dengan lis bibir emas.',
    },
    {
        id: 'dark-chocolate',
        name: 'Artisan Dark Chocolate Bar',
        price: 85000,
        category: 'Confectionery',
        shortDesc: 'Cokelat artisan premium dalam kotak tipis berpita brass.',
    },
];

export interface QuickPreset {
    id: string;
    name: string;
    desc: string;
    slots: Array<ParcelItemId | null>;
}

export const QUICK_PRESETS: QuickPreset[] = [
    {
        id: 'executive-tea',
        name: 'Executive Tea & Coffee',
        desc: '4 slot kurasi teh, madu, nastar, & cokelat artisan',
        slots: [
            'earl-grey-tin',
            'raw-honey',
            'nastar-jar',
            'dark-chocolate',
            null,
            null,
        ],
    },
    {
        id: 'serenity-living',
        name: 'Serenity Living',
        desc: '4 slot relaksasi mug porselen, lilin, teh, & madu',
        slots: [
            'brass-mug',
            'scented-candle',
            'earl-grey-tin',
            'raw-honey',
            null,
            null,
        ],
    },
    {
        id: 'royal-full',
        name: 'Royal Full Collection',
        desc: 'Seluruh 6 item kurasi eksklusif Galuh & Co.',
        slots: [
            'nastar-jar',
            'earl-grey-tin',
            'raw-honey',
            'scented-candle',
            'brass-mug',
            'dark-chocolate',
        ],
    },
];
