import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WcInventarioComponent } from '@tiendas/woocommerce/pages/wc-inventario/wc-inventario.component';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { FeatureModule } from '@feature/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { WcPedidosComponent } from './pages/pedidos/wc-pedidos.component';
import { WcClientesComponent } from './pages/clientes/wc-clientes.component';
import { WcMainComponent } from './pages/main/wc-main.component';
import { WcNewProductComponent } from './pages/wc-new-product/wc-new-product.component';
import { WcProductComponent } from './pages/wc-product/wc-product.component';

import { KnobModule } from 'primeng/knob';



@NgModule({
  declarations: [
    WcMainComponent,
    WcInventarioComponent,
    WcPedidosComponent,
    WcClientesComponent,
    WcNewProductComponent,
    WcProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    WoocommerceRoutingModule,
    SharedNgPrimeModule,
    FeatureModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    FeatureModule,
    KnobModule
  ]
})
export class WoocommerceModule { }
