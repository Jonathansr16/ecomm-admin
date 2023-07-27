import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MelyRoutingModule } from './mely-routing.module';
import { MelyComponent } from './pages/mely/mely.component';


@NgModule({
  declarations: [
    MelyComponent
  ],
  imports: [
    CommonModule,
    MelyRoutingModule
  ]
})
export class MelyModule { }
