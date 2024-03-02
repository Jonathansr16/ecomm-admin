import { Component, inject } from '@angular/core';
import { CardOrderComponent } from '@woocommerce/components/card-order/card-order.component';
import { OrderResult } from '@woocommerce/interface/woo-order.interface';
import { WcommerceService } from '@woocommerce/services/wcommerce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [ CardOrderComponent],
  template: `
  <app-card-order [dataOrders]="completedOrders">
  `  
})
export default class CompletedOrdersComponent {

  completedOrders: OrderResult[] = [];
  statusData: 'loading' | 'success' | 'error' = 'loading';

  selectedProducts: any = [];

  //Selecciona y Deselecciona el checkbox
  selectAll: boolean = false;
  //Selecciona y Deselecciona caa checkbox del arreglo
  selectOne:  boolean[] = [];

  private readonly wooService = inject(WcommerceService);
  private readonly suscriptions$: Subscription[] = [];

  
  getOrder() {
  this.suscriptions$.push( 
    this.wooService.getOrderByStatus('completed', 1, 10).subscribe({
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
    )
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
    this.getOrder();
  }

  ngOnDestroy(): void {
    this.suscriptions$.forEach( suscription => suscription.unsubscribe())
  }
  
}
