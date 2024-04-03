export interface Orders {
    id: number;
    noOrder: string;
    status: string;
    date_created: Date;
    shipment_date: Date;
    fulfillment: boolean;
    total: number;
    messeger_service?: string;
    tracking_guide?: string;
    products: ProductOrder[];
}

export interface ProductOrder {
    product: string;
    sku: string;
    total: number;
    quantity?: number;
    image?: ProductOrderImages;
}

export interface ProductOrderImages {
    src: string;
    alt?: string;
}