import { ProductInventory } from "@components/interfaces/product.interface";

export class Product {


    static productFromJson(obj: ProductInventory) {
        return new Product(
            obj['id'],
            obj['title'],
            obj['sku'],
            obj['store'],
            obj['sale_price'],
            obj['status']
        )
    }

    constructor(
        public id: number,
        public title: string,
        public sku: string,
        public store: 'woocommerce' | 'mercado libre' | 'amazon' | 'claroshop',
        public sale_price: number | string,
        public status: 'active' | 'inactive'

    ) {

    }
}