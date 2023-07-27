import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { WoocommerceComponent } from '@wcommerce/pages/woocommerce/woocommerce.component';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { FeatureModule } from '@feature/feature.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    WoocommerceComponent,
 
  ],
  imports: [
    CommonModule,
    WoocommerceRoutingModule,
    SharedNgPrimeModule,
    FeatureModule,
    HttpClientModule
  ]
})
export class WoocommerceModule { }
