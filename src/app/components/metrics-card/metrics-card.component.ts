import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Metrics } from 'src/app/core/interface/metrics.interface';
import { ButtonModule } from 'primeng/button';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { BadgeComponent } from '@components/badge/badge.component';

const DEFAULT_DURATION = 0.25;


@Component({
  selector: 'app-metrics-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    BadgeComponent
  ],
  templateUrl: './metrics-card.component.html',
  styleUrl: './metrics-card.component.scss',
  animations: [
    trigger('isMetricOpen', [
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
export class MetricsCardComponent { 

  metricas = input.required<Metrics>()
  isOpen: boolean = false;
}


