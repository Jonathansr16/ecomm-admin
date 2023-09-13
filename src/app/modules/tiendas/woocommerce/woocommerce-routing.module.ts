import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WcInventarioComponent } from '@tiendas/woocommerce/pages/wc-inventario/wc-inventario.component';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';

import { WcNewProductComponent } from './pages/wc-new-product/wc-new-product.component';
import { WcProductComponent } from './pages/wc-product/wc-product.component';
const WoocommerceRoutes: Routes = [
  { path: 'inventario', component: WcInventarioComponent },
  { path: 'new-product', component: WcNewProductComponent },
  { path: 'product/:id', component: WcProductComponent},
  { path: 'pedidos', component: WcPedidosComponent },
  {
    path: 'clientes', component: WcClientesComponent
  },

  // {
  //   path: '',
  //   component: WcMainComponent,
  //   children: [
  //     { path: 'productos', component: WcProductosComponent },
    
  //     { path: 'pedidos', component: WcPedidosComponent },
  //     { path: 'clientes', component: WcClientesComponent },
  //   ],
  // },
  { path: 'new-product', component: WcNewProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(WoocommerceRoutes)],
  exports: [RouterModule],
})
export class WoocommerceRoutingModule {}
