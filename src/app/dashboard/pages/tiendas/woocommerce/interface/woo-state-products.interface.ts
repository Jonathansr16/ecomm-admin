import { WooProducto } from "@woocommerce/models/wc-new-product.model";

export interface StateWooProduct {
    status: 'loading' | 'success' | 'empty' | 'error';
    data: WooProducto;
  }