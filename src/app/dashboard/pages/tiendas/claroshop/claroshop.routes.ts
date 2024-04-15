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
    // children: [
    //   {
    //     path: 'pendientes',
    //     loadComponent: () =>
    //       import(
    //         '@claroshop/pages/order-list/pending-orders/pending-orders.component'
    //       ),
    //   },

    //   {
    //     path: 'embarcados',
    //     loadComponent: () =>
    //       import(
    //         '@claroshop/pages/order-list/in-proccess-orders/in-process-orders.component'
    //       ),
    //   },

    //   {
    //     path: 'concretadas',
    //     loadComponent: () =>
    //       import(
    //         '@claroshop/pages/order-list/completed-orders/orders-completed.component'
    //       ),
    //   },

    //   {
    //     path: '',
    //     redirectTo: 'pendientes',
    //     pathMatch: 'full',
    //   },
    // ],
  },

  {
    path: '',
    redirectTo: 'dashboard/claroshop/inventario',
    pathMatch: 'full'
  }
];
