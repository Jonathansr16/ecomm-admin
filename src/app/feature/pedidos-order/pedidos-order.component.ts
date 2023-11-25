import { Component, Input, Output } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';

@Component({
  selector: 'app-pedidos-order',
  templateUrl: './pedidos-order.component.html',
  styleUrls: ['./pedidos-order.component.scss']
})
export class PedidosOrderComponent {

  // Espera una propiedad de dataOrders del componente padre
  @Input() dataOrders:   OrderResult[] | undefined;
  @Input() searchTerm:   string        | undefined;
  @Input() statusData:   'loading' | 'success' | 'error' | undefined;
  @Input() titleError:   string        | undefined;
  @Input() detailsError: string        | undefined;
  

  selectedIndex: number = -1; // Índice del elemento abierto, inicialmente ninguno
  selectedProducts: any = [];
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

  handleCheckboxChange(order: any) {
    const index = this.selectedProducts.findIndex( (selected: any) => selected.id === order.id);

    if (index !== -1) {
      // Si el producto ya está en la lista, quítalo
      this.selectedProducts.splice(index, 1);
    } else {
      // Si el producto no está en la lista, agrégalo
      this.selectedProducts.push({order});
    }
    
    console.log('Productos seleccionados:', this.selectedProducts);
    // Puedes hacer más cosas con los productos seleccionados aquí
  }


  getproduct() {

  }

  constructor () {
  }
  

}
