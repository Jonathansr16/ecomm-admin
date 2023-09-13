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


//* MODULES


@NgModule({
  declarations: [
    TableProductsComponent,
    SearchProductComponent,
    DropZoneComponent
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
    DropZoneComponent
  ]
})
export class FeatureModule { }
