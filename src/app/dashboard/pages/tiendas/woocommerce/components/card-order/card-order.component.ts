import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CardOrderTemplateComponent } from '@components/card-order-template/card-order-template.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-card-order',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, ButtonModule, CardOrderTemplateComponent],
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss']
})
export class CardOrderComponent {

  @Input({ required: true}) dataOrders: any[] = [];

  selectedProducts: any = [];

  //Selecciona y Deselecciona el checkbox
  selectAll: boolean = false;
  //Selecciona y Deselecciona caa checkbox del arreglo
  selectOne:  boolean[] = [];

  // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1; 

  toggleSelectAllProducts() {

    if( this.selectAll) {
       // Si se selecciona la opción masiva, seleccionar todos los productos
       this.selectedProducts = this.dataOrders?.slice();
       this.selectOne = this.dataOrders?.map(() => true) || [];
 
 
    }else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProducts = [];
      this.selectOne = [];
 
    }
    
   }
 
   handleCheckboxChange(order: any, i: number) {
       // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
       const isChecked = this.selectOne[i];
 
       if( isChecked) {
         // this.selectedProducts.push(order);
         this.selectedProducts.push(order);
 
       } else {
         this.selectedProducts.splice(i, 1);
       }
 
         // Actualizar el estado de selección masiva
          this.selectAll = this.selectOne.every((isChecked: boolean) => isChecked);
 
   }


     collapseContent(index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1; // Cierra el acordeón si ya está abierto
    } else {
      this.selectedIndex = index; // Abre el acordeón haciendo clic en un elemento
    }
  }

  isCollapsing(index: number): boolean {
    return this.selectedIndex === index;
  }

   
}
