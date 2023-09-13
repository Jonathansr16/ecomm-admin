import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appNgDropImages]'
})
export class NgDropImagesDirective {

@Output() mouseInElement: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
   

    this.mouseInElement.emit(true);


  }


}
