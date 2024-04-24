import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { CardOrderComponent } from '@components/order-list/card-order/card-order.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { Orders } from 'src/app/core/interface/order.interface';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    PaginatorModule,
    SkeletonModule,
    MenuModule,
    CardOrderComponent
  ],

  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {

statusData = input.required<StatusData>();
dataOrders = input.required<Orders[]>();
totalRecors = input.required<number>();
paginationParams = input.required<PaginationParams>();
menuToolbar = input<MenuItem[]>();
orderOption = input.required<MenuItem[]>();
  
searchValue = output<string>();
searchedData = output<string>();
changeValueLabel = output<'todo' | 'id' | 'title' | 'sku'>();
changePagination = output<PaginationParams>();
perPageOptions: number[] = [10, 20, 30, 50];

    //Selecciona y Deselecciona cada checkbox del arreglo
    isSelectedEveryOrder: boolean[] = [];
    //selecciona y deselecciona todos los checkbox del arreglo
    isSelectAllOrder = false;
    //data seleccionada
    selectedOrder: Orders[] = [];

    // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1; 


    inputValue = '';
    changePlaceHolder: string = 'Buscar por #, Sku o titulo';
    changeLabelBtn = 'Todo';
    showMenuSearch: boolean = false;
    hidenSearch = false;
    showIcon = false;



    toggleSelectAllOrders() {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      if (this.isSelectAllOrder) {
        // Si se selecciona la opción masiva, seleccionar todos los productos
        this.selectedOrder = this.dataOrders()?.slice();
        this.isSelectedEveryOrder = this.dataOrders()?.map(() => true) || [];
      } else {
        // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
        this.selectedOrder = [];
        this.isSelectedEveryOrder = [];
      }
    }
  
    toggleEveryOrder(order: Orders, i: number) {
     
      // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
      const index = this.selectedOrder.findIndex(
        (selectedItem: any) => selectedItem.id === order.id
      );
  
      if (index === -1) {
       // Si la orden no está seleccionado, lo agregamos
        this.selectedOrder.push(order);
        this.isSelectedEveryOrder[i] = true;
      } else {
        this.selectedOrder.splice(index, 1);
        this.isSelectedEveryOrder[i] = false;
      }
  
  
      // Verificar si todos los elementos de la parte inferior están seleccionados
      const allSelected = this.dataOrders().every((order) =>
        this.selectedOrder.some(
          (selectedOrder) => selectedOrder.id === order.id
        )
      );
  
      // Actualizar el estado de selección masiva
      this.isSelectAllOrder= allSelected;
  
      // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
      // if (!this.isSelectAllOrder) {
      //   this.isSelectAllOrder = false;
      // }

      if(!this.isSelectedEveryOrder[i] && this.isSelectAllOrder) {
        this.isSelectAllOrder = false;
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

   
/*
{
    "totalpaginas": 1,
    "totalpendientes": 1,
    "totalregistros": "1",
    "listapendientes": [
        {
            "nopedido": "83539216",
            "estatus": "Pendiente",
            "fechacolocacion": "2024-04-07",
            "fechaautorizacion": "2024-04-07",
            "sku": "GBAPKMSP",
            "articulo": "Pok&eacute;mon Sapphire Gba Juego F&iacute;sico En Caja Con Protecci&oacute;n",
            "claroid": "2828788",
            "idpedidorelacion": "12035596",
            "fulfillment": false,
            "sla": "En tiempo de embarque",
            "comision": "69.86",
            "totalproducto": "499",
            "totalpedido": "499",
            "skuhijo": "GBAPKMSP",
            "channel": "SR",
            "transactionid": null
        }
    ],
    "versionConfig": "2.0.17112023-1.0",
    "versionAPP": "2.0.17112023-1.0",
    "tagManagerID": "GTM-5Q7VB6N",
    "tagManagerIDCS": "",
    "visibleMenuCV": true
}
*/

/* 
--> ordenes pendientes
- fecha de recibido
- fecha de autorización

--> ordenes en proceso
- fecha de recibido
- fecha de despacho

--> ordenes concretadas
- fecha de autorización
- fecha de despacho
*/

