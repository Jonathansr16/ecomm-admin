import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-orders-quantity-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `

    <div class="quantity-card">
        <div class="quantity-card__title">
            <span class="quantity-card__status">{{status}}</span>
            <span *ngIf="!isLoading" class="quantity-card__value">{{ count}} ventas</span>
            <p-skeleton *ngIf="isLoading" width="8rem" styleClass="mt-2"></p-skeleton>
        </div>
    </div>
  `,
  styleUrls: ['./orders-quantity-card.component.scss']
})
export class OrdersQuantityCardComponent {

  @Input() status: string = '';
  @Input() count: number | undefined;
  @Input() isLoading: boolean = true;

}
