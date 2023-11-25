import { NgModule } from '@angular/core';

//* MODULES OF NGPRIME
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
 import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';


import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';

import { CalendarModule } from 'primeng/calendar';


import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


const ngPrimeComponents = [
  ButtonModule,
  InputTextModule,
  TooltipModule,
  TabMenuModule,
  TableModule,
  CardModule,
  BadgeModule,
  DividerModule,
  SkeletonModule,
  InputTextareaModule,
  InputNumberModule,
   CheckboxModule,
  RadioButtonModule,
  MenuModule,
  MultiSelectModule,
  ProgressBarModule,
  ToastModule,
    FileUploadModule,
  KeyFilterModule,
 PanelModule,
 TagModule,
 CalendarModule,
 ToolbarModule,
 PaginatorModule,
 ConfirmDialogModule,
 DialogModule
]

@NgModule({
  declarations: [],
  imports: [
    ngPrimeComponents,
  ], 
  exports: [
    ngPrimeComponents
  ]
})
export class SharedNgPrimeModule { }
