import { Component, EventEmitter, Output } from '@angular/core';
import { OrderResult } from '@wcommerce/interface/woo-order.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-pedidos-completados',
  templateUrl: './pedidos-completados.component.html',
  styleUrls: ['./pedidos-completados.component.scss']
})
export class PedidosCompletadosComponent {

  titleError: string | undefined;
  messageError: string | undefined;
  completedOrders: OrderResult[];
  statusData: 'loading' | 'success' | 'error';
  searchTerm: string = "";

  @Output() numberPendingOrders: EventEmitter<number> | undefined;

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

  sendNumberPendingOrders(){
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrder();
  }
  
}
