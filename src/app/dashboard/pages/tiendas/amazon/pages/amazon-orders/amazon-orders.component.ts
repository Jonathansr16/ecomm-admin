import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-amazon-orders',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './amazon-orders.component.html',
  styleUrl: './amazon-orders.component.scss',
})
export class AmazonOrdersComponent { }
