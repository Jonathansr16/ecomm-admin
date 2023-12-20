import { Component } from '@angular/core';
import { OrderListResponse, OrderResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import { ClaroService } from '@claroshop/services/claroservice.service';

@Component({
  selector: 'app-claro-orders-completed',
  templateUrl: './claro-orders-completed.component.html',
  styleUrls: ['./claro-orders-completed.component.scss']
})
export class ClaroOrdersCompletedComponent {

  searchTerm: string = '';
  ordersCompleted: OrderListResponse[]  = [];
  // isLoading: boolean;
  // isError: boolean;
  statusData: 'loading' | 'success' | 'error';
  totalItem: number =30;

  titleError: string = '';
  detailsError: string = '';
  constructor(private orderCompletedService: ClaroService) {

 this.statusData = 'loading';


  }


  getCompletedOrder() {
    this.orderCompletedService.getOrderByStatus('entregados').subscribe({
      next: (response: OrderResponse) => {
        this.statusData = 'success';
        this.ordersCompleted = response.listaentregados
        console.log(response);
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
  this.getCompletedOrder()
  }
}


/*




*/