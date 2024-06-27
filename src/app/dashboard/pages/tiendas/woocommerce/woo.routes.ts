import { Routes } from '@angular/router';

export const WoocommerceRoute: Routes = [

  {
    path: 'inventario',
    title: 'inventario',
    loadComponent: () => import('@woocommerce/pages/woo-inventory/woo-inventory.component'),
 
  },

  {
    path: 'edit-product/:id',
    title: 'producto',
    loadComponent: () => import('@woocommerce/pages/woo-edit-product/woo-edit-product.component')
  },

  {
    path: 'nuevo-producto',
    title: 'nuevo-producto',
    loadComponent: () => import('@woocommerce/pages/woo-new-product/woo-new-product.component')
  },

  {
    path: 'ordenes',
    title: 'Lista de Ordenes',
    loadComponent: () => import ('@woocommerce/pages/woo-orders/woo-orders.component')
  },

  // {
  //   path: 'editor-masivo',
  //   title: '',
  //   loadComponent: () => import('@woocommerce/pages/woo-massive-editor/woo-massive-editor.component')
  // }

 
  
]
