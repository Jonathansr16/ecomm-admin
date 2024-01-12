import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaroshopRoutingModule } from './claroshop-routing.module';
import { FeatureModule } from '@feature/feature.module';
import { FormsModule } from '@angular/forms';



import { InventarioComponent } from '@claroshop/pages/inventario/inventario.component';
//ORDERS COMPONENTS
import { ClaroOrdersComponent } from '@claroshop/pages/claro-orders/claro-orders.component';
import { ClaroOrdersPendingComponent } from '@claroshop/pages/claro-orders/claro-orders-pending/claro-orders-pending.component';
import { ClaroOrdersProgressComponent } from '@claroshop/pages/claro-orders/claro-orders-progress/claro-orders-progress.component';
import { ClaroOrdersCompletedComponent } from '@claroshop/pages/claro-orders/claro-orders-completed/claro-orders-completed.component';

import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTimeInterceptor } from './services/date-time.interceptopr';
import { ClaroService } from './services/claroservice.service';
import { OrdersComponent } from './components/orders/orders.component';
import { TableProductsComponent } from '@feature/table-products/table-products.component';

@NgModule({
  declarations: [
   
    InventarioComponent,
    ClaroOrdersComponent,
    ClaroOrdersPendingComponent,
    ClaroOrdersProgressComponent,
    ClaroOrdersCompletedComponent,
    OrdersComponent

  
  ],
  imports: [
    CommonModule,
    ClaroshopRoutingModule,
    FeatureModule,
    FormsModule,
    SharedNgPrimeModule,
    TableProductsComponent
  ],
  providers: [
    ClaroService,
    { provide: HTTP_INTERCEPTORS, useClass: DataTimeInterceptor, multi: true}
  ]
})
export class ClaroshopModule { }
