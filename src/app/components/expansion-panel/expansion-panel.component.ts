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
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

const DEFAULT_DURATION = 0.25;

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonModule],
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [
    trigger('isActivo', [
      state(
        'true',
        style({ height: AUTO_STYLE, visibility: 'visible', opacity: 1 })
      ),
      state(
        'false',
        style({ height: '0px', visibility: 'hidden', opacity: 0 })
      ),
      transition('true => false', animate(DEFAULT_DURATION + 's ease')),
      transition('false => true', animate(DEFAULT_DURATION + 's ease')),
    ]),
  ],
})
export class ExpansionPanelComponent {
  label = input.required<string>();
  propertyProduct = input.required<string | number>();
  propertytoRequire = input.required<string>();
  updateProduct = output<Object>();
  // activeAccordeon = input.required<number>();
  isValid = input.required<boolean>()

  isOpened: boolean = false;

  // togglePanel(index: number) {
  //   if(this.activeAccordeon() === index) {
  //     this.activeAccordeon() = -1;
  //     this.isActive = 'opened'
  //   } else {
  //     this.isActive = 'closed'
  //     this.activeAccordeon() = index;
  //   }
  // }

  // updateProducts() {
  //   this.updateProduct.emit();
  // }
}
