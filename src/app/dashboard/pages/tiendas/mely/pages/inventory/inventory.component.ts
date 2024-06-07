import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { StatusInfoData } from 'src/app/core/interface/status-data-info.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { MelyService } from '@mely/mely.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { PositionVariante } from 'src/app/core/interface/position-variante.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonModule,
    InventoryListComponent,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export default class InventoryComponent {
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

  statusData: StatusData = { status: 'loading' };
  StatusExtraInfo?: StatusInfoData;


  statusProductVar: StatusData = {status: 'loading'};
  productVar: VariantProduct[] = [];

  melyProducts: ProductInventory[] = [];
  itemsWithIds: string[] = [];

  //parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
    totalRecords: 0
  };

  // ordersBy:
  //  'total_sold_quantity_asc' | 'total_sold_quantity_desc'
  //  | 'available_quantity_asc' | 'available_quantity_desc' |
  //  "last_updated_desc"| "last_updated_asc" = 'total_sold_quantity_asc';

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

  private readonly melyService = inject(MelyService);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const orders = params.get('orders');
      const limit = params.get('limit');
      const offset = params.get('offset');
      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.page = offset !== null ? +offset : 0;
      this.ordersBy = orders !== null ? orders : 'total_sold_quantity_desc';
      this.getProductsByUser();
    });
  }

  getProductsByUser() {
    this.melyService
      .getProductsByUserId(
        this.ordersBy,
        this.paginationParams.rows,
        this.paginationParams.page
      )
      .subscribe({
        next: (resp) => {
          this.getProductsIds(resp.products);
          this.paginationParams.totalRecords = resp.totalproducts;
        },
        error: (err) => {
          console.log(err);
          this.paginationParams.totalRecords = 0;
        },
      });
  }

  getProductsIds(productsId: string[]) {
    this.statusData.status = 'loading';

    this.melyService.getProductsByids(productsId).subscribe({
      next: (resp) => {
        this.statusData.status = resp.length > 0 ? 'success' : 'empty';
        this.melyProducts = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getVariant(product: PositionVariante) {

this.statusProductVar.status = 'loading';
         this.melyService.getProductByVariant(product.idProduct).subscribe({
        next: (resp: any) => {
          this.statusProductVar.status = 'success'
         
          this.productVar = resp;
        },

        error: (err) => {
       
          this.productVar = [];
          console.log(err);
        },
      });
    
  

  }


  changedPage(event: any) {
    this.paginationParams.page = event.first;
    this.paginationParams.rows = event.rows;
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

