import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

//? INTERFACES
import { WooProductResult } from '@woocommerce/interface/woo-producto.interface';

//? COMPONENTS
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
//? MODULE COMPONENTS OF PRIMENG

import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

//? SERVICES
import { WooService } from '@woocommerce/services/woo.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { generateProductForm } from 'src/app/core/form/generateProductForm';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';

import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  standalone: true,

  imports: [
    CommonModule,
    BreadcrumbComponent,
    InputSwitchModule,
    ButtonModule,
    SplitButtonModule,
    InventoryListComponent
  ],
  styleUrls: ['./inventario.component.scss'],
  providers: [
    MessageService, ConfirmationService,

  ],

})
export default class InventarioComponent implements OnInit, OnDestroy {

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
      label: 'Inventario',
    },
  ];

  addProductItems: MenuItem[] = [
    {
      label: 'Individual',
      command: () => {
      
      }
    },
    { label: 'Masiva' }
  ];


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
          label: 'Eliminar'
        }
      ]
    }
  ];


  //Enlace al input search
  inputValue!: string;
  //parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 1,
  };

  totalProducts: number= 0;

  typeSearch: 'todo' | 'id' | 'title' | 'sku' = 'todo';
  statusData: StatusData = {status: 'loading'};

  //ARREGLO PARA CACHEAR LA DATA
  private readonly cachedDataRows: { [key: string]: WooProductResult[] } = {};

  product: WooProductResult | undefined;
  suscriptions$: Subscription[] = [];
  errorMessage!: string;

  handlerOptionBtn: StatusBtn = {
    pause: false,
    modify: false,
    eliminate: false,
    massiveModification: false
  }

  // @ts-ignore
  formRegisterGroup: FormGroup;

  createFormProduct(): void {
    this.formRegisterGroup = this.formBuilder.group({
      detailsProduct: generateProductForm()
    })
  }


  private readonly wooService = inject(WooService);
  products: ProductInventory[] = [];
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.createFormProduct()
  }

  ngOnInit(): void {

    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const page = params.get('page');
      const per_page = params.get('per_page');

      // Verificar si page es null o undefined antes de convertirlo a un número
      this.paginationParams.page = page !== null ? +page : 0;

      // Verificar si per_page es null o undefined antes de convertirlo a un número
      this.paginationParams.rows = per_page !== null ? +per_page : 10;

  
      this.getProducts();


    });

  }

  ngOnDestroy(): void {
    this.suscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  validField(field: string) {
    return this.formRegisterGroup.get(`detailsProduct.${field}`)?.invalid && this.formRegisterGroup.get(`detailsProduct.${field}`)?.touched;
  }

  getValueField(field: string) {
    return this.formRegisterGroup.get(`detailsProduct.${field}`)?.value;
  }

  getProducts() {
    // Realiza una llamada a la API si no hay datos en caché
    this.statusData.status = 'loading';
    return this.suscriptions$.push(
      this.wooService.getProducts(this.paginationParams.page, this.paginationParams.rows).subscribe({
        next: (resp) => {
          this.products = resp.products;
          // this.cachedDataRows[per_page] = resp;
          this.statusData.status = resp.totalProducts > 0 ? 'success' : 'empty' ;
          this.totalProducts = resp.totalProducts;
        },
        error: (error: string) => {
          this.errorMessage = error;
          this.statusData.status = 'error';
          this.products = [];
          // this.cachedDataRows[page] = []; // Limpia la caché en caso de error
          return EMPTY;
        },
      })
    );
  }



  getSearchValue(value: string) {
    this.inputValue = value;
  }


  getProductsBySearch(value: string) {
    this.statusData.status = 'loading';

    this.suscriptions$.push(
      this.wooService
        .getProductsBySearch(
          value,
          this.paginationParams.page = 1,
          this.paginationParams.rows = 10,
          this.typeSearch,
        )
        .subscribe({
          next: (data) => {
            this.products = data.products;
            this.statusData.status = data.totalProducts > 0 ? 'success' : 'empty';
          
            console.log(data)
          },
          error: (err: string) => {
            this.statusData.status = 'error';
            this.products = [];
            this.errorMessage = err;

            return EMPTY;
          },
        })
    );
 
  }

  paginationChanged(event: any) {

    this.paginationParams.page = event.page +1;
    this.paginationParams.rows = event.rows;
    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        page: this.paginationParams.page,
        rows: this.paginationParams.rows,
      },
      queryParamsHandling: 'merge',

    });
  }


  publishProduct() {
    if (this.formRegisterGroup.invalid) {
      return Object.values(this.formRegisterGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  editProduct(idProduct: number | string) {
    this.router.navigate( ['edit-product/', {idProduct}])
  }

  deleteProduct(product: any) {
    this.wooService.deleteProduct(product.id).subscribe({
      next: (resp) => {
        console.log(`Producto ${product.id} Eliminado con exito`);
      },
    });
  }


  changeStatusProduct() {
    this.confirmService.confirm({
      message: '¿Estas seguro de pausar este producto?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
    });
  }


  changeTypeSearch(value: any) {
    this.typeSearch = value;
  }
}

export interface PageEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

