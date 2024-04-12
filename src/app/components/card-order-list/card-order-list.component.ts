import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { Orders } from 'src/app/core/interface/order.interface';

@Component({
  selector: 'app-card-order-list',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    PaginatorModule,
    MenuModule
  ],

  templateUrl: './card-order-list.component.html',
  styleUrl: './card-order-list.component.scss',
})
export class CardOrderListComponent {

statusData = input.required<StatusData>();
dataOrders = input.required<Orders[]>();
paginationParams = input.required<PaginationParams>();
menuToolbar = input<MenuItem[]>();
OrderOption = input.required<MenuItem[]>();
  
searchValue = output<string>();
searchedData = output<string>();
changeValueLabel = output<'todo' | 'id' | 'title' | 'sku'>();
changePagination = output<PaginationParams>();
  // @Input( { required: true}) statusData!: 'loading' | 'success' | 'error' | 'empty'; 
  // @Input( { required: true}) dataOrders!: Orders[]; 
  // @Input( { required: true}) paginationParams!: PaginationParams; 
  // @Input( ) menuToolbar!: MenuItem[];
  // @Input( { required: true}) OrderOption!: MenuItem[];

  // @Output() searchValue = new EventEmitter<string>();
  // @Output() searchedData = new EventEmitter<any>()
  // @Output() changeValueLabel = new EventEmitter<'todo' | 'id' | 'title' | 'sku'>();
  // @Output() changePagination = new EventEmitter<PaginationParams>();
 
  perPageOptions: number[] = [10, 20, 30, 50];


    //Selecciona y Deselecciona cada checkbox del arreglo
    isSelectedEveryProduct: boolean[] = [];
    //selecciona y deselecciona todos los checkbox del arreglo
    isSelectAllProduct = false;
    //data seleccionada
    selectedProduct: any[] = [];

    // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1; 


    inputValue = '';
    changePlaceHolder: string = 'Buscar por #, Sku o titulo';
    changeLabelBtn = 'Todo';
    showMenuSearch: boolean = false;
    hidenSearch = false;
    showIcon = false;



    toggleSelectAllProducts() {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      if (this.isSelectAllProduct) {
        // Si se selecciona la opción masiva, seleccionar todos los productos
        this.selectedProduct = this.dataOrders()?.slice();
        this.isSelectedEveryProduct = this.dataOrders()?.map(() => true) || [];
      } else {
        // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
        this.selectedProduct = [];
        this.isSelectedEveryProduct = [];
      }
    }
  
    toggleEveryProduct(product: any) {
     
      // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
      const index = this.selectedProduct.findIndex(
        (selectedItem: any) => selectedItem.id === product.id
      );
  
      if (index === -1) {
        this.selectedProduct.push(product);
      } else {
        this.selectedProduct.splice(index, 1);
      }
  
  
      // Verificar si todos los elementos de la parte inferior están seleccionados
      const allSelected = this.dataOrders().every((order) =>
        this.selectedProduct.some(
          (selectedOrder) => selectedOrder.id === order.id
        )
      );
  
      // Actualizar el estado de selección masiva
      this.isSelectAllProduct = allSelected;
  
      // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
      if (!this.isSelectAllProduct) {
        this.isSelectAllProduct = false;
      }
    }


    toggleMenuSearch() {
      this.showMenuSearch = !this.showMenuSearch;
    }
  
    showSearch(): boolean {
      return (this.hidenSearch = true);
    }
  
    hiddenSearch(): boolean {
      return (this.hidenSearch = false);
    }

    onInputChange(): void {
      this.showIcon = this.inputValue.trim().length > 0;
    }
  
    clearInput(): void {
      this.inputValue = '';
      this.showIcon = false;
    }
  
    
    searchRecord(value: any) {
      this.searchValue.emit(value);
      // this.searchedData.emit()
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

