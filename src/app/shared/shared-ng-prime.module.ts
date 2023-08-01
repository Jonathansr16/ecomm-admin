import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//* MODULES OF NGPRIME
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';

const ngPrimeComponents = [
  InputTextModule,
  TooltipModule,
  ButtonModule,
  TabMenuModule,
  TableModule,
  DialogModule,
  CardModule,
  BadgeModule,
  DividerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngPrimeComponents,
  ], 
  exports: [
    ngPrimeComponents
  ]
})
export class SharedNgPrimeModule { }
