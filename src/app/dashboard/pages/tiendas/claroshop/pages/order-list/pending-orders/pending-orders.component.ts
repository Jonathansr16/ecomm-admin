import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { CardOrderListComponent } from '@components/card-order-list/card-order-list.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [
    CommonModule,
    CardOrderListComponent
  ],
  template: `
  <app-card-order-list 
  [statusData]="statusData"
  [paginationParams]="paginationParams"
  [OrderOption]="orderOption"
  [dataOrders]="pendingOrders"> 
 </app-card-order-list>
  `,
  styleUrls: ['./pending-orders.component.scss']
})
export default class PendingOrdersComponent implements OnInit {

  searchTerm: string = '';
  pendingOrders: Orders[] = [];
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  // isError: boolean;
  statusData: 'loading' | 'success' | 'error' = 'loading';
  orderOption: MenuItem[] = [

    {
      label: 'Opciones'
    }
  ]

  orderService = inject(ClaroService);

  constructor() { }


  getPendingOrders() {
    this.orderService.getOrderByStatus('pendientes',this.paginationParams.page, this.paginationParams.rows).subscribe({
      next: (resp) => {
        this.pendingOrders = resp.orders;
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
    this.getPendingOrders();
    
  }



}


