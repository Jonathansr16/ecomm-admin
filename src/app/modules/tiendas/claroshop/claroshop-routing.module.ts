import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
//ORDERS COMPONENTS
import { ClaroOrdersComponent } from './pages/claro-orders/claro-orders.component';
import { ClaroOrdersPendingComponent } from './pages/claro-orders/claro-orders-pending/claro-orders-pending.component';
import { ClaroOrdersProgressComponent } from './pages/claro-orders/claro-orders-progress/claro-orders-progress.component';
import { ClaroOrdersCompletedComponent } from './pages/claro-orders/claro-orders-completed/claro-orders-completed.component';

const claroRoutes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'ordenes', component: ClaroOrdersComponent, children: [
  {path: 'pendientes', component: ClaroOrdersPendingComponent },
  {path: 'embarcados', component: ClaroOrdersProgressComponent },
  {path: 'concretadas', component: ClaroOrdersCompletedComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(claroRoutes)],
  exports: [RouterModule]
})
export class ClaroshopRoutingModule { }
