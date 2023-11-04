import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//*COMPONENTS
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { TableProductsComponent } from '@feature/table-products/table-products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { TablePedidosComponent } from './table-pedidos/table-pedidos.component';
import { LoadingTableComponent } from './loading-table/loading-table.component';
import { MessageComponent } from './message/message.component';


//* MODULES


@NgModule({
  declarations: [
    TableProductsComponent,
    SearchProductComponent,
    DropZoneComponent,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    TablePedidosComponent,
    LoadingTableComponent,
    MessageComponent,

    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedNgPrimeModule,
    TableModule,
    TagModule
  ],
  exports: [
    TableProductsComponent,
    DropZoneComponent,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    TablePedidosComponent,
    SearchProductComponent,
    LoadingTableComponent,
    MessageComponent
  ]
})
export class FeatureModule { }
