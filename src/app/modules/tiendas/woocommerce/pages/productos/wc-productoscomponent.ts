import { Component, Input, OnInit } from '@angular/core';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';

@Component({
  selector: 'app-wc-productos',
  templateUrl: './wc-productos.component.html',
  styleUrls: ['./wc-productos.component.scss']
})
export class WcProductosComponent implements OnInit {

  loading: boolean = true;
  products: ProductosTable[] =[];
  link: string = '/dashboard/woocommerce/new-product';
  
  constructor(private wcService: WcommerceService){
    this.wcService.Productos().subscribe( (data: any) => {
      console.log(data);
     this.products= data;
     this.loading  = false;
     // console.log(this.products)
   }, (error) => {
     console.log(error)
   });
  }


  ngOnInit(): void {
      
  }


}
