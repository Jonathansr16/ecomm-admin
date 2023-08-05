import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { WcProductosComponent } from '@tiendas/woocommerce/pages/productos/wc-productoscomponent';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { FeatureModule } from '@feature/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';
import { WcMainComponent } from './pages/main/wc-main.component';
import { ProductoInfoComponent } from './producto-info/producto-info.component';


@NgModule({
  declarations: [
    WcMainComponent,
    WcProductosComponent,
    WcPedidosComponent,
    WcClientesComponent,
    ProductoInfoComponent,
  ],
  imports: [
    CommonModule,
    WoocommerceRoutingModule,
    SharedNgPrimeModule,
    FeatureModule,
    HttpClientModule
  ]
})
export class WoocommerceModule { }
