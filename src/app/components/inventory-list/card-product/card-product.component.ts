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
    SkeletonModule
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent { 

  product = input.required<ProductInventory>();
  menuProduct = input.required<MenuItem[]>();
  onChangeValue = output<any>();
  isSelected = input<boolean>();
  // @Input() isSelected = false;

  
// isSelected: boolean = false;
  

toggleProductSelection(): void {
  this.onChangeValue.emit(this.product); // Emitir el evento con el nuevo estado
}
 


}


