import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

//? INTERFACES
import { ProductResult } from '@woocommerce/interface/woo-producto.interface';

//? COMPONENTS
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardProductComponent } from '@components/card-product/card-product.component';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { CardSearchComponent } from '@components/card-search/card-search.component';
//? MODULE COMPONENTS OF PRIMENG
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';

//? SERVICES
import { WooService } from '@woocommerce/services/woo.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { generateProductForm } from 'src/app/core/form/generateProductForm';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ParamsPagination } from 'src/app/core/interface/pagination.interface';
import { MyButtonInterface } from 'src/app/dashboard/interfaces/button.interface';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  standalone: true,

  imports: [
    CommonModule,
    BreadcrumbComponent,
    CardProductComponent,
    CardSearchComponent,
    CheckboxModule,
    PaginatorModule,
    SkeletonModule,
    InputSwitchModule,
    ButtonModule,
    TieredMenuModule,
    SplitButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TooltipModule,
    InputNumberModule,
    FileUploadModule
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
        this.openDialogNewProduct()
      }
    },
    { label: 'Masiva' }
  ]

  optionsProduct: MenuItem[] = [
    // {
    //   label: 'Opciones',
    //   items: [
    //     { label: 'Modificar',
    //       command: () => {
    //         this.editProduct(this.products!.id)
    //       }
    //   },
    //     { label: 'Pausar', visible: false },
    //     { label: 'Activar', visible: false },
    //     { label: 'Eliminar' },
    //     { label: 'Ver Publicación' },
    //   ],
    // },
  ];

  itemsFilter: MenuItem[] = [
    {
      label: 'Opciones',
      disabled: true,
      style: { 'font-weight': 'bold', color: 'var(--surface-500)' },
    },

    {
      label: 'Ordenar',
      icon: 'pi pi-file',
      items: [
        {
          label: 'Ascendete',
          icon: 'pi pi-plus',
        },
        {
          label: 'Descendente',
          icon: 'pi pi-folder-open',
        },
      ],
    },

    {
      label: 'Search',
      icon: 'pi pi-search',
    },
    {
      separator: true,
    },
  ];

  menuTopbar: MyButtonInterface[] = [
    {
      label: 'Pausar',
      disabled: false,
      type: 'button',
      severity: 'secondary'
    },



  ]
  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';

  //Enlace al input search
  inputValue = '';
  //Estado del input
  hidenSearch = false;
  showIcon = false;
  isActiveProduct: boolean[] = [];
 
  //Selecciona y Deselecciona cada checkbox del arreglo
  isSelectedEveryProduct: boolean[] = [];
  //selecciona y deselecciona todos los checkbox del arreglo
  isSelectAllProduct = false;

  isPause: boolean[] = [];
  isEliminate!: boolean;
  isModify!: boolean;

  //data seleccionada
  selectedProduct: ProductResult[] = [];

  //parametros iniciales para la paginación
  paginationParams: ParamsPagination = {
    page: 1,
    per_page: 10,
    first: 0,
  };

  toggleProductDialog = false;

  //ARREGLO PARA CACHEAR LA DATA
  private readonly cachedDataRows: { [key: string]: ProductResult[] } = {};;

  totalRecords = 0;
  totalRecords$?: Subscription;
  product: ProductResult | undefined;
  productId!: number;
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
  products: ProductResult[] = [];

  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmService = inject(ConfirmationService);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.createFormProduct()
  }

  ngOnInit(): void {

    this.activedRoute.queryParams.subscribe((params: Params): void => {
      this.paginationParams.page = +params['page'] ? +params['page'] : 1;
      this.paginationParams.per_page = +params['per_page'] ? params['per_page'] : 10;

      this.getProducts(this.paginationParams.page, this.paginationParams.per_page);
      
    });

    this.optionsProduct = [
      {
        label: 'Opciones',
        items: [
          { label: 'Modificar',
            command: (event) => {
              this.editProduct;
              console.log(event)
            }
        },
          { label: 'Pausar', visible: false },
          { label: 'Activar', visible: false },
          { label: 'Eliminar' },
          { label: 'Ver Publicación' },
        ],
      },
    ];



  }

  ngOnDestroy(): void {
    this.suscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  openDialogNewProduct(): void {
    this.toggleProductDialog = true;
  }

  closeDialogNewProduct(): void {
    this.toggleProductDialog = false;
  }

  showSearch(): boolean {
    return (this.hidenSearch = true);
  }

  hiddenSearch(): boolean {
    return (this.hidenSearch = false);
  }

  validField(field: string) {
    return this.formRegisterGroup.get(`detailsProduct.${field}`)?.invalid && this.formRegisterGroup.get(`detailsProduct.${field}`)?.touched;
  }

  getValueField(field: string) {
    return this.formRegisterGroup.get(`detailsProduct.${field}`)?.value;
  }

  getProducts(page: number, per_page: number) {
    // Realiza una llamada a la API si no hay datos en caché
    this.statusData = 'loading';
    return this.suscriptions$.push(
      this.wooService.getProducts(page, per_page).subscribe({
        next: (resp: ProductResult[]) => {
          this.products = resp;
          this.cachedDataRows[per_page] = resp;
          this.statusData = resp.length > 0 ? 'success' : 'empty';
          this.totalRecords = resp.length;
        },
        error: (error: string) => {
          this.errorMessage = error;
          this.statusData = 'error';
          this.products = [];
          this.cachedDataRows[page] = []; // Limpia la caché en caso de error
          return EMPTY;
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
        per_page: this.paginationParams.per_page,
      },
      queryParamsHandling: 'merge',

    });
  }


  ActiveProduct() {
    const isActivo = this.products.some(
      (product) => product.stock_status === 'instock'
    );
    console.log(isActivo);
  }


  getProductsBySearch(valueText: string) {
    this.statusData = 'loading';

    this.suscriptions$.push(
      this.wooService
        .getProductsBySearch(
          valueText,
          this.paginationParams.page,
          this.paginationParams.per_page
        )
        .subscribe({
          next: (data) => {
            this.products = data;
            this.statusData = data.length > 0 ? 'success' : 'empty';
          },
          error: (err: string) => {
            this.statusData = 'error';
            this.products = [];
            this.errorMessage = err;

            return EMPTY;
          },
        })
    );
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

  // viewProduct(id: number) {
  //   this.route.navigate(['/dashboard/woocommerce/product', id]);
  // }

  onInputChange(): void {
    this.showIcon = this.inputValue.trim().length > 0;
  }

  clearInput(): void {
    this.inputValue = '';
    this.showIcon = false;
  }

  getSelectedProduct(id: number) { }

  toggleSelectAllProducts() {
    // Si se selecciona la opción masiva, seleccionar todos los productos
    if (this.isSelectAllProduct) {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      this.selectedProduct = this.products?.slice();
      this.isSelectedEveryProduct = this.products?.map(() => true) || [];
    } else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProduct = [];
      this.isSelectedEveryProduct = [];
    }
  }

  toggleEveryProduct(product: ProductResult) {
   
    // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
    const index = this.selectedProduct.findIndex(
      (selectedItem: ProductResult) => selectedItem.id === product.id
    );

    if (index === -1) {
      this.selectedProduct.push(product);
    } else {
      this.selectedProduct.splice(index, 1);
    }


    // Verificar si todos los elementos de la parte inferior están seleccionados
    const allSelected = this.products.every((order) =>
      this.selectedProduct.some(
        (selectedOrder) => selectedOrder.id === order.id
      )
    );

    this.handlerOptionBtn.pause = this.selectedProduct.every( (option) => option.stock_status === 'instock');
    this.handlerOptionBtn.modify =  this.selectedProduct.length === 1;
    this.handlerOptionBtn.massiveModification =  this.selectedProduct.length >= 2;
    this.handlerOptionBtn.eliminate =  this.selectedProduct.length >= 1;

    
    // Actualizar el estado de selección masiva
    this.isSelectAllProduct = allSelected;

    // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
    if (!this.isSelectAllProduct) {
      this.isSelectAllProduct = false;
    }
  }


  onSwitchChange(event: any, product: ProductResult) {
    // if (event.isActiveProduct === false) {
    //  this.changeStatusProduct()
    // }
  }

  changeStatusProduct() {
    this.confirmService.confirm({
      message: '¿Estas seguro de pausar este producto?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
    });
  }

}

export interface PageEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

