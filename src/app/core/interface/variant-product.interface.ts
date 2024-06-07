export interface VariantProduct {
    id: any;
    title: string;
    sku: string;
    units: number;
    regular_price: number;
    sale_price: number;
    imgProduct?: ImageVar;
    status: 'active' | 'inactive';
}

interface ImageVar {
    id?: any;
    url: string;
    alt?: string;
}