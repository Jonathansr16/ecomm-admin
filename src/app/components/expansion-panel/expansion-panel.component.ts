import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

const DEFAULT_DURATION = 0.25;

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [
    trigger('isActivo', [
      state(
        'opened',
        style({ height: AUTO_STYLE, visibility: 'visible', opacity: 1 })
      ),
      state(
        'closed',
        style({ height: '0px', visibility: 'hidden', opacity: 0 })
      ),
      transition('closed => opened', animate(DEFAULT_DURATION + 's ease')),
      transition('opened => closed', animate(DEFAULT_DURATION + 's ease')),
    ]),
  ],
})
export class ExpansionPanelComponent {
  label = input.required<string>();
  propertyProduct = input.required<string | number>();
  propertytoRequire = input.required<string>();

  @Output() updateProduct = new EventEmitter<Object>();
  @Input() activeAccordeon: number = -1;
  @Input({ required: true }) isValid: boolean = false;

  isActive: 'opened' | 'closed' = 'closed';


  togglePanel(index: number) {
    if(this.activeAccordeon === index) {
      this.activeAccordeon = -1;
      // this.isActive = this.isActive === 'opened' ? 'closed' : 'opened';
      this.isActive = 'opened'
    } else {
      this.isActive = 'closed'
      this.activeAccordeon = index;
    }
  }

  updateProducts() {
    this.updateProduct.emit();
  }
}
