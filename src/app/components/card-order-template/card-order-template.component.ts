import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-order-template',
  standalone: true,
  templateUrl: './card-order-template.component.html',
  styleUrls: ['./card-order-template.component.scss'],
 
})
export class CardOrderTemplateComponent {

  // Espera una propiedad de dataOrders del componente padre
  @Input() searchTerm:   string        | undefined;
  @Input() statusData:   'loading' | 'success' | 'error' | undefined;
  @Input() titleError:   string        | undefined;
  @Input() detailsError: string        | undefined;
  
// Índice del elemento abierto, inicialmente ninguno
  selectedIndex: number = -1; 
  selectedProducts: any = [];

  //Selecciona y Deselecciona el checkbox
  selectAll: boolean = false;
  //Selecciona y Deselecciona cada checkbox del arreglo
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