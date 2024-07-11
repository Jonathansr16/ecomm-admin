import { Inventory } from "./product.interface";

export interface StateProducts {
    status: 'loading' | 'success' | 'empty' | 'error';
    data: Inventory[]
}