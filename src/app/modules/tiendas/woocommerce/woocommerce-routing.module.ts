import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from "@wcommerce/pages/inventario/inventario.component";
import { PedidosComponent } from '@wcommerce/pages/pedidos/pedidos.component';
import { ClientesComponent } from '@wcommerce/pages/clientes/clientes.component';

import { WcNewProductComponent } from '@wcommerce/pages/new-product/wc-new-product.component';
import { ProductComponent } from '@wcommerce/pages/product/product.component';
import { PedidosPendientesComponent } from '@wcommerce/pages/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosCompletadosComponent } from '@wcommerce/pages/pedidos/pedidos-completados/pedidos-completados.component';
import { PedidosCanceladosComponent } from './pages/pedidos/pedidos-cancelados/pedidos-cancelados.component';

const WoocommerceRoutes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'new-product', component: WcNewProductComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'pedidos', component: PedidosComponent, children: [
     { path: 'pendientes', component: PedidosPendientesComponent }, 
     { path: 'concretados', component: PedidosCompletadosComponent },
     { path: 'cancelados', component: PedidosCanceladosComponent },
    
  ] },
  { path: 'clientes', component: ClientesComponent },

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
