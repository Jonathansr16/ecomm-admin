import { Routes } from '@angular/router';

export const WoocommerceRoute: Routes = [

  {
    path: 'inventario',
    title: 'inventario',
    loadComponent: () => import('@woocommerce/pages/inventario/inventario.component'),
 
  },

  {
    path: 'edit-product/:id',
    title: 'producto',
    loadComponent: () => import('@woocommerce/pages/product/product.component')
  },

  {
    path: 'nuevo-producto',
    title: 'nuevo-producto',
    loadComponent: () => import('@woocommerce/pages/new-product/wc-new-product.component')
  },

  {
    path: 'ordenes',
    title: 'Lista de Ordenes',
    loadComponent: () => import ('@woocommerce/pages/order-list/order-list.component'),
    children: [
      {
        path: 'pendientes',
        title: 'Ordenes Pendientes',
        loadComponent: () => import('@woocommerce/pages/order-list/pending-orders/pending-orders.component')
      }, 
      
      {
        path: 'concretadas',
        title: 'Ordenes concretadas',
        loadComponent: () => import('@woocommerce/pages/order-list/completed-orders/completed-orders.component')
      },

      {
        path: 'falladas',
        title: 'Ordenes falladas',
        loadComponent: () => import('@woocommerce/pages/order-list/failed-orders/failed-orders.component')
      },

      {
        path: '',
        redirectTo: 'pendientes',
        pathMatch: 'full'
      },
      
    

    ],


  },

 
  
]
