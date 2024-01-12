import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//*COMPONENTS
import { SearchProductComponent } from './search-product/search-product.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { LoadingTableComponent } from './loading-table/loading-table.component';
import { MessageComponent } from './message/message.component';

import { OrdersTemplateComponent } from './orders-template/orders-template.component';


//* MODULES
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { MenubarModule } from 'primeng/menubar';

import { FilterNoImagePipe } from '@wcommerce/pipes/no-image.pipe';
import { SearchOrderTemplateComponent } from './search-order-template/search-order-template.component';

@NgModule({
  declarations: [

    SearchProductComponent,
    SearchOrderTemplateComponent,
    ExpansionPanelComponent,
    LoadingTableComponent,
    MessageComponent,
  OrdersTemplateComponent,
    FilterNoImagePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedNgPrimeModule,

    MenubarModule,
  ],
  exports: [
    OrdersTemplateComponent,
    ExpansionPanelComponent,
    SearchProductComponent,
    SearchOrderTemplateComponent,
    LoadingTableComponent,
    MessageComponent,
  
  ]
})
export class FeatureModule { }
