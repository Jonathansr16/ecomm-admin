export interface VariantProduct {
    id: any;
    title: string;
    sku: string;
    stock: number;
    regular_price: number;
    sale_price: number;
    imgProduct?: ImageVar;
    status: 'active' | 'inactive';
    total_sales?: number;
}

interface ImageVar {
    id?: any;
    url: string;
    alt?: string;
}