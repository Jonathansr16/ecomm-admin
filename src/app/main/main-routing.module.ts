import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@main/main.component';

const routes: Routes = [

  { path: '', component: MainComponent, children: [

   { 
    path: 'home', loadChildren: () => import('@home/home.module').then(h => h.HomeModule)
   },

   {
    path: 'tiendas/woocommerce', loadChildren: () => import('@tiendas/woocommerce/woocommerce.module').then(w => w.WoocommerceModule)
   },

   {
    path: 'ayuda', loadChildren: () => import('@ayuda/ayuda.module').then(ayuda => ayuda.AyudaModule)
   }





  ]},

  { path: '', redirectTo: '/', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
