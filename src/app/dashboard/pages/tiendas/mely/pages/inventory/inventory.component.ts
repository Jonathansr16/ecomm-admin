import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { ProductInventory } from '@components/interfaces/product.interface';
import { StatusInfoData } from '@components/interfaces/status-data-info.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { MelyService } from '@mely/mely.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';

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
  melyProducts: ProductInventory[] = [];
  itemsWithIds: string[] = [];


  //parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
  };

  totalProducts: number =0;
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.queryParamMap.subscribe( (params: ParamMap) => {

      const limit = params.get('limit');
      const offset = params.get('offset');
      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.page = offset !== null ? +offset : 0;
    
      this.getProducts();

    })
  }

  getProducts(): void {
  
    this.statusData.status = 'loading';
    this.melyService.getProductsBySeller(this.paginationParams.page, this.paginationParams.rows).subscribe({
        next: (resp) => {
          this.statusData.status = resp.totalProducts> 0 ? 'success' : 'empty';
          this.totalProducts = resp.totalProducts;
          this.itemsWithIds = resp.idProducts;
          console.log(resp.totalProducts)

       this.getProductsIds()
        },
        error: (err) => {
          this.statusData.status = 'error';
          this.melyProducts = [];
          this.totalProducts = 0;
          this.StatusExtraInfo = {
            titleError: 'Error',
            summaryError: err
      
          };
        },
      });
  }


  getProductsIds() {
  this.melyService.getProductsByids(this.itemsWithIds).subscribe( {
    next: (resp) => {
      console.log(resp)
      this.melyProducts = resp
    }, error: (err) => {
      console.log(err)
    }
  })
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
