import { FileItem } from "../models/file-item.models";
import { VariantProduct } from "./variant-product.interface";

export interface Inventory {
    id:                   any
    title:                 string;
    description?:          string;
    short_description?:    string | 
                           undefined;
    sku:                   string;
    store:                 'woocommerce' | 
                           'mely' |
                           'amazon' |
                           'claroshop',
    regular_price?:        number;
    sale_price:            number;
    stock?:                number;
    status:                'active' |
                           'inactive';
    stock_status?:         'instock' |
                           'outofstock' |
                           undefined;
    total_sales?:          number;
    category?:             any;
    images?:               FileItem[];
    isDropdownInformation: boolean;
    isFulfillment?:        boolean;
    variations?:           VariantProduct[];
}

