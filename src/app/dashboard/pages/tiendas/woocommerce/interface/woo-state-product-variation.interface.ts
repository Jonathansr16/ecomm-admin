import { WooProductVar } from "./woo-product-variation.interface";

export interface StateWooProductVariations {
    status: 'loading' | 'success' | 'empty' | 'error';
    data: WooProductVar[],

}