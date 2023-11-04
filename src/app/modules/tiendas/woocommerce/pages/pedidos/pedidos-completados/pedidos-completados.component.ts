import { Component } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-pedidos-completados',
  templateUrl: './pedidos-completados.component.html',
  styleUrls: ['./pedidos-completados.component.scss']
})
export class PedidosCompletadosComponent {

  titleError: string | undefined;
  messageError: string | undefined;
  completedOrders: any[];
  statusData: 'success' | 'error' | 'loading' | undefined;
  searchTerm: string = "";

  constructor(private wcService: WcommerceService) {
    this.statusData = 'loading';
    this.completedOrders = [];

    this.wcService.getOrderByStatus('completed').subscribe({
      next: (resp => {
        this.statusData = 'success';
        this.completedOrders = resp;

        if(resp.length === 0 || undefined) {
            console.log('sin data');
        }
      }), 

      error: (errorMessage) => {
        this.statusData = 'error';
      }
    })
  }
}
