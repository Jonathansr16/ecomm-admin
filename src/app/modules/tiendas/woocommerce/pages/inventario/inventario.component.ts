import { Component, Input, OnInit } from '@angular/core';
import { TableProductResult } from '@wcommerce/interface/woo-producto.interface';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService]
})
export class InventarioComponent implements OnInit {

  products: TableProductResult[] | undefined;
  link  = '/dashboard/woocommerce/new-product';
  urlProduct: string = "";

  columns: any[] = [];
  statusData: boolean;



  constructor(private wcService: WcommerceService, private router: Router, private messageService: MessageService){

    this.statusData = true;
   
    this.products = [];
   
  }
  getProducts() {

    this.wcService.getProducts().subscribe({

      next: (resp) => {
        this.products = resp;
        this.statusData = false;
        console.log(resp)
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      
      }
    });
  }

  deleteProduct(product: any) {


  this.wcService.deleteProduct(product.id).subscribe({
  
    next: (resp) => {
    
      console.log(`Producto ${product.id} Eliminado con exito`);
    }
  })

  
  }

  ngOnInit(): void {


    this.getProducts();

 
  }

  viewProduct(id: number) {
    this.router.navigate( ['/dashboard/woocommerce/product', id] )
  }


}
