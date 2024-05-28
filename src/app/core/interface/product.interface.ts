import { VariantProduct } from "./variant-product.interface";

export interface ProductInventory {
    id: any;
    title: string;
    description?: string;
    short_description?: string;
    sku: string;
    store: 'woocommerce' | 'mely' | 'amazon' | 'claroshop',
    regular_price?: number;
    isFulfillment?: boolean;
    sale_price: number;
    units?: number;
    status: 'active' | 'inactive';
    total_sales?: number;
    category?: any;
    imageProduct?: ProductImage;
    isDropdownInformation: boolean;
    channel: string;
    variations?: VariantProduct[];
}

export interface ProductImage {
    id?: string;
    url: string;
    alt?: string;
}