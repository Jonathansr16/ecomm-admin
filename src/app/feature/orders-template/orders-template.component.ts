import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';

@Component({
  selector: 'app-orders-template',
  templateUrl: './orders-template.component.html',
  styleUrls: ['./orders-template.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersTemplateComponent {

  // Espera una propiedad de dataOrders del componente padre
  @Input() dataOrders:   OrderResult[] = []
  @Input() searchTerm:   string        | undefined;
  @Input() statusData:   'loading' | 'success' | 'error' | undefined;
  @Input() titleError:   string        | undefined;
  @Input() detailsError: string        | undefined;
  
// Índice del elemento abierto, inicialmente ninguno
  selectedIndex: number = -1; 
  selectedProducts: any = [];

  //Selecciona y Deselecciona el checkbox
  selectAll: boolean = false;
  //Selecciona y Deselecciona caa checkbox del arreglo
  selectOne:  boolean[] = [];


  hidenSearch: boolean = false;

  //Properties for pagination
  first: number =0;
  rows: number = 10;
  totalOrders: number = 130;
  
  toggleAccordion(index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1; // Cierra el acordeón si ya está abierto
    } else {
      this.selectedIndex = index; // Abre el acordeón haciendo clic en un elemento
    }
  }

  isItemOpen(index: number): boolean {
    return this.selectedIndex === index;
  }


  constructor () {
  }

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

  handleCheckboxChange(order: OrderResult, i: number) {
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


  //pagination 
  onPageChange(event : any) {

    this.first = event.first;
    this.rows = event.rows;
  }

  showSearch() : boolean {
    return  this.hidenSearch = true
    }
  
    hiddenSearch() : boolean {
      return this.hidenSearch = false;
    }


}


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}