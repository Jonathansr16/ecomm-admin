import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { BreadcrumbItem } from '../../../../../../core/interface/breadcrumb.interface';
import { EMPTY, Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { CardProductComponent } from '@components/card-product/card-product.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {  InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { ParamsPagination } from 'src/app/core/interface/pagination.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CardSearchComponent } from '../../../../../../components/card-search/card-search.component';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    CardProductComponent,
    CardSearchComponent,
    ButtonModule,
    ToastModule,
    CheckboxModule,
    InputSwitchModule,
    PaginatorModule,
    SkeletonModule
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export default class InventarioComponent {
  isActiveProduct: boolean[] = [];
  //Selecciona y Deselecciona cada checkbox del arreglo
  isSelectedEveryProduct: boolean[] = [];
  //selecciona y deselecciona todos los checkbox del arreglo
  isSelectAllProduct = false;
  //data seleccionada
  selectedProduct: any[] = [];
  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';
  dialogVisible: boolean = false;

  searchText: string = '';

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

  //parametros iniciales para la paginación
  paginationParams: ParamsPagination = {
    page: 1,
    per_page: 10,
    first: 0,
    totalRecords: 0
  };


  handlerOptionBtn: StatusBtn = {
    pause: false,
    modify: false,
    eliminate: false,
    massiveModification: false
  }
    //Enlace al input search
   inputValue = '';
    //Estado del input
  hidenSearch = false;
  totalRecords = 0;
  suscriptions$: Subscription[] = [];
  showIcon = false;

  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly claroService = inject(ClaroService);
  products: any[] = [];

  private confirmService = inject(ConfirmationService);

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe( (params: Params): void => {
      this.paginationParams.page = +params['page'] ? +params['page'] : 1;
      this.paginationParams.per_page = +params['productosporpagina'] ? params['productosporpagina'] : 10;

      this.getProducts(this.paginationParams.page, this.paginationParams.per_page)
    })

  }

  getProducts(page: number, per_page: number) {
    this.suscriptions$.push(
      this.claroService.getProducts(page, per_page).subscribe({
        next: (data) => {
          this.products = data.productos;
          this.paginationParams.totalRecords = data.totalproductos;
          this.paginationParams.page = data.paginaactual
          this.statusData = 'success';
        },
        error: (msgErorr) => {
          console.log(msgErorr);
          this.statusData = 'error';
          this.paginationParams.totalRecords = 0;

        },
      })
    );
  }

  onPageChange(event: any) {

    this.paginationParams = {
      page: event.page + 1,
      per_page: event.rows,
      first: event.first,
    };
    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        page: this.paginationParams.page,
        productosporpagina: this.paginationParams.per_page,
      },
      queryParamsHandling: 'merge',

    });
}

onInputChange(): void {
  this.showIcon = this.inputValue.trim().length > 0;
}

showSearch(): boolean {
  return (this.hidenSearch = true);
}

hiddenSearch(): boolean {
  return (this.hidenSearch = false);
}

getProductsBySearch() {
  this.statusData = 'loading';

  this.suscriptions$.push(
    this.claroService
      .getProductsBySearch(this.inputValue).subscribe(
        {
        next: (data) => {
        
          this.products = data.productos;
       
          this.statusData = this.products ? 'success' : 'empty';
        
        },
        error: (err: string) => {
          this.statusData = 'error';
          this.products = [];
          // this.errorMessage = err;

          return EMPTY;
        },
      })
  );
}

clearInput(): void {
  this.inputValue = '';
  this.showIcon = false;
}

  toggleSelectAllProducts() {
    // Si se selecciona la opción masiva, seleccionar todos los productos
    if (this.isSelectAllProduct) {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      this.selectedProduct = this.products.slice();
      this.isSelectedEveryProduct = this.products.map(() => true) || [];
    } else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProduct = [];
      this.isSelectedEveryProduct = [];
    }
  }

  toggleEveryProduct(product: any) {
    // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
    const index = this.selectedProduct.findIndex(
      (selectedItem: any) =>
        selectedItem.transit === product.transactionid
    );

    if (index === -1) {
      this.selectedProduct.push(product);
    } else {
      this.selectedProduct.splice(index, 1);
    }

    // Verificar si todos los elementos de la parte inferior están seleccionados
    const allSelected = this.products.every((order: any) =>
      this.selectedProduct.some(
        (selectedOrder) => selectedOrder.claroid === order.claroid
      )
    );
    // Actualizar el estado de selección masiva
    this.isSelectAllProduct = allSelected;

    // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
    if (!this.isSelectAllProduct) {
      this.isSelectAllProduct = false;
    }
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
