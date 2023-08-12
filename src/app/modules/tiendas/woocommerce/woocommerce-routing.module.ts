import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WcProductosComponent } from '@tiendas/woocommerce/pages/productos/wc-productoscomponent';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';
import { WcMainComponent } from './pages/main/wc-main.component';
import { WcNewProductComponent } from './pages/wc-new-product/wc-new-product.component';
const WoocommerceRoutes: Routes = [
  { path: 'woocommerce', redirectTo: 'dashboard/woocommerce/productos' },
  {
    path: '',
    component: WcMainComponent,
    children: [
      { path: 'productos', component: WcProductosComponent },
    
      { path: 'pedidos', component: WcPedidosComponent },
      { path: 'clientes', component: WcClientesComponent },
    ],
  },
  { path: 'new-product', component: WcNewProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(WoocommerceRoutes)],
  exports: [RouterModule],
})
export class WoocommerceRoutingModule {}
