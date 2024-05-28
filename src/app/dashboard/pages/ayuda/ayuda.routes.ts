
import { Routes } from '@angular/router';

export const ayudaRoutes: Routes = [
   
  // { path: 'dashboard/soporte', redirectTo: 'ayuda/soporte', pathMatch: 'full'},
  // { path: 'soporte', component: HelpComponent },
  {
    path: 'ayuda',
    title: 'ayuda',
    loadComponent: () => import('@ayuda/ayuda.component'),

  }

];

