import { CommonModule } from '@angular/common';
import { Component, Input, Renderer2, ViewChild, ElementRef, input, inject, EventEmitter, Output, } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  label = input.required<string>();
  propertyProduct = input.required<string | number>();
  propertytoRequire = input.required<string>();
   @Output() panelClicked = new EventEmitter<number>();
   @Output( ) updateProduct = new EventEmitter<Object>();
   @Input() activeAccordeon!: number;

 
   isOpen: boolean | undefined;
   @Input( {required: true}) isValid: boolean  = false;
  @ViewChild('titlePanel') titlePanel: ElementRef | undefined;

 renderer2 = inject(Renderer2);

  handlerPanel(index: number) {
  
     this.panelClicked.emit(index);

    const titular = this.titlePanel?.nativeElement;
    const content = this.renderer2.nextSibling(titular);

    if(this.activeAccordeon === index && titular.classList.contains('expanded') ) {
      this.activeAccordeon = -1;
      this.isOpen = false;

      this.renderer2.removeClass(titular, 'expanded');
      this.renderer2.setStyle(content, 'height', '0');
      
    } else {
      this.activeAccordeon = index;
      this.renderer2.addClass(titular, 'expanded');
      this.renderer2.setStyle(content, 'height', `${content.scrollHeight}px`);
      this.isOpen = true;
    }
  }


  updateProducts() {
    this.updateProduct.emit()
  }
  


}
