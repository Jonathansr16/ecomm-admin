export interface ProductInventory {
    id: number;
    title: string;
    description?: string;
    short_description?: string;
    sku: string;
    store: 'woocommerce' | 'mely' | 'amazon' | 'claroshop',
    regular_price?: number;
    sale_price: number;
    units?: number;
    status: 'active' | 'inactive';
    total_sales?: number;
    category?: any;
    imagesProduct?: any[];
    isDropdownInformation: boolean;
}