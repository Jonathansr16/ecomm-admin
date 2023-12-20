import { Component } from '@angular/core';
import { OrderResult} from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-woo-orders-failed',
  templateUrl: './woo-orders-failed.component.html',
  styleUrls: ['./woo-orders-failed.component.scss']
})
export class WooOrdersFailedComponent {

  canceledOrdes: OrderResult[];
  searchTerm:    string | undefined;
  titleError:    string | undefined;
  detailsError:  string | undefined;
  statusData:  'loading' | 'success' | 'error';

  constructor(private wcService: WcommerceService) {

    this.canceledOrdes = [];
    this.statusData = 'loading';
  
  }

  getOrders() {
    this.wcService.getOrderByStatus('cancelled').subscribe({
      next: resp=> {

        this.canceledOrdes = resp;
        console.log(resp);
        this.statusData = 'success';

      },
      error: (errorMessage) => {
        this.statusData = 'error';
        console.log(errorMessage)
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrders();
  }
}
