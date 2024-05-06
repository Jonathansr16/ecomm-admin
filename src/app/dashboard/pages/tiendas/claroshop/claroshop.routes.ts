import { Routes } from '@angular/router';

export const claroRoutes: Routes = [
  {
    path: 'inventario',
    loadComponent: () =>
      import('@claroshop/pages/inventario/inventario.component'),
  },
  {
    path: 'ordenes',
    loadComponent: () =>
      import(
        '@claroshop/pages/orders/orders.component'
      ),
  },

  {
    path: 'ordenes/order-details/:id',
    loadComponent: () =>
      import(
        '@claroshop/pages/orders/order-details/order-details.component'
      ),
  },


  {
    path: '',
    redirectTo: 'dashboard/claroshop/inventario',
    pathMatch: 'full'
  }
];
