import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';

//* MODULES
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { SharedFeatureModule } from '@shared/shared-feature.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MainComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
   SharedNgPrimeModule,
   SharedFeatureModule,
    CardModule,
    SidebarModule,
    HttpClientModule
  ]
})
export class MainModule { }
