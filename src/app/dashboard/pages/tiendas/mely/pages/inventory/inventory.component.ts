import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { ProductInventory } from '@components/interfaces/product.interface';
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
  melyProducts: ProductInventory[] = [];
  totalRecords: number = 0;

  //parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
  };

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

    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const offsetParam = params.get('offset');
      const limitParam = params.get('limit');

      // Verificar si offsetParam es null o undefined antes de convertirlo a un número
      this.paginationParams.page = offsetParam !== null ? +offsetParam : 0;

      // Verificar si limitParam es null o undefined antes de convertirlo a un número
      this.paginationParams.rows = limitParam !== null ? +limitParam : 10;

  
      this.getProducts();
    });
  }

  getProducts(): void {
    this.statusData.status = 'loading';
    this.melyService
      .getProductBySeller(
        this.paginationParams.page,
        this.paginationParams.rows
      )
      .subscribe({
        next: (resp) => {
          this.statusData.status =
            resp.products.length > 0 ? 'success' : 'empty';
          this.melyProducts = resp.products;
          this.totalRecords = resp.totalRecords;
        },
        error: (err) => {
          this.statusData.status = 'error';
          this.melyProducts = [];
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
