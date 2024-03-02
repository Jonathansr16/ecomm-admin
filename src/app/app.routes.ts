import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('@auth/login/login.component'),
  },
  {
    path: 'registro',
    title: 'registro',
    loadComponent: () => import('@auth/register/register.component'),
  },

  {
    path: 'dashboard',
    title: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then( (r) => r.dashboardRoutes),
    
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
