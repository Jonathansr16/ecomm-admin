import { Component, OnInit } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ProductResult } from '@wcommerce/interface/woo-producto.interface';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import {
  ColHeader,

} from '@feature/table-products/table-products.component';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService],
})
export class InventarioComponent implements OnInit {

breadcrumHome: BreadcrumbItem = {
  icon: 'store',
  label: 'Tiendas',
  separator: true
}

breadcrumbItems: BreadcrumbItem[] = [

  {
    icon: 'storefront',
    label: 'Woocommerce',
    separator: true
  },

  {
    icon: 'list_alt',
    label: 'Inventario',
    separator: false
  }
]

  products: ProductResult[] = [];
  menuWC: MenuItem[] = [
    { items: [
      { label: 'Modificar'},
      { label: 'Pausar'},
      { label: 'Eliminar'},
      { label: 'Ver Publicaciópn'}
    ] }
  ];

  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';


 //Selecciona y Deselecciona caa checkbox del arreglo
 selectOne:  boolean[] = [];


 hidenSearch: boolean = false;



  constructor(
    private wcService: WcommerceService,
    private router: Router,
    private messageService: MessageService,
    private breadcrumb: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }


  showSearch() : boolean {
    return  this.hidenSearch = true
    }
  
    hiddenSearch() : boolean {
      return this.hidenSearch = false;
    }

  getProducts() {
    this.statusData = 'loading';
    this.wcService.getProducts().subscribe({
      next: (resp: ProductResult[]) => {
        this.products = resp;
        this.statusData = resp.length > 0 ? 'success' : 'empty';
        console.log(resp);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.statusData = 'error';
      },
    });
  }

  deleteProduct(product: any) {
    this.wcService.deleteProduct(product.id).subscribe({
      next: (resp) => {
        console.log(`Producto ${product.id} Eliminado con exito`);
      },
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/dashboard/woocommerce/product', id]);
  }
}
