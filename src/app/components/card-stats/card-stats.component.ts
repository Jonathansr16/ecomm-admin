import { Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-stats',
  standalone: true,
  imports: [SkeletonModule],
  template: `

<div class="quantity-card">
  <div class="quantity-card__title">
    <span class="quantity-card__status">{{label}}</span>
    @if (!isLoading) {
      <span class="quantity-card__value">{{ count}} ventas</span>
    }
    @if (isLoading) {
      <p-skeleton width="8rem" styleClass="mt-2"></p-skeleton>
    }
  </div>
</div>
`,
  styleUrls: ['./card-stats.component.scss']
})
export class CardStatsComponent {

  @Input( {required: true}) label!: string;
  @Input( {required: true}) count!: number;
  @Input( { required: true}) isLoading!: boolean;

}
