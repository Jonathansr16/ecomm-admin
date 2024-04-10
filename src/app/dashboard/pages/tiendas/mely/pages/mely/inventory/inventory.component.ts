import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>inventory works!</p>`,
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent { }
