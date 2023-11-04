import { Component, Input, OnInit } from '@angular/core';
import { WcProductoResponse } from '@wcommerce/interface/wc-producto.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

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
      console.log(error);
    });
 
    this.urlProduct = "/dashboard/woocommerce/product/"
 
 
 
  }

  viewProduct(id: number) {
    this.router.navigate( ['/dashboard/woocommerce/product', id] )
  }


}
