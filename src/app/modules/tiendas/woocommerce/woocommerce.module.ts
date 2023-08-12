import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WcProductosComponent } from '@tiendas/woocommerce/pages/productos/wc-productoscomponent';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { FeatureModule } from '@feature/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';
import { WcMainComponent } from './pages/main/wc-main.component';
import { WcNewProductComponent } from './pages/wc-new-product/wc-new-product.component';



@NgModule({
  declarations: [
    WcMainComponent,
    WcProductosComponent,
    WcPedidosComponent,
    WcClientesComponent,
    WcNewProductComponent,
  ],
  imports: [
    CommonModule,
    WoocommerceRoutingModule,
    SharedNgPrimeModule,
    FeatureModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WoocommerceModule { }
