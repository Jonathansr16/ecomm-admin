export interface Orders {
    
    id: string;
    noOrder: string;
    status:  'Pendiente' | 'En Proceso' | 'Concretado' | 'En Devolucion' | 'No Concretada';
    date_created: Date;
    authorization_date: Date;
    isFulfillment: boolean;
    total_order: number;
    messeger_service?: string;
    tracking_guide?: string;
    products: ProductOrder[];
    channel?:  string;
    variation?: ProductVariant;
}

export interface ProductOrder {
    id: string;
    product: string;
    sku: string;
    total_product: number;
    quantity?: number;
    image?: ProductOrderImages;
    isFulfiment?: boolean;
    variations?: ProductVariant[];
}

export interface ProductOrderImages {
    src: string;
    alt?: string;
}

export interface ProductVariant {
    id: number;
    attribute: string;
    value: string
    image?: ProductOrderImages
}