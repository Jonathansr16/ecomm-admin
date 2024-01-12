import { Component } from '@angular/core';
import { OrderListResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import { ClaroService } from '@claroshop/services/claroservice.service';

@Component({
  selector: 'app-claro-orders',
  templateUrl: './claro-orders.component.html',
  styleUrls: ['./claro-orders.component.scss']
})
export class ClaroOrdersComponent {

  //* Status para la data obtenida de la api
  //* Cantidad de pedidos 
  pendingOrdersCount: number = 0;
  shippedOrdersCount: number | undefined = 0;
  completedOrdersCount: number = 0;
  cancelledOrdersCount: number = 0;
  //* Status de la cada orden
  statusOrderPending: boolean = true;
  statusOrdersShipped: boolean = true;
  statusOrderCompleted: boolean = true;
  statusOrderFailed: boolean = true;
  statusData: 'success' | 'loading' | 'error' = 'loading';

  orders: OrderListResponse[] = [];

  statusOfData: {
    pending: boolean;
    shipped: boolean;
    completed: boolean;
    failed: boolean;
  } = {
    pending: true,
    shipped: true,
    completed: true,
    failed: true
  }

  constructor(private orderService: ClaroService) { }

  //* Obtiene la cantidad de ordenes pendientes
  getNumberPendingOrders() {
    this.orderService.getOrdersCountByStatus('pendientes').subscribe(

      {
        next: (resp) => {
          this.statusOrderPending = false;
          this.pendingOrdersCount = resp.totalOrders;
          console.log(`Ordenes Pendientes: ${this.pendingOrdersCount}`);
          console.log(resp);
        },
        error: (errorMessage) => {
          this.statusOrderPending = false;
        }
      },
    )
  }

  //* Obtiene la cantidad de ordenes embarcados
  getNumberShippedOrders() {
    this.orderService.getOrdersCountByShipped().subscribe(
      {
        next: (resp) => {
          this.statusOrdersShipped = false;
          this.shippedOrdersCount = resp.totalOrders;
          console.log(`Ordenes Embarcadas: ${this.shippedOrdersCount}`);
          console.log(resp);
        },

        error: (errorMessage) => {
          this.statusOrdersShipped = false;
        }
      },
      
    )
  }

  //* Obtiene la cantidad de ordenes Entregados 
  getNumberCompletedOrders() {
    this.orderService.getOrdersCountByStatus('entregados').subscribe(

      {
        next: (resp) => {
          this.statusOrderCompleted = false;
          this.completedOrdersCount = resp.totalOrders;
          console.log(`Ordenes Entregadas: ${this.completedOrdersCount}`);
          console.log(resp);
        },
        error: (errorMessage) => {
          this.statusOrderCompleted = false;
          console.log(errorMessage);
        }
      },
    )
  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNumberPendingOrders();
    this.getNumberShippedOrders();
    this.getNumberCompletedOrders();
  }


  getOrderByStatus(status: 'entregados' | 'embarcados' | 'pendientes' = 'pendientes') {
    this.orderService.getOrderByStatus(status).subscribe(
    {
      next: (resp) => {
        this.statusData = 'success';
        this.orders = resp.orden;
        console.log(resp)
      },
      error: (error) => {
        this.statusData = 'error';
        this.orders = [];
      }
    }
    )
  }

 }



