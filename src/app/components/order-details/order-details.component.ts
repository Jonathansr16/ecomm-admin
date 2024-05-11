import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';
import { StatusData } from '../../core/interface/status-data.interface';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    SkeletonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent { 

  order = input.required<OrderDetails>();
  statusData = input.required<StatusData>();
}
