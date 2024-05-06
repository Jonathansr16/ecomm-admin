import { Component, inject } from '@angular/core';
import { WooService } from '@woocommerce/services/woo.service';
import { CardOrderComponent } from '@woocommerce/components/card-order/card-order.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-failed-orders',
  standalone: true,
  imports: [CardOrderComponent],
  template: `
  <app-card-order [dataOrders]="canceledOrdes">
  `
})
export default class FailedOrdersComponent {

  canceledOrdes: any[] = [];
  statusData:  'loading' | 'success' | 'error' = 'loading';

  private readonly wooService = inject(WooService);
  private readonly suscription: Subscription[] = [];

  // getOrders() {
  // this.suscription.push(
  //   this.wooService.getOrderByStatus('cancelled', 1, 10).subscribe({
  //     next: resp=> {

  //       this.canceledOrdes = resp;
  //       console.log(resp);
  //       this.statusData = 'success';

  //     },
  //     error: (errorMessage) => {
  //       this.statusData = 'error';
  //       console.log(errorMessage)
  //     }
  //   })
  // )
  // }

  ngOnInit(): void {
    // this.getOrders();
  }

  ngOnDestroy(): void {
    this.suscription.forEach( suscription => suscription.unsubscribe())
  }
}
