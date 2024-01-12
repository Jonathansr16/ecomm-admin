import { Component, OnInit } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ProductResult } from '@wcommerce/interface/woo-producto.interface';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import {
  ColHeader,

} from '@feature/table-products/table-products.component';
import { BreadcrumbItem, BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService],
})
export class InventarioComponent implements OnInit {

  products: ProductResult[] = [];
  menuWC: MenuItem[] = [
    { items: [
      { label: 'Modificar'},
      { label: 'Pausar'},
      { label: 'Eliminar'},
      { label: 'Ver Publicaciópn'}
    ] }
  ];


  breadcrumbItems: BreadcrumbItem = {

    titleMain: 'Tiendas',
    breadCrumbLink: [
      {
        iconClass: 'pi pi-save',
        titleLink: 'Woocommerce',
        separatorClass: 'pi pi-save'
      }
    ]
  };

  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';

  columns: ColHeader[] = [
    { header: 'Producto' },
    //  { header: 'Sku'},
    { header: 'Precio' },
    //  { header: 'Stock' },
    { header: 'Status' },
  ];



  constructor(
    private wcService: WcommerceService,
    private router: Router,
    private messageService: MessageService,
    private breadcrumb: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.breadcrumb.addBreadcrumbs(

        {
          titleMain: 'Tiendas',
          breadCrumbLink: [
            {
              titleLink: 'Woocommerce',
              iconClass: 'pi pi-home',
              separatorClass: 'pi pi-remove'
            },

            {
              titleLink: 'Inventario',
              iconClass: 'pi pi-book',

            }
          ]
        }

    )

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
