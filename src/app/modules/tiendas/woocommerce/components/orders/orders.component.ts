import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  @Input() dataOrders: any[] = [];

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
