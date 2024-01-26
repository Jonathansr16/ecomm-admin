import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-stats',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `

    <div class="quantity-card">
        <div class="quantity-card__title">
            <span class="quantity-card__status">{{label}}</span>
            <span *ngIf="!isLoading" class="quantity-card__value">{{ count}} ventas</span>
            <p-skeleton *ngIf="isLoading" width="8rem" styleClass="mt-2"></p-skeleton>
        </div>
    </div>
  `,
  styleUrls: ['./card-stats.component.scss']
})
export class CardStatsComponent {

  @Input() label: string = '';
  @Input() count: number | undefined;
  @Input() isLoading: boolean = true;

}
