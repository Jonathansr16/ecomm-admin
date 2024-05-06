import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ProductInventory } from '@components/interfaces/product.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-dropdown-product',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './card-dropdown-product.component.html',
  styleUrl: './card-dropdown-product.component.scss',
})
export class CardDropdownProductComponent {
  product = input.required<ProductInventory>();
  dropdownInfo = input.required<ProductInventory>();
  dropdownStatus = input.required<StatusData>();
  isOpen = false;

  emitId = output<any>();

  toggleAccordeon() {
    this.isOpen = !this.isOpen;
      this.emitId.emit(this.product().id);
    
  }

 }
