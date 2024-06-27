import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  Routes } from '@angular/router';
import { DataTimeInterceptor } from '@claroshop/interceptors/date-time.interceptor';
import { ClaroOrdersService } from '@claroshop/services/claro-orders.service';
import { ClaroProductsService } from '@claroshop/services/claro-products.service';
import { injectTokenInterceptor } from '@mely/interceptors/injectToken.interceptor';
import { MelyService } from '@mely/mely.service';
import { MelyOrdersService } from '@mely/services/mely-orders.service';
import { MelyProductsService } from '@mely/services/mely-products.service';
import { KeyInterceptor } from '@woocommerce/interceptors/key.interceptor';
import { WooOrdersService } from '@woocommerce/services/woo-orders.service';
import { WooProductService } from '@woocommerce/services/woo-product-service.service';

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
        path:'mi-inventario',
        title: 'mi inventario',
        loadComponent: () => import('./pages/my-inventary/my-inventary.component')
      },

      {
        path: 'claroshop',
        loadChildren: () => import('@claroshop/claroshop.routes').then( (r) => r.claroRoutes),

        providers: [
          ClaroOrdersService,
          ClaroProductsService,
          provideHttpClient(
            withInterceptors([DataTimeInterceptor])
          )
        ]
      },

      {
        path: 'mely',
        loadChildren: () => import('@mely/mely.routes').then( (m) => m.MelyRoutes),
        providers: [
          MelyService,
          MelyProductsService,
          MelyOrdersService,
          provideHttpClient(
            withInterceptors([injectTokenInterceptor])
          )
        ]
      },

      {
        path: 'woocommerce',
        loadChildren: () => import('@woocommerce/woo.routes').then( (r) => r.WoocommerceRoute),
        
          providers: [
            WooProductService,
            WooOrdersService,
            provideHttpClient(
              withInterceptors([KeyInterceptor])
            )
          ] 
      },

      {
        path: 'all-orders',
        title: 'todas las ordenes',
        loadComponent: () => import('./pages/all-orders/all-orders.component')
      },
   
     {
      path: 'integraciones',
      loadChildren: () => import('@integrations/my-integrations.routes').then( (i) => i.integrationRoutes)
     },

      {
        path: 'ayuda',
        title: 'ayuda',
        loadChildren: () => import('@ayuda/ayuda.routes').then( (ayuda) => ayuda.ayudaRoutes )
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
   },

   {
    path: 'woocommerce/editor-masivo',
    title: 'Editor masivo',
    loadComponent: () => import('@woocommerce/pages/woo-massive-editor/woo-massive-editor.component'),
    providers: [
      WooProductService,
      provideHttpClient(
        withInterceptors([KeyInterceptor])
      )
    ] 
  }

];

