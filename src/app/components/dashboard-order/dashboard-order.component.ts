import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';
import { TooltipModule } from 'primeng/tooltip';

const DEFAULT_DURATION = 0.35;

@Component({
  selector: 'app-dashboard-order',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './dashboard-order.component.html',
  styleUrl: './dashboard-order.component.scss',
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
      transition('false => true', animate(DEFAULT_DURATION + 's ease')),
      transition('true => false', animate(DEFAULT_DURATION + 's ease')),
    ]),
  ],
})
export class DashboardOrderComponent {

  typeOrderData = input.required<StateTypeOrder[]>();
  isActive = false;
  isOpen: boolean[] = []; 

 }
