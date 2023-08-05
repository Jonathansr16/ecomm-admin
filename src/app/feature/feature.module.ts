import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//*COMPONENTS
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { TableComponent } from '@feature/table/table.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';


//* MODULES


@NgModule({
  declarations: [
    TableComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedNgPrimeModule,
    TableModule,
    TagModule
  ],
  exports: [
    TableComponent
  ]
})
export class FeatureModule { }
