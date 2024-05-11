export interface Orders {
    
    id: string;
    noOrder: string;
    status:  'Pendiente' | 'En Proceso' | 'Concretado' | 'En Devolucion' | 'No Concretada';
    date_created: Date;
    authorization_date: Date;
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