import { Component, OnInit } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-woo-orders',
  templateUrl: './woo-orders.component.html',
  styleUrls: ['./woo-orders.component.scss'],
  providers: [ MessageService]
})
export class WooOrdersComponent implements OnInit {

  filteredOrders: any[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
  options: MenuItem[] = [];
  titleError: string = "";
  detailsError: string = "";
  //* Status para la data obtenida de la api


  //* Cantidad de pedidos 
  pendingOrdersCount: number | undefined;
  processingOrdersCount: number | undefined;
  completedOrdersCount: number | undefined;
  cancelledOrdersCount: number | undefined;

  //* Status de la cada orden
  status: {
    pending: boolean;
    shipped: boolean;
    completed: boolean;
    failed: boolean;
  } = {
    pending: true,
    shipped: true,
    completed: true,
    failed: true
  };

  constructor(private orderService: WcommerceService) {

    }
   
    getNumberPendingOrders() {
   
      this.orderService.getOrdersCount('processing').subscribe( 
        {
          next: (resp) => {
            this.pendingOrdersCount = resp.totalCount;
            this.status.pending = false;
            console.log(`Cantidad De Ordenes en pendientes de pago: ${ this.pendingOrdersCount }` )

          },
          error: (resp) => {
            this.status.pending = false;
           
          }
        }, 
      )
    }

    getNumberProcessOrders() {
 
      this.orderService.getOrdersCount('processing').subscribe(
        {
          next: (resp) => {
            this.processingOrdersCount = resp.totalCount;
            this.status.shipped = false;
            console.log(`Cantidad De Ordenes en proceso: ${ this.processingOrdersCount }` )
          },
          error: (errorMessage) => {
            this.status.shipped = false;
          }
        }
      )
      
    }


    getNumberCompletedOrders() {
      this.orderService.getOrdersCount('completed').subscribe({
        next: (resp) => {
          this.completedOrdersCount = resp.totalCount;
          this.status.completed= false;
          console.log(`Cantidad De Ordenes completadas: ${ this.completedOrdersCount }` )

        }, error: (errorMessage) => {
          this.status.completed = false;
        }
      })

    }

    getNumberCancelledOrders() {
   
      this.orderService.getOrdersCount('cancelled').subscribe({
        next: (resp) => {
          this.cancelledOrdersCount = resp.totalCount;
          this.status.failed = false;
        }, 
        error: (errorMessage) => {
          this.status.failed = false;
        }
      })
    }

  ngOnInit(): void {
  //  this.getOrders();
   this.getNumberPendingOrders();
   this.getNumberProcessOrders();
   this.getNumberCompletedOrders();
   this.getNumberCancelledOrders();
  }

  // search() {
  //   this.orders = this.orders.filter( res => {
  //     return res.id_order.toLocaleLowerCase().match(this)
  //   })
  // }


}
