import { Routes } from "@angular/router";

export const MelyRoutes: Routes = [
  
    {  
        path: 'inventario', 
        loadComponent: () => import('@mely/pages/inventory/inventory.component')
    },

    {
        path: 'ordenes',
        loadComponent: () => import('@mely/pages/orders/orders.component')
    },

    {
        path: 'order-details/:id',
        loadComponent: () => import('@mely/pages/orders/details/details.component')
    }
];
