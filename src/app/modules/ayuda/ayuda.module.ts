import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyudaRoutingModule } from './ayuda-routing.module';
import { HelpComponent } from './component/help/help.component';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';


@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule,
    SharedNgPrimeModule
  ]
})
export class AyudaModule { }
