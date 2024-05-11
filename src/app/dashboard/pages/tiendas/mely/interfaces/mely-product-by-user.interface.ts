export interface MelyProductByUserID {
    seller_id:        string;
    results:          string[];
    paging:           Paging;
    query:            null;
    orders:           Order[];
    available_orders: AvailableOrder[];
}

export interface AvailableOrder {
    id:   IDClass | string;
    name: string;
}

export interface IDClass {
    id:      string;
    field:   string;
    missing: string;
    order:   string;
}

export interface Order {
    id:   string;
    name: string;
}

export interface Paging {
    limit:  number;
    offset: number;
    total:  number;
}
