import { Component, Input, Renderer2, Output, EventEmitter, ViewChild, ElementRef, } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  
  @ViewChild('titlePanel') titlePanel: ElementRef | undefined;

  constructor(private renderer2: Renderer2){
    
  }


  togglePanl() {

    const titular = this.titlePanel?.nativeElement;
    const content = this.renderer2.nextSibling(titular);

    if(!titular.classList.contains('expanded')) {

      this.renderer2.addClass(titular, 'expanded');
      this.renderer2.setStyle(content, 'height', `${content.scrollHeight}px`);

    } else {
      this.renderer2.removeClass(titular, 'expanded');
      this.renderer2.setStyle(content, 'height', '0');
    }
    
  }

  



}
