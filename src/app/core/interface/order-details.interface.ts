export interface OrderDetails {
    id: string;
    status: string;
    shipping: Shipping;
    products: ProductOrder[];
    units?: number;
    total_order: string;
    date_created: Date;
    shipment_date: Date;
    fulfillment?: boolean;
    tracking_guide?: string;
    channel: string;
    messenger_service: string;
    billing?: Billing
}

export interface Shipping {
    client: string;
    address: string;
    cp: string;
    city: string;
    country: string;
    phone?: string;
    references?: string;
}

export interface ProductOrder {
    title: string;
    sku: string;
    quantity?: number;
    image?: string;
    total: string;

}

export interface Billing {

}
