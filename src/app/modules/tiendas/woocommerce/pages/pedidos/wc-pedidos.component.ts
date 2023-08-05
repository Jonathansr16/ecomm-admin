import { Component, OnInit } from '@angular/core';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';
import { ordenProducto } from 'src/app/core/interface/order-productos.interface';

@Component({
  selector: 'app-pedidos',
  templateUrl: './wc-pedidos.component.html',
  styleUrls: ['./wc-pedidos.component.scss']
})
export class WcPedidosComponent implements OnInit {

  order: ordenProducto[] = [];
  constructor(private orderService: WcommerceService) {

    this.orderService.getOrder().subscribe( data => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })


  }

  ngOnInit(): void {
      
  }
}
