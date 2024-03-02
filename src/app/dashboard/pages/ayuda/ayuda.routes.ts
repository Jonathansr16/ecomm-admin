import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ayudaRoutes: Routes = [
   
  // { path: 'dashboard/soporte', redirectTo: 'ayuda/soporte', pathMatch: 'full'},
  // { path: 'soporte', component: HelpComponent },
  {
    path: 'ayuda',
    title: 'ayuda',
    loadComponent: () => import('@ayuda/ayuda.component'),
    children: [
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(ayudaRoutes)],
  exports: [RouterModule]
})
export class AyudaRoutingModule { }
