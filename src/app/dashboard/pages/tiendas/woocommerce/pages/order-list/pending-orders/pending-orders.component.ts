import { Component, inject } from '@angular/core';
import { CardOrderComponent } from '@woocommerce/components/card-order/card-order.component';
import { WcommerceService } from '@woocommerce/services/wcommerce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [CardOrderComponent],
  template: ` <app-card-order [dataOrders]="pendingOrders"> </app-card-order> `,
})
export default class PendingOrdersComponent {
  pendingOrders: any[] = [];
  statusData: 'success' | 'error' | 'loading' | 'empty' | undefined;

  private readonly wooService = inject(WcommerceService);
  private readonly suscription$: Subscription[] = [];

  getOrders() {
    this.suscription$.push(
      this.wooService.getOrderByStatus('processing', 1, 10).subscribe({
        next: (resp: any) => {
          if (resp.length === 0 || undefined) {
            this.statusData = 'empty';
          } else {
            this.statusData = 'success';
            this.pendingOrders = resp;
            console.log(this.pendingOrders);
          }
        },
        error: (errorMessage: any) => {
          this.statusData = 'error';
        },
      })
    );
  }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.suscription$.forEach((suscription) => suscription.unsubscribe);
  }
}
