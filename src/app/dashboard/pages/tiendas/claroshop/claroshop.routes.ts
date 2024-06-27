import { Routes } from '@angular/router';

export const claroRoutes: Routes = [
  {
    path: 'inventario',
    loadComponent: () =>
      import('@claroshop/pages/claro-inventory/claro-inventory.component'),
  },
  {
    path: 'ordenes',
    loadComponent: () =>
      import(
        '@claroshop/pages/claro-orders/claro-orders.component'
      ),
  },

  {
    path: 'ordenes/order-details/:id',
    loadComponent: () =>
      import(
        '@claroshop/pages/claro-orders/claro-details-order/claro-details-order.component'
      ),
  },


  {
    path: '',
    redirectTo: 'dashboard/claroshop/inventario',
    pathMatch: 'full'
  }
];
