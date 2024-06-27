import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-amazon-inventory',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './amazon-inventory.component.html',
  styleUrl: './amazon-inventory.component.scss',
})
export class AmazonInventoryComponent { }
