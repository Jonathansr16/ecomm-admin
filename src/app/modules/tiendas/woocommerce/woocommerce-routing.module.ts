import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WoocommerceComponent } from '@wcommerce/pages/woocommerce/woocommerce.component';

const WoocommerceRoutes: Routes = [
    {
      path: '', component: WoocommerceComponent,
    },

    {
      path: '', redirectTo: '/dashboard/tiendas/woocommerce', pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(WoocommerceRoutes)],
  exports: [RouterModule]
})
export class WoocommerceRoutingModule { }
