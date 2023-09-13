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
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
 import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

import { AccordionModule } from 'primeng/accordion';

const ngPrimeComponents = [
  InputTextModule,
  TooltipModule,
  ButtonModule,
  TabMenuModule,
  TableModule,
  DialogModule,
  CardModule,
  BadgeModule,
  DividerModule,
  SkeletonModule,
  InputTextareaModule,
  InputNumberModule,
   CheckboxModule,
  RadioButtonModule,
  StepsModule,
  MenuModule,
  MultiSelectModule,
  MessagesModule,
  ProgressBarModule,
  ToastModule,
    FileUploadModule,
  KeyFilterModule,
 AccordionModule
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
