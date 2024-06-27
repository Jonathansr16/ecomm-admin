import { Routes } from "@angular/router";

export const MelyRoutes: Routes = [
  
    {  
        path: 'inventario', 
        loadComponent: () => import('@mely/pages/mely-inventory/mely-inventory.component')
    },

    {
        path: 'ordenes',
        loadComponent: () => import('@mely/pages/mely-orders/mely-orders.component')
    },

    {
        path: 'ordenes/order-details/:id',
        loadComponent: () => import('@mely/pages/mely-orders/mely-details-order/mely-details-order.component')
    },

    {
        path: 'preguntas',
        loadComponent: () => import('@mely/pages/mely-mely-asks/mely-asks.component')
    }
];
