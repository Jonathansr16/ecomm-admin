import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderDetailsComponent } from '@components/order-details/order-details.component';
import { MelyService } from '@mely/mely.service';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    OrderDetailsComponent
  ],
  template: `
  <app-order-details
  [statusData]="statusOrderDetails"
  [order]="details">

  </app-order-details>
  `,
  styleUrl: './details.component.scss',
})
export default class DetailsComponent { 

  statusOrderDetails:  StatusData = {status: 'loading'};
  details!: OrderDetails;
  melyService = inject(MelyService);

  getDetailsOrder() {
this.statusOrderDetails.status = 'loading';

// this.melyService.getOrders()
  }
}
