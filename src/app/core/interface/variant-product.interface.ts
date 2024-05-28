export interface VariantProduct {
    id: string;
    title: string;
    sku: string;
    units: number;
    regular_price: number;
    sale_price: number;
    imgProduct?: ImageVar;
    status: 'active' | 'inactive';
}

interface ImageVar {
    id?: string;
    url: string;
    alt?: string;
}