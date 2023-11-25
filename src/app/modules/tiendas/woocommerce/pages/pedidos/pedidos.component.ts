import { ClaroshopPendingOrders } from '@claro/interfaces/claroshop-pedidos-pendientes.interface';
import { Component, OnInit } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  providers: [ MessageService]
})
export class PedidosComponent implements OnInit {

  protected orders: OrderResult[] | undefined;
  filteredOrders: any[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
  options: MenuItem[] = [];
  titleError: string = "";
  detailsError: string = "";
  //* Status para la data obtenida de la api


  //* Cantidad de pedidos 
  pendingOrdersCount: number = 0;
  processingOrdersCount: number = 0;
  completedOrdersCount: number = 0;
  cancelledOrdersCount: number = 0;

  //* Status de la cada orden
  statusOrderPending: boolean = true;
  statusOrderProcess: boolean = true;
  statusOrderCompleted: boolean = true;
  statusOrderFailed: boolean = true;


  constructor(private orderService: WcommerceService) {

    }
   
    getNumberPendingOrders() {
   
      this.orderService.getOrdersCount('pending').subscribe( 
        {
          next: (resp) => {
            this.pendingOrdersCount = resp.totalCount;
            this.statusOrderPending = false;
          },
          error: (resp) => {
            this.statusOrderPending = false;
          }
        }, 
      )
    }

    getNumberProcessOrders() {
 
      this.orderService.getOrdersCount('processing').subscribe(
        {
          next: (resp) => {
            this.processingOrdersCount = resp.totalCount;
            this.statusOrderProcess = false;
            console.log(`Cantidad De Ordenes en proceso: ${ this.processingOrdersCount }` )
          },
          error: (errorMessage) => {
            this.statusOrderProcess = false;
          }
        }
      )
      
    }


    getNumberCompletedOrders() {
      this.orderService.getOrdersCount('completed').subscribe({
        next: (resp) => {
          this.completedOrdersCount = resp.totalCount;
          this.statusOrderCompleted = false;
          console.log(`Cantidad De Ordenes completadas: ${ this.completedOrdersCount }` )

        }, error: (errorMessage) => {
          this.statusOrderCompleted = false;
        }
      })

    }

    getNumberCancelledOrders() {
   
      this.orderService.getOrdersCount('cancelled').subscribe({
        next: (resp) => {
          this.cancelledOrdersCount = resp.totalCount;
          this.statusOrderFailed = false;
        }, 
        error: (errorMessage) => {
          this.statusOrderFailed = false;
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
