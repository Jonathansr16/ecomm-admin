import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  Routes } from '@angular/router';
import { DataTimeInterceptor } from '@claroshop/interceptors/date-time.interceptor';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { injectTokenInterceptor } from '@mely/interceptors/injectToken.interceptor';
import { MelyService } from '@mely/mely.service';
import { KeyInterceptor } from '@woocommerce/interceptors/key.interceptor';
import { WooService } from '@woocommerce/services/woo.service';

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
        path: 'claroshop',
        loadChildren: () => import('@claroshop/claroshop.routes').then( (r) => r.claroRoutes),

        providers: [
          ClaroService,
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
          provideHttpClient(
            withInterceptors([injectTokenInterceptor])
          )
        ]
      },

      {
        path: 'woocommerce',
        loadChildren: () => import('@woocommerce/woo.routes').then( (r) => r.WoocommerceRoute),
        
          providers: [
            WooService,
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
   }
];

