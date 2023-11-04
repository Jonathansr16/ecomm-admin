import { Component, OnInit } from '@angular/core';
import { PedidosResponse } from '@wcommerce/interface/wcommerce-pedidos.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  providers: [ MessageService]
})
export class PedidosComponent implements OnInit {

  protected orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';
  noResults: boolean = false;

  options: MenuItem[] = [];
  titleError: string = "";
  detailsError: string = "";
  //* Status para la data obtenida de la api
  statusData: 'loading' | 'success' | 'error';


  constructor(private orderService: WcommerceService) {

    this.statusData = 'loading';
    this.orderService.getOrder().subscribe(
    {
      next: (resp: any) => {
      this.orders = resp;
      this.statusData = 'success';
      },

      error: (errorMessage) => {
        console.log(errorMessage);
        this.statusData = 'error';
      }

    }
    )
  
    }
    

  ngOnInit(): void {
      this.options = [

        {
          label: 'Ver detalle',
          icon: 'pi pi-refresh',
        }
      ]
  }

  // search() {
  //   this.orders = this.orders.filter( res => {
  //     return res.id_order.toLocaleLowerCase().match(this)
  //   })
  // }


}
