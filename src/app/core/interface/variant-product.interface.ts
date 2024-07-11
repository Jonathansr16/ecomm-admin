import { FileItem } from "../models/file-item.models";

export interface VariantProduct {
    id: any;
    sku: string;
    stock: number;
    regular_price: number;
    sale_price: number;
    images: FileItem[] | undefined;
    status: 'active' | 'inactive';
    attributes: AttributesVariants[]
    total_sales?: number;
}

export interface AttributesVariants {
    id: any;
    attribute: string;
    value: string
}