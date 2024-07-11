import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from '../../../../../../core/interface/breadcrumb.interface';
import { EMPTY, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { StateProducts } from 'src/app/core/interface/state-products.interface';
import { StateVariation } from 'src/app/core/interface/state-variations.interface';
import { ClaroProductsService } from '@claroshop/services/claro-products.service';
import { ErrorInfoData } from 'src/app/core/interface/status-data-info.interface';

@Component({
  selector: 'app-claro-inventory',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ButtonModule,
    InventoryListComponent,
  ],
  templateUrl: './claro-inventory.component.html',
  styleUrls: ['./claro-inventory.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export default class ClaroInventoryComponent {
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
          label: 'Eliminar',
        },
      ],
    },
  ];

  //* Enlace al input search
  inputValue = '';
  typeSearch: 'todo' | 'id' | 'title' | 'sku' = 'todo';
  totalRecords = 0;
  statusProducts: StatusData = { status: 'loading' };
  suscriptions$: Subscription[] = [];

  statusInfoProducts?: ErrorInfoData;

  #stateClaroProducts = signal<StateProducts>({
    status: 'loading',
    data: [],
  });

  #stateClaroProductVar = signal<StateVariation>({
    status: 'loading',
    data: [],
  });

  #stateClaroPagination = signal<PaginationParams>({
    page: 1,
    rows: 10,
    first: 0,
    totalRecords: 0,
  });

  public claroProducts = computed(() => this.#stateClaroProducts());
  public claroProductVar = computed(() => this.#stateClaroProductVar());
  public claroPagination = computed(() => this.#stateClaroPagination());

  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly claroProductsService = inject(ClaroProductsService);
  private readonly confirmService = inject(ConfirmationService);

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params: Params): void => {
      this.#stateClaroPagination().page = +params['page'] ? +params['page'] : 1;

      this.getProducts(this.#stateClaroPagination().page);
    });
  }

  getProducts(page: number) {
    this.statusProducts.status = 'loading';

    this.suscriptions$.push(
      this.claroProductsService.getProducts(page).subscribe({
        next: (resp) => {
          this.#stateClaroProducts.set({
            status: resp.products ? 'success' : 'error',
            data: resp.products ? resp.products : []
          });
        
          this.#stateClaroPagination().totalRecords = resp ? resp.totalItems : 0;

          if(!resp.products) {
            this.statusInfoProducts = {
              titleError: 'Error',
              summaryError: 'Se produjo un error en la obtención de los datos'
            }
          }

        },
        error: (msgErorr) => {
      
          this.statusInfoProducts! = {
            titleError: msgErorr.error.errors[0],
            summaryError: msgErorr.error.message,
          };

          this.#stateClaroProducts.set({
            status: 'error',
            data: [],
          });

          this.#stateClaroPagination().totalRecords = 0;
          this.statusProducts.status = 'error';

          return EMPTY;
        },
      })
    );
  }

  // getProduct(product: DetailProductInterface) {
  //   this.statusProductsDetail[product.index] = { status: 'loading' };
  //   console.log(product)
  //   const existingProduct = !this.productsDetail[product.index] || this.productsDetail[product.index].id !== product.idProduct ? true : false;
  //   if(existingProduct) {

  //     this.claroService.getProduct(product.idProduct).subscribe({
  //       next: (resp) => {
  //         this.productsDetail[product.index] = resp
  //         this.statusProductsDetail[product.index] = { status: 'success' };

  //       },

  //       error: (err) => {
  //         this.statusProductsDetail[product.index] = { status: 'error' };

  //       }
  //     })
  //   }
  // }

  changeTypeSearch(value: 'todo' | 'id' | 'title' | 'sku') {
    this.typeSearch = value;
  }

  paginationChanged(event: any) {
    this.#stateClaroPagination().page = event + 1;
    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        page: this.#stateClaroPagination().page,
      },
      queryParamsHandling: 'merge',
    });
  }

  getProductsBySearch(value: string) {
    this.statusProducts.status = 'loading';

    this.suscriptions$.push(
      this.claroProductsService
        .getProductsBySearch(
          value,
          this.typeSearch,
          this.#stateClaroPagination().page
        )
        .subscribe({
          next: (data) => {
            this.#stateClaroProducts.set({
              status: data.length > 0 ? 'success' : 'empty',
              data: data,
            });

            this.#stateClaroPagination().totalRecords = data ? data.length : 0;
          },
          error: (err: string) => {
            this.#stateClaroProducts.set({
              status: 'error',
              data: [],
            });

            this.#stateClaroPagination().totalRecords = 0;
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
