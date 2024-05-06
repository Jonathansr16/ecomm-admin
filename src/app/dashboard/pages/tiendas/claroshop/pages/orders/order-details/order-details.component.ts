import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export default class OrderDetailsComponent {

  @Input('id') productId!: number;

  claroService = inject(ClaroService);
 }
