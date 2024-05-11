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
    loadComponent: () => import('@woocommerce/pages/edit-product/edit-product.component')
  },

  {
    path: 'nuevo-producto',
    title: 'nuevo-producto',
    loadComponent: () => import('@woocommerce/pages/new-product/wc-new-product.component')
  },

  {
    path: 'ordenes',
    title: 'Lista de Ordenes',
    loadComponent: () => import ('@woocommerce/pages/orders/orders.component')
  },

 
  
]
