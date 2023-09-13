import { Component, Input } from '@angular/core';
import { WcProductoResponse } from '@tiendas/woocommerce/interface/wc-producto.interface';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-wc-product',
  templateUrl: './wc-product.component.html',
  styleUrls: ['./wc-product.component.scss']
})
export class WcProductComponent {

  product?: WcProductoResponse;

  constructor(private wcService: WcommerceService, private activateRoute: ActivatedRoute) {


    this.activateRoute.params.subscribe( params => {
    this.wcService.getProduct(params['id']).subscribe( data => {

      console.log(data)
    },
    (error) => {
      console.log(error)
    }
    );
    })


  }
}
