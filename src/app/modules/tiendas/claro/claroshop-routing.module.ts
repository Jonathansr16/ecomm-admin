import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from '@claro/pages/inventario/inventario.component';
import { PedidosComponent } from '@claro/pages/pedidos/pedidos.component';
import { PedidosPendientesComponent } from './pages/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosEntregadosComponent } from './pages/pedidos/pedidos-entregados/pedidos-entregados.component';
import { PedidosEmbarcadosComponent } from './pages/pedidos/pedidos-embarcados/pedidos-embarcados.component';

const claroRoutes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'pedidos', component: PedidosComponent, children: [
  {path: 'pendientes', component: PedidosPendientesComponent },
  {path: 'entregados', component: PedidosEntregadosComponent },
  {path: 'embarcados', component: PedidosEmbarcadosComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(claroRoutes)],
  exports: [RouterModule]
})
export class ClaroshopRoutingModule { }
