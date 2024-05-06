import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductInventory } from '@components/interfaces/product.interface';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { StatusData } from '@components/interfaces/status-data.interface';
import { CardDropdownProductComponent } from '../card-dropdown-product/card-dropdown-product.component';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    MenuModule,
    ButtonModule,
    InputSwitchModule,
    SkeletonModule,
    CardDropdownProductComponent
    
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  product = input.required<ProductInventory>();

 dropdownInfo = input<ProductInventory>();
 statusDropdownInfo = input<StatusData>();

  menuProduct = input.required<MenuItem[]>();
  isSelected = input<boolean>();

  onChangeValue = output<any>();
  // emitIdProduct = output<any>();

  // @Input() isSelected = false;

  // isSelected: boolean = false;

  toggleProductSelection(): void {
    this.onChangeValue.emit(this.product); // Emitir el evento con el nuevo estado
  }

  //   emitId() {
  //   if (!this.dropdownInfo || this.dropdownInfo()?.id !== this.product().id) {
  //     this.emitIdProduct.emit(this.product().id);
  //   }
  // }


}
