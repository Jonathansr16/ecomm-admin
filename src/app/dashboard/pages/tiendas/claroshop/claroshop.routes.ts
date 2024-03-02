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
        '@claroshop/pages/claroshop-order-list/claroshop-order-list.component'
      ),
    children: [
      {
        path: 'pendientes',
        loadComponent: () =>
          import(
            '@claroshop/pages/claroshop-order-list/claroshop-pending-orders/claroshop-pending-orders.component'
          ),
      },

      {
        path: 'embarcados',
        loadComponent: () =>
          import(
            '@claroshop/pages/claroshop-order-list/claroshop-in-proccess-orders/claroshop-in-process-orders.component'
          ),
      },

      {
        path: 'concretadas',
        loadComponent: () =>
          import(
            '@claroshop/pages/claroshop-order-list/claroshop-completed-orders/claro-orders-completed.component'
          ),
      },

      {
        path: '',
        redirectTo: 'pendientes',
        pathMatch: 'full',
      },
    ],
  },
];
