import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InventarioComponent } from '@wcommerce/pages/inventario/inventario.component';
import { FeatureModule } from '@feature/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { PedidosComponent } from '@wcommerce/pages/pedidos/pedidos.component';
import { ClientesComponent } from '@wcommerce/pages/clientes/clientes.component';
import { WcNewProductComponent } from '@wcommerce/pages/new-product/wc-new-product.component';
import { ProductComponent } from '@wcommerce/pages/product/product.component';

import { KnobModule } from 'primeng/knob';
import { AccordeonComponent } from './components/accordeon/accordeon.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';

import { FieldsetModule } from 'primeng/fieldset';

import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { PedidosCompletadosComponent } from './pages/pedidos/pedidos-completados/pedidos-completados.component';
import { PedidosCanceladosComponent } from './pages/pedidos/pedidos-cancelados/pedidos-cancelados.component';
import { PedidosPendientesComponent } from './pages/pedidos/pedidos-pendientes/pedidos-pendientes.component';




@NgModule({
  declarations: [
    InventarioComponent,
    PedidosComponent,
    ClientesComponent,
    WcNewProductComponent,
    ProductComponent,
    AccordeonComponent,
    FilterPipe,
    PedidosCompletadosComponent,
    PedidosCanceladosComponent,
    PedidosPendientesComponent,
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
    KnobModule,
    FieldsetModule,
    ProgressBarModule,
    ToastModule

  ]
})
export class WoocommerceModule { }
