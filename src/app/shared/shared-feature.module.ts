import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//* COMPONENTS
import { HeaderComponent } from './header/header.component';
import { PanelLeftComponent } from './panel-left/panel-left.component';
import { FooterComponent } from './footer/footer.component';


//*MODULES
import { SharedNgPrimeModule } from './shared-ng-prime.module';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
    declarations: [
      HeaderComponent,
      PanelLeftComponent,
      FooterComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
     SharedNgPrimeModule,
      MenubarModule,
      MenuModule,
      PanelMenuModule
    ],
    exports: [
      HeaderComponent,
      PanelLeftComponent,
      FooterComponent
    ]
  })
  export class SharedFeatureModule { }
  