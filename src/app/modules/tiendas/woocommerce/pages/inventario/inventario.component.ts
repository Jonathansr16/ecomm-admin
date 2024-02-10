import { Component, OnDestroy, OnInit } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ProductResult } from '@wcommerce/interface/woo-producto.interface';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { PaginatorState } from 'primeng/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',

  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService],
})
export class InventarioComponent implements OnInit, OnDestroy {
  breadcrumHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Inventario',
    separator: true,
  };

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'storefront',
      label: 'Tiendas',
      separator: true,
    },

    {
      icon: 'store',
      label: 'Woocommerce',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Inventario'
    }
  ];


  menuWC: MenuItem[] = [
    {
      items: [
        { label: 'Modificar' },
        { label: 'Pausar' },
        { label: 'Eliminar' },
        { label: 'Ver Publicaciópn' },
      ],
    },
  ];

  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';

  //Enlace al input search
  inputValue: string = '';
  //Estado del input
  hidenSearch: boolean = false;
  showIcon: boolean = false;
  checked: boolean = false;
  //Selecciona y Deselecciona caa checkbox del arreglo
  selectOne: boolean[] = [];

  //parametros iniciales para la paginación
  rows = 10;
  first = 0;
  page = 1;

  totalRecords = 0;
  totalRecords$?: Subscription;

  productos$?: Subscription;
  products: ProductResult[] = [];

  productsFound$?: Subscription;
  productsFound: ProductResult[] = [];

  constructor(
    private woocommerService: WcommerceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productos$?.unsubscribe;
    this.productsFound$?.unsubscribe;
  }

  showSearch(): boolean {
    return (this.hidenSearch = true);
  }

  hiddenSearch(): boolean {
    return (this.hidenSearch = false);
  }

  getProducts() {
    this.statusData = 'loading';
    this.productos$ = this.woocommerService.getProducts(this.rows, this.page, this.first).subscribe({
      next: (resp: ProductResult[]) => {
        this.products = resp;
        this.statusData = resp.length > 0 ? 'success' : 'empty';
        this.totalRecords = resp.length;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.statusData = 'error';
      },
    });
  }

  getProductsBySearch() {
    this.productsFound$ = this.woocommerService.getProductsBySearch(this.inputValue, this.page, this.rows).subscribe(
      {
        next: (data => {
          this.productsFound = data;
          console.log(data)
        }),
        error: (err => this.productsFound = [])
      },

    )
  }

  deleteProduct(product: any) {
    this.woocommerService.deleteProduct(product.id).subscribe({
      next: (resp) => {
        console.log(`Producto ${product.id} Eliminado con exito`);
      },
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/dashboard/woocommerce/product', id]);
  }

  onInputChange(): void {
    this.showIcon = this.inputValue.trim().length > 0;
  }

  clearInput(): void {
    this.inputValue = '';
    this.showIcon = false;
  }

  onRowsChange(event: DropdownChangeEvent) {
    this.rows = event.value;
       this.getProducts();
      console.log(this.rows)
  }

  onPageChange(event: PaginatorState) {
    
    if (event.page) {
      this.page = event.page + 1;
     
    }
    this.first = event.first ? event.first : 0;
    this.rows = event.rows ? event.rows : 5;

      this.getProducts();
    
  }

  pageChaged() { }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}

export interface PageEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}
