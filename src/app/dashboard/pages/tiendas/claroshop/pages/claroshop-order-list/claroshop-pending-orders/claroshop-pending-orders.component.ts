import { Component } from '@angular/core';
import { OrderListResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import { ClaroService } from '@claroshop/services/claroservice.service';

@Component({
  selector: 'app-claroshop-pending-orders',
  standalone: true,
  imports: [],
  template: ``,
  styleUrls: ['./claroshop-pending-orders.component.scss']
})
export default class ClaroshopPendingOrdersComponent {

  searchTerm: string = '';
  pendingOrders: OrderListResponse[] = [];
  ordersExample: any | undefined;
  // isError: boolean;
  statusData: 'loading' | 'success' | 'error';


  constructor(private orderService: ClaroService) {

    this.statusData = 'loading';

  }


  getPendingOrders() {
    this.orderService.getOrderByStatus('pendientes').subscribe({
      next: (resp) => {
        this.pendingOrders = resp.orden;
        this.statusData = 'success';
        console.log(resp);
      }, 
      error: (errorMessage) => {
        this.statusData = 'error';
        console.log(errorMessage);
      }
    })
  }

  getCompletedOrders() {
    this.orderService.getOrderByStatus('entregados').subscribe({
      next: (resp) => {
        this.pendingOrders = resp.orden;
        this.statusData = 'success';
        console.log(resp);
      }, 
      error: (errorMessage) => {
        this.statusData = 'error';
        console.log(errorMessage);
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPendingOrders()

  }
}


