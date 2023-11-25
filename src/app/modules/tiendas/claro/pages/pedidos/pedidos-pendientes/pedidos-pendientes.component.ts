import { Component } from '@angular/core';
import { ClaroshopPendingOrders } from '@claro/interfaces/claroshop-pedidos-pendientes.interface';
import { ClaroService } from '@claro/services/claroservice.service';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.scss']
})
export class PedidosPendientesComponent {

  searchTerm: string = '';
  orders: ClaroshopPendingOrders[] | undefined;
  ordersExample: any | undefined;
  // isError: boolean;
  statusData: 'loading' | 'success' | 'error';


  constructor(private orderService: ClaroService) {


    this.statusData = 'loading';

    this.orderService.getOrderPending().subscribe(
      {
        next: (resp : any) => {
          
        this.orders = resp
          this.statusData = 'success';
          console.log(resp)
        },

        error: (er) => {
         console.log(er);
         this.statusData = 'error'
        }
      });

      this.ordersExample = [

        {
          nopedido: "908061",
          estatus: "Pendiente",
          fechacolocacion: "2018-09-19",
          fechaautorizacion: "2018-10-06",
          sku: "8801643388485",
          articulo: "Preventa Reloj Galaxy R800 46MM Plata/ Negro Samsung",
          sla: "Fuera de tiempo de embarque",
          comision: "1119.86",
          totalproducto: "7999",
          totalpedido: "7999"
        },

        {
          nopedido: "907911",
          estatus: "Pendiente",
          fechacolocacion: "2018-09-19",
          fechaautorizacion: "2018-09-20",
          sku: "3600531280246",
          articulo: "Fijador de Maquillaje Superstay Setting Spray Maybelline",
          sla: "Fuera de tiempo de embarque",
          comision: "22.26",
          totalproducto: "159",
          totalpedido: "206"
          }
      ];


  }
}


