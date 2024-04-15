import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { CardOrderListComponent } from '@components/card-order-list/card-order-list.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-orders-completed',
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
  [dataOrders]="ordersCompleted"> 
  </app-card-order-list>
  `,
  styleUrls: ['./orders-completed.component.scss']
})
export default class OrdersCompletedComponent {

  statusData: 'loading' | 'success' | 'error' = 'loading';

  ordersCompleted: any[]  = [];
  orderOption: MenuItem[] = [

    {
      label: 'Opciones'
    }
  ];

  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  claroService = inject(ClaroService)

  constructor() { }


  getCompletedOrder() {
    this.statusData = 'loading';
    this.claroService.getOrderByStatus('entregados', this.paginationParams.page, this.paginationParams.rows).subscribe({
      next: (response) => {
        this.statusData = 'success';
        this.ordersCompleted = response.orders
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