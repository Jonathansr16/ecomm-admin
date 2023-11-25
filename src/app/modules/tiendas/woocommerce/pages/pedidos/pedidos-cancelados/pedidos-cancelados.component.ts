import { Component } from '@angular/core';
import { OrderResult} from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-pedidos-cancelados',
  templateUrl: './pedidos-cancelados.component.html',
  styleUrls: ['./pedidos-cancelados.component.scss']
})
export class PedidosCanceladosComponent {

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
