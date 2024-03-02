import {  Routes } from '@angular/router';

export const dashboardRoutes: Routes = [

  {
    path: '', 
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'home',
        title: 'home',
        loadComponent: () => import('./pages/home/home.component'),
      },


      {
        path: 'woocommerce',
        loadChildren: () => import('@woocommerce/woocommerce.routes').then( (r) => r.WoocommerceRoute),
     
      },


      {
        path: 'ayuda',
        title: 'ayuda',
        loadChildren: () => import('@home/home-routing.module').then( (m) => m.HomeRoutingModule)
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
   }
];

