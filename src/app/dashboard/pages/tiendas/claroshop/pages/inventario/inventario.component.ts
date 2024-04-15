import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from '../../../../../../core/interface/breadcrumb.interface';
import { EMPTY, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { ProductInventory } from '@components/interfaces/product.interface';
import { StatusData } from '@components/interfaces/status-data.interface';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ButtonModule,
    InventoryListComponent
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export default class InventarioComponent {

  dialogVisible: boolean = false;
  BreadcrumbHome: BreadcrumbItem = {
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
      label: 'ClaroShop',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Inventario',
    },
  ];

  //* parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  MenuProduct: MenuItem[] = [

    {
      label: 'Opciones:',
      items: [
        {
          label: 'Editar',
        },

        {
          label: 'Pausar',
          // command: () => this.changeStatusProduct('inactivo')
        },

        {
          label: 'Eliminar'
        }
      ]
    }
  ];

  //* Enlace al input search
  inputValue = '';
  typeSearch: 'todo' | 'id' | 'title' | 'sku' = 'todo';
  totalRecords = 0;
  statusProducts: StatusData = {status: 'loading'};
  suscriptions$: Subscription[] = [];

  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly claroService = inject(ClaroService);
  products: ProductInventory[] = [];
  // products: ProductInventory[] = [

  //   {
  //     id: 2345,
  //     title: 'Memoria 1tb con adaptador Android e IOS',
  //     sku: 'djk20',
  //     store: 'claroshop',
  //     sale_price: 233,
  //     status: 'active',
  //     isDropdownInformation: true
  //   },

  //   {
  //     id: 2915,
  //     title: 'Ecualizador LED',
  //     sku: 'eku-var',
  //     store: 'claroshop',
  //     sale_price: 1034,
  //     status: 'active',
  //     isDropdownInformation: true
  //   },


  //   {
  //     id: 3541,
  //     title: 'Paper mario en caja nuevo',
  //     sku: 'pm-n64',
  //     store: 'claroshop',
  //     sale_price: 1034,
  //     status: 'active',
  //     isDropdownInformation: true
  //   },

    
  //   {
  //     id: 3240,
  //     title: 'Zelda ocarina of time',
  //     sku: 'zelda-n64',
  //     store: 'claroshop',
  //     sale_price: 1034,
  //     status: 'active',
  //     isDropdownInformation: true
  //   }

  // ];
  productsDetail: ProductInventory[] = [];
  statusProductsDetail: StatusData[] = [];

  private readonly confirmService = inject(ConfirmationService);

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params: Params): void => {
      this.paginationParams.page = +params['page'] ? +params['page'] : 1;

       this.getProducts(this.paginationParams.page, this.paginationParams.rows);
    })

  }

  getProducts(page: number, per_page: number) {
    this.statusProducts.status = 'loading';

    this.suscriptions$.push(
      this.claroService.getProducts(page, per_page).subscribe({
        next: (resp) => {
          this.products = resp;
          this.totalRecords = resp.length;
          this.paginationParams.page
          this.statusProducts.status = 'success';
        },
        error: (msgErorr) => {
          console.log(msgErorr);
          this.statusProducts.status = 'error';
          this.totalRecords = 0;
          return EMPTY;

        },
      })
    );
  }

  getProduct(product: DetailProductInterface) {
   
    this.statusProductsDetail[product.index] = { status: 'loading' };
    const existingProduct = !this.productsDetail[product.index] || this.productsDetail[product.index].id !== product.idProduct ? true : false;
    if(existingProduct) {

      this.claroService.getProduct(product.idProduct).subscribe({
        next: (resp) => {
          this.productsDetail[product.index] = resp
          this.statusProductsDetail[product.index] = { status: 'success' };
  
        },
  
        error: (err) => {
          this.statusProductsDetail[product.index] = { status: 'error' };
  
          //  this.statusProductDetail= 'error';
  
        }
      })
    
    }
  




  }

  changeTypeSearch(value: 'todo' | 'id' | 'title' | 'sku') {
    this.typeSearch = value;
  }

  paginationChanged(event: any) {

    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        page: this.paginationParams.page,
        productosporpagina: this.paginationParams.rows,
      },
      queryParamsHandling: 'merge',

    });
  }

  getProductsBySearch(value: string) {
    this.statusProducts.status = 'loading';

    this.suscriptions$.push(
      this.claroService
        .getProductsBySearch(value, this.typeSearch, this.paginationParams.page).subscribe(
          {
            next: (data) => {
              this.statusProducts.status = data.length > 0 ? 'success' : 'empty';
              this.totalRecords = data.length;
              this.products = data;
            },
            error: (err: string) => {
              this.statusProducts.status = 'error';
              this.products = [];
              this.totalRecords = 0;
              // this.errorMessage = err;

              return EMPTY;
            },
          })
    );
  }

  getSearchValue(value: string) {
    this.inputValue = value;
  }


  // searchFilter($event: any, value: string) {
  //   this.productos?.filterGlobal(($event.target as HTMLInputElement).value, value)
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscriptions$.forEach((suscription) => suscription.unsubscribe());
  }
}



interface DetailProductInterface {
  index: number;
  idProduct: number;
}