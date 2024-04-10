export interface Orders {
    
    id: number;
    noOrder: string;
    status:  'Pendiente' | 'En Proceso' | 'Concretado';
    date_created: Date;
    shipment_date: Date;
    fulfillment: boolean;
    total_order: number;
    messeger_service?: string;
    tracking_guide?: string;
    products: ProductOrder[];
    channel?:  string;
}

export interface ProductOrder {
    product: string;
    sku: string;
    total_product: number;
    quantity?: number;
    image?: ProductOrderImages;
}

export interface ProductOrderImages {
    src: string;
    alt?: string;
}