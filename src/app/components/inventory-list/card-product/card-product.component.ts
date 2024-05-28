import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { CardDropdownProductComponent } from '../card-dropdown-product/card-dropdown-product.component';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';

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
    CardDropdownProductComponent,
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  product = input.required<ProductInventory>();
  productVar = input<VariantProduct[]>();
  statusProductVar = input<StatusData>();
  menuProduct = input.required<MenuItem[]>();
  isSelected = input<boolean>();
  onChangeValue = output<any>();
  emitID = output<any>();
  isAccordionOpen: { [id: number]: boolean } = {};
  prevent: { [id: number]: boolean } = {};

  toggleProductSelection(): void {
    this.onChangeValue.emit(this.product); // Emitir el evento con el nuevo estado
  }

  handlerVariations(productId: number) {
    this.isAccordionOpen[productId] =!this.isAccordionOpen[productId];

    if(this.prevent[productId]) {
      return;
    } else {
      this.emitID.emit(productId);
      this.prevent[productId] = true;
   }
  }
 
}
