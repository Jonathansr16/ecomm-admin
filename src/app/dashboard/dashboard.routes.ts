import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  Routes } from '@angular/router';
import { DataTimeInterceptor } from '@claroshop/interceptors/date-time.interceptor';
import { ClaroService } from '@claroshop/services/claroservice.service';
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
        loadChildren: () => import('@mely/mely.routes').then( (m) => m.MelyRoutes)
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
        path: 'claroshop',
        loadChildren: () => import('@claroshop/claroshop.routes').then( (r) => r.claroRoutes)
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

