import { WooProductAttibutesResul } from "./woo-product-attributes.interface";

export interface StateWooProductAttibutes {
    status: 'loading' | 'success' | 'empty' | 'error';
    data: WooProductAttibutesResul[];
}