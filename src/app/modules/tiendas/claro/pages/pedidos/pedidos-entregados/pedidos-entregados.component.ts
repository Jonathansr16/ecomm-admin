import { Component } from '@angular/core';
import { ClaroService } from '@claro/services/claroservice.service';

@Component({
  selector: 'app-pedidos-entregados',
  templateUrl: './pedidos-entregados.component.html',
  styleUrls: ['./pedidos-entregados.component.scss']
})
export class PedidosEntregadosComponent {

  searchTerm: string = '';
  ordersCompleted: any[] | undefined;
  // isLoading: boolean;
  // isError: boolean;
  stateData: 'loading' | 'success' | 'error';
  totalItem: number =30;

  titleError: string = '';
  detailsError: string = '';
  constructor(private orderCompletedService: ClaroService) {

    // this.isLoading = true;
    // this.isError = false;
    this.stateData = 'loading';
    this.orderCompletedService.getOrderCompleted(10).subscribe
    ({
      next: (resp : any) => {
        // this.isLoading = false;
        this.ordersCompleted= resp;
        console.log(resp);
        this.stateData = 'success';
      },
      
      error: (errorMessage) => {
        // this.isLoading = false;
        // this.isError = true;
        console.log(errorMessage);
        this.titleError = errorMessage.name;
        this.detailsError = errorMessage.message;
       
        this.stateData = 'error';
      }

    })

  }
}


/*




*/