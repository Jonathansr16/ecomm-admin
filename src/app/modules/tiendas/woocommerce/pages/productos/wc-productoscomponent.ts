import { Component, Input, OnInit } from '@angular/core';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

@Component({
  selector: 'app-wc-productos',
  templateUrl: './wc-productos.component.html',
  styleUrls: ['./wc-productos.component.scss']
})
export class WcProductosComponent implements OnInit {

  loading: boolean = true;
  products: any[] =[];

  constructor(private wcService: WcommerceService){}


  ngOnInit(): void {
      this.wcService.Productos().subscribe( (data: any) => {
         console.log(data);
        this.products= data;
        this.loading  = false;
        // console.log(this.products)
      }, (error) => {
        console.log(error)
      });
  }


}
