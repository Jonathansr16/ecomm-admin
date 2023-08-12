export interface wcProductoModel {
    name: string;
    description: string;
    short_description: string;
    price: string;
    regular_price: string;
    stock_status: string;
    sku: string;
    status: string;
    stock_quantity: string;
    images:  wcImage[];
}

export interface wcImage {
    src: string;
    name?: string;
    alt?: string;
}

