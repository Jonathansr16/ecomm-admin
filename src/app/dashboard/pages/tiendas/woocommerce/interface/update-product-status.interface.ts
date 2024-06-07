export interface UpdateStatusProduct {
    id: number;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    status: 'draft' | 'publish' | 'private' | 'pending';
}