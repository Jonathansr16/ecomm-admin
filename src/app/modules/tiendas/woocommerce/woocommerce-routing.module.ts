import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WcProductosComponent } from '@tiendas/woocommerce/pages/productos/wc-productoscomponent';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';
import { WcMainComponent } from './pages/main/wc-main.component';
import { ProductoInfoComponent } from './producto-info/producto-info.component';

const WoocommerceRoutes: Routes = [
  { path: 'woocommerce', redirectTo: 'dashboard/woocommerce/productos' },
  {
    path: '',
    component: WcMainComponent,
    children: [
      { path: 'productos', component: WcProductosComponent },
      { path: 'pedidos', component: WcPedidosComponent },
      { path: 'clientes', component: WcClientesComponent },
      { path: 'producto-info/:id', component: ProductoInfoComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(WoocommerceRoutes)],
  exports: [RouterModule],
})
export class WoocommerceRoutingModule {}
