import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    
HttpClientModule,
    HomeRoutingModule,
    SharedNgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
  InputTextModule,
  CardModule,
RadioButtonModule,

  ],
 
})
export class HomeModule { }
