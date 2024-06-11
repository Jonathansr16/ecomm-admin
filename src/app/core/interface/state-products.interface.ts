import { ProductInventory } from "./product.interface";

export interface StateProducts {
    status: 'loading' | 'success' | 'empty' | 'error';
    products: ProductInventory[]
}