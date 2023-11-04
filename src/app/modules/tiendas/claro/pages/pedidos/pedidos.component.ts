import { Component } from '@angular/core';
import { ClaroshopListapendiente } from '@claro/interfaces/claroshop-pedidos-pendientes.interface';
import { ClaroService } from '@claro/services/claroservice.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  searchTerm: string = '';
  isLoading: boolean = true;
  orders: ClaroshopListapendiente[ ] = [];

  orderType: string = ""

  constructor(private orderService: ClaroService) {

// this.orderService.getOrderByTipe('pendientes').subscribe( data => {

//   this.orders = data;
//   console.log(data);
//    this.isLoading = false;

// }, (error => {
//   console.log(error);
//    this.isLoading = true;
// }));
  }
}
