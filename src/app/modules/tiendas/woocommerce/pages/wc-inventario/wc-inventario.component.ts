import { Component, Input, OnInit } from '@angular/core';
import { WcProductoResponse } from '@tiendas/woocommerce/interface/wc-producto.interface';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wc-inventario',
  templateUrl: './wc-inventario.component.html',
  styleUrls: ['./wc-inventario.component.scss']
})
export class WcInventarioComponent implements OnInit {

  loading: boolean = true;
  products: WcProductoResponse[] =[];
  link: string = '/dashboard/woocommerce/new-product';
  urlProduct: string = "";

  constructor(private wcService: WcommerceService, private router: Router){

  }


  ngOnInit(): void {
    this.wcService.getProducts().subscribe( data => {
     
      this.products = data;
      this.loading  = false;
     console.log(data)
    }, (error) => {
      console.log(error)
    });
 
    this.urlProduct = "/dashboard/woocommerce/product/"
 
 
 
  }

  viewProduct(id: number) {
    this.router.navigate( ['/dashboard/woocommerce/product', id] )
  }


}
