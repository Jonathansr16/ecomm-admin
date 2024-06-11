import { Orders } from "./orders.interface";

export interface StateOrders {
    status: 'loading' | 'success' | 'empty' | 'error';
    orders: Orders[];
}