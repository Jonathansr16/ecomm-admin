import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//*COMPONENTS
import { TableProductsComponent } from '@feature/table-products/table-products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { LoadingTableComponent } from './loading-table/loading-table.component';
import { MessageComponent } from './message/message.component';

import { OrdersTemplateComponent } from './orders-template/orders-template.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


//* MODULES
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MenubarModule } from 'primeng/menubar';

import { FilterNoImagePipe } from '@wcommerce/pipes/no-image.pipe';
import { SearchOrderTemplateComponent } from './search-order-template/search-order-template.component';

@NgModule({
  declarations: [
    TableProductsComponent,
    SearchProductComponent,
    SearchOrderTemplateComponent,
    DropZoneComponent,
    BreadcrumbComponent,
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
    TableModule,
    TagModule,
    MenubarModule,
    BreadcrumbModule
  ],
  exports: [
    TableProductsComponent,
    OrdersTemplateComponent,
    DropZoneComponent,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    SearchProductComponent,
    SearchOrderTemplateComponent,
    LoadingTableComponent,
    MessageComponent,
  
  ]
})
export class FeatureModule { }
