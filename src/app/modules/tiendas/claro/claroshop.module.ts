import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaroshopRoutingModule } from './claroshop-routing.module';
import { InventarioComponent } from '@claro/pages/inventario/inventario.component';
import { PedidosComponent } from '@claro/pages/pedidos/pedidos.component';
import { FeatureModule } from '@feature/feature.module';
import { FormsModule } from '@angular/forms';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { PedidosEntregadosComponent } from './pages/pedidos/pedidos-entregados/pedidos-entregados.component';
import { PedidosPendientesComponent } from './pages/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosEmbarcadosComponent } from './pages/pedidos/pedidos-embarcados/pedidos-embarcados.component';

@NgModule({
  declarations: [
    InventarioComponent,
    PedidosComponent,
    PedidosEntregadosComponent,
    PedidosPendientesComponent,
    PedidosEmbarcadosComponent,

  
  ],
  imports: [
    CommonModule,
    ClaroshopRoutingModule,
    FeatureModule,
    FormsModule,
    SharedNgPrimeModule
  ]
})
export class ClaroshopModule { }
