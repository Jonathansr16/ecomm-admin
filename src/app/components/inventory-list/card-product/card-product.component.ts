import { CommonModule } from '@angular/common';
import { Component, Input, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { CardDropdownProductComponent } from '../card-dropdown-product/card-dropdown-product.component';
import { StateVariation } from 'src/app/core/interface/state-variations.interface';

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
  getVariationData = input<StateVariation>();

  pauseProduct= output<ProductInventory>();
  editProduct = output<ProductInventory>();
  deleteProduct = output<ProductInventory>();



  menuProduct = signal<MenuItem[]>([
    {
      label: 'Opciones',
      items: [
        {
          label: 'Pausar',
          command: () => this.pauseProduct.emit(this.product().id)
        
        },

        {
          label: 'Editar',
          command: () => this.editProduct.emit(this.product().id)
        },

        {
          label: 'Eliminar',
          command: () => this.deleteProduct.emit(this.product().id)
        }
      ]
    }
  ])
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
