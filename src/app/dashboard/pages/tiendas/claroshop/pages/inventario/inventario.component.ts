import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from '../../../../../../core/interface/breadcrumb.interface';
import { EMPTY, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ParamsPagination } from 'src/app/core/interface/pagination.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import { InventoryComponent } from '@components/inventory/inventory.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ButtonModule,
    InventoryComponent
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
  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';
  suscriptions$: Subscription[] = [];
  
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly claroService = inject(ClaroService);
  products: any[] = [];

  private confirmService = inject(ConfirmationService);

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe( (params: Params): void => {
      this.paginationParams.page = +params['page'] ? +params['page'] : 1;
      this.paginationParams.rows = +params['productosporpagina'] ? params['productosporpagina'] : 10;

      this.getProducts(this.paginationParams.page, this.paginationParams.rows)
    })

  }

  getProducts(page: number, per_page: number) {
    this.statusData = 'loading';

    this.suscriptions$.push(
      this.claroService.getProducts(page, per_page).subscribe({
        next: (resp) => {
          this.products = resp;
          this.totalRecords = resp.length;
          this.paginationParams.page
          this.statusData = 'success';
        },
        error: (msgErorr) => {
          console.log(msgErorr);
          this.statusData = 'error';
          this.totalRecords = 0;
          return EMPTY;

        },
      })
    );
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
  this.statusData = 'loading';

  this.suscriptions$.push(
    this.claroService
      .getProductsBySearch(value, this.typeSearch, this.paginationParams.page).subscribe(
        {
        next: (data) => {
          this.statusData = data.length > 0 ? 'success' : 'empty';
         this.totalRecords = data.length;
          this.products = data;
        },
        error: (err: string) => {
          this.statusData = 'error';
          this.products = [];
          this.totalRecords= 0;
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
