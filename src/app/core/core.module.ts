import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDropImagesDirective } from './directives/ng-drop-images.directive';



@NgModule({
  declarations: [
    NgDropImagesDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NgDropImagesDirective
  ]
})
export class CoreModule { }
