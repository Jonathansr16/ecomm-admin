import { WooCategoryResult } from "./woo-category-product.interface";

export interface StateWooCategory {
    data: WooCategoryResult[];
    status: 'loading' | 'success' | 'empty' | 'error';
}