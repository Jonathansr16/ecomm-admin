import { Component, EventEmitter, Output } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-woo-orders-completed',
  templateUrl: './woo-orders-completed.component.html',
  styleUrls: ['./woo-orders-completed.component.scss'],
  
})
export class WooOrdersCompletedComponent {

  titleError: string | undefined;
  messageError: string | undefined;
  completedOrders: OrderResult[];
  statusData: 'loading' | 'success' | 'error';
  searchTerm: string = "";
  @Output() numberPendingOrders: EventEmitter<number> | undefined;

  selectedProducts: any = [];

  //Selecciona y Deselecciona el checkbox
  selectAll: boolean = false;
  //Selecciona y Deselecciona caa checkbox del arreglo
  selectOne:  boolean[] = [];



  constructor(private wcService: WcommerceService) {
    this.statusData = 'loading';
    this.completedOrders = [];
  }

  
  getOrder() {
    this.wcService.getOrderByStatus('completed').subscribe({
      next: (resp => {
        this.statusData = 'success';
        this.completedOrders = resp;
        console.log(resp)
        if(resp.length === 0 || undefined) {
            console.log('sin data');
        }
      }), 

      error: (errorMessage) => {
        this.statusData = 'error';
      }
    }) 
  }

  toggleSelectAllProducts() {

    if( this.selectAll) {
       // Si se selecciona la opción masiva, seleccionar todos los productos
       this.selectedProducts = this.completedOrders?.slice();
       this.selectOne = this.completedOrders?.map(() => true) || [];
 
 
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
 
 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrder();
  }
  
}
