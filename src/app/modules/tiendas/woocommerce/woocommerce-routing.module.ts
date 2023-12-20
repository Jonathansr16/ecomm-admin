import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from "@wcommerce/pages/inventario/inventario.component";
import { ClientesComponent } from '@wcommerce/pages/clientes/clientes.component';

import { WcNewProductComponent } from '@wcommerce/pages/new-product/wc-new-product.component';
import { ProductComponent } from '@wcommerce/pages/product/product.component';

//ORDENES COMPONENTS
import { WooOrdersComponent } from './pages/woo-orders/woo-orders.component';
import { WooOrdersPendingComponent } from './pages/woo-orders/woo-orders-pending/woo-orders-pending.component';
import { WooOrdersFailedComponent } from './pages/woo-orders/woo-orders-failed/woo-orders-failed.component';
import { WooOrdersCompletedComponent } from './pages/woo-orders/woo-orders-completed/woo-orders-completed.component';

const WoocommerceRoutes: Routes = [
  { path: 'inventario', component: InventarioComponent, data: { title: 'Inventario', icon: 'trolley'} },
  { path: 'new-product', component: WcNewProductComponent, data: { title: 'New Product', icon: 'box_add'} },
  { path: 'product/:id', component: ProductComponent, data: { title: 'Producto'} },
  { path: 'ordenes', component: WooOrdersComponent, data: { title: 'Ordenes'}, children: [
     { path: 'pendientes', component: WooOrdersPendingComponent, data: { title: 'Pendientes'} }, 
     { path: 'concretadas', component: WooOrdersCompletedComponent, data: { title: 'Concretados'} },
     { path: 'falladas', component: WooOrdersFailedComponent, data: { title: 'Falladas'} },
    
  ] },
  { path: 'clientes', component: ClientesComponent },

  { path: 'new-product', component: WcNewProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(WoocommerceRoutes)],
  exports: [RouterModule],
})
export class WoocommerceRoutingModule {}
