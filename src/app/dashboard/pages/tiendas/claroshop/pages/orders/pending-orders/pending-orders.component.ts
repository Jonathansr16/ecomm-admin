import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { MenuItem } from 'primeng/api';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { StatusData } from '@components/interfaces/status-data.interface';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrderListComponent
  ],
  template: `
  <!-- <app-order-list 
  [statusData]="statusData"
  [paginationParams]="paginationParams"
  [OrderOption]="orderOption"
  [dataOrders]="pendingOrders"> 
 </app-order-list> -->
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
  statusData!: StatusData;
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
        this.statusData.status = 'success';
        console.log(resp);
      }, 
      error: (errorMessage) => {
        this.statusData.status = 'error';
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


