import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { PositionVariante } from 'src/app/core/interface/position-variante.interface';
import { StateProducts } from '../../../../../../core/interface/state-products.interface';
import { StateVariation } from 'src/app/core/interface/state-variations.interface';
import { MelyProductsService } from '@mely/services/mely-products.service';
import { ErrorInfoData } from 'src/app/core/interface/status-data-info.interface';

@Component({
  selector: 'app-mely-inventory',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonModule,
    InventoryListComponent,
  ],
  templateUrl: './mely-inventory.component.html',
  styleUrl: './mely-inventory.component.scss',
})
export default class MelyInventoryComponent {
  breadcrumbHome: BreadcrumbItem = {
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
      label: 'Mercado Libre',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Inventario',
    },
  ];

  #stateMelyProducts = signal<StateProducts>({
    status: 'loading',
    data: [],
  });

  #stateMelyProductVar = signal<StateVariation>({
    status: 'loading',
    data: [],
  });

  #stateMelyPagProducts = signal<PaginationParams>({
    page: 0,
    rows: 10,
    first: 0,
    totalRecords: 0,
  });

  #isSearching = signal<boolean>(false);
  searchedValue = '';
  inputValue!: string;
  errorData: ErrorInfoData = {titleError: '', summaryError: ''};

  public melyProducts = computed( () => this.#stateMelyProducts());
  public melyVariations = computed( () => this.#stateMelyProductVar());
  public melyPagination = computed( () => this.#stateMelyPagProducts());

  itemsWithIds: string[] = [];

  ordersBy = 'total_sold_quantity_desc';

  menuProduct: MenuItem[] = [
    {
      label: 'Opciones:',
      items: [
        {
          label: 'Editar',
        },

        {
          label: 'Pausar',
        },

        {
          label: 'Eliminar',
        },
      ],
    },
  ];

  private readonly melyProductsService = inject(MelyProductsService);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const orders = params.get('orders');
      const limit = params.get('limit');
      const offset = params.get('offset');
      this.#stateMelyPagProducts().rows = limit !== null ? +limit : 10;
      this.#stateMelyPagProducts().first = offset !== null ? +offset : 0;
      this.ordersBy = orders !== null ? orders : 'total_sold_quantity_desc';

      if(this.#isSearching()) {
        this.getProductsBySearch(this.searchedValue)
      } else {
        this.getProductsByUser();
      }
    });
    
    this.melyProducts();
    this.melyVariations();
    this.melyPagination();
  }

  getProductsByUser() {
    this.melyProductsService
      .getProductsByUserId(
        this.ordersBy,
        this.melyPagination().rows,
        this.melyPagination().first
      )
      .subscribe({
        next: (resp) => {
          this.getProductsIds(resp.ids);
          this.#stateMelyPagProducts().totalRecords = resp.totalIds;
        },
        error: (err) => {
        this.errorData = {
          titleError: 'Error',
          summaryError: err
        };

        this.#stateMelyProducts.set({
          status: 'error',
          data: []
        });
          this.#stateMelyPagProducts().totalRecords = 0;
        },
      });
  }

  getProductsIds(productsId: string[]) {
    this.melyProductsService.getProductsByids(productsId).subscribe({
      next: (resp) => {
     
        this.#stateMelyProducts.set({
          status: resp.length > 0 ? 'success' : 'empty',
          data: resp
        });

        console.log(resp)
      },
      error: (err) => {
      
        this.errorData = {
          titleError: 'Error',
          summaryError: err
        };

        this.#stateMelyProducts.set({
          status: 'error',
          data: []
        });

        this.#stateMelyPagProducts().totalRecords = 0;
      },
    });
  }

  getProductsBySearch(value: string) {

    this.#stateMelyProducts().status = 'loading';

    this.searchedValue = value;

    if(this.searchedValue.length) {
      this.#isSearching.set(true);
      
      this.melyProductsService.getProductsBySearch(this.searchedValue, this.melyPagination().rows, this.melyPagination().first).subscribe({
        next: (resp) => {
          
          this.#stateMelyPagProducts().totalRecords = resp.totalIds;
          this.getProductsIds(resp.ids);
        }, 
        error: (msgErr) => {
          this.#stateMelyProducts.set({
            status: 'error',
            data: []
          });
          this.#stateMelyPagProducts().totalRecords = 0;
        }
      });
    
    } else {
        this.#isSearching.set(false);
        this.getProductsByUser()
    }

  }

  getVariant(product: PositionVariante) {

    const melyProduct = this.melyProducts().data[product.index];

    if (melyProduct?.id === product.idProduct) {
        const variations = melyProduct.variations || [];
        this.#stateMelyProductVar.set({
            status: variations.length > 0 ? 'success' : 'empty',
            data: variations
        });
    }

    

  }

  changedPage(event: any) {
    this.#stateMelyPagProducts().page = event.first;
    this.#stateMelyPagProducts().rows = event.rows;
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        offset: event.first,
        limit: event.rows,
      },

      queryParamsHandling: 'merge',
    });
  }
}
