import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { generateProductForm } from 'src/app/core/form/generateProductForm';
import { InventoryListComponent } from '@components/inventory-list/inventory-list.component';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { PositionVariante } from 'src/app/core/interface/position-variante.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { UpdateStatusProduct } from '@woocommerce/interface/update-product-status.interface';
import { WooProductService } from '@woocommerce/services/woo-product-service.service';
import { StateProducts } from 'src/app/core/interface/state-products.interface';
import { StateVariation } from 'src/app/core/interface/state-variations.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    InputSwitchModule,
    ButtonModule,
    SplitButtonModule,
    InventoryListComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export default class InventarioComponent implements OnInit, OnDestroy {
  readonly breadcrumHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Inventario',
    separator: true,
  };

  readonly breadcrumbItems: BreadcrumbItem[] = [
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
      command: () => {},
    },
    { label: 'Masiva' },
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
          label: 'Eliminar',
        },
      ],
    },
  ];

  //Enlace al input search
  inputValue!: string;
  //parametros iniciales para la paginación

  typeSearch: 'todo' | 'id' | 'title' | 'sku' = 'todo';

  //ARREGLO PARA CACHEAR LA DATA
  private readonly cachedDataRows: { [key: string]: WooProductResult[] } = {};

  // variationStatus: StatusData = { status: 'loading' };
  // variationsProduct: VariantProduct[] = [];

  suscriptions$: Subscription[] = [];
  errorMessage!: string;

  // @ts-ignore
  formRegisterGroup: FormGroup;

  createFormProduct(): void {
    this.formRegisterGroup = this.formBuilder.group({
      detailsProduct: generateProductForm(),
    });
  }

  #stateWooProducts = signal<StateProducts>({
    status: 'loading',
    products: [],
  });

  #stateWooVariations = signal<StateVariation>({
    status: 'loading',
    variations: [],
  });

  #stateWooPagProducts = signal<PaginationParams>({
    page: 1,
    rows: 10,
    first: 1,
    totalRecords: 0,
  });

  public wooProducts = computed(() => this.#stateWooProducts());
  public wooPagProducts = computed(() => this.#stateWooPagProducts());
  public wooVariations = computed(() => this.#stateWooVariations());

  private readonly wooService = inject(WooProductService);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.createFormProduct();
  }

  ngOnInit(): void {
    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const page = params.get('page');
      const per_page = params.get('per_page');

      // Verificar si page es null o undefined antes de convertirlo a un número
      this.#stateWooPagProducts().page = page !== null ? +page : 0;

      // Verificar si per_page es null o undefined antes de convertirlo a un número
      this.#stateWooPagProducts().rows = per_page !== null ? +per_page : 10;

      this.getProducts();
    });

    this.wooProducts();
    this.wooVariations();
    this.wooPagProducts();
  }

  ngOnDestroy(): void {
    this.suscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  validField(field: string) {
    return (
      this.formRegisterGroup.get(`detailsProduct.${field}`)?.invalid &&
      this.formRegisterGroup.get(`detailsProduct.${field}`)?.touched
    );
  }

  getValueField(field: string) {
    return this.formRegisterGroup.get(`detailsProduct.${field}`)?.value;
  }

  getProducts() {
    return this.suscriptions$.push(
      this.wooService
        .getProducts(
          this.#stateWooPagProducts().page,
          this.#stateWooPagProducts().rows
        )
        .subscribe({
          next: (resp) => {
            this.#stateWooProducts.set({
              status: resp.totalProducts > 0 ? 'success' : 'empty',
              products: resp.products,
            });

            this.#stateWooPagProducts().totalRecords = resp.totalProducts;
          },
          error: (error: string) => {
            this.errorMessage = error;

            this.#stateWooProducts.set({
              status: 'error',
              products: [],
            });
            this.#stateWooPagProducts().totalRecords = 0;
            return EMPTY;
          },
        })
    );
  }

  getSearchValue(value: string) {
    this.inputValue = value;
  }

  getProductsBySearch(value: string) {
    this.#stateWooProducts().status = 'loading';

    this.suscriptions$.push(
      this.wooService
        .getProductsBySearch(
          value,
          (this.#stateWooPagProducts().page = 1),
          (this.#stateWooPagProducts().rows = 10),
          this.typeSearch
        )
        .subscribe({
          next: (data) => {
            this.#stateWooProducts.set({
              status: data.totalProducts > 0 ? 'success' : 'empty',
              products: data.products,
            });

            console.log(data);
          },
          error: (err: string) => {
            this.#stateWooProducts.set({
              status: 'error',
              products: [],
            });
            this.errorMessage = err;

            return EMPTY;
          },
        })
    );
  }

  getVarianProduct(product: PositionVariante) {
    this.wooService.getProductVariation(product.idProduct).subscribe({
      next: (resp) => {
        this.#stateWooVariations.set({
          status: resp.length > 0 ? 'success' : 'empty',
          variations: resp,
        });
      },
      error: (err) => {
        this.#stateWooVariations.set({
          status: 'error',
          variations: [],
        });
        console.log(err);
      },
    });
  }

  paginationChanged(event: any) {
    this.#stateWooPagProducts().page = event.page + 1;
    this.#stateWooPagProducts().rows = event.rows;
    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        page: this.#stateWooPagProducts().page,
        rows: this.#stateWooPagProducts().rows,
      },
      queryParamsHandling: 'merge',
    });
  }

  publishProduct() {
    if (this.formRegisterGroup.invalid) {
      return Object.values(this.formRegisterGroup.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    }
  }

  editProduct(idProduct: number | string) {
    this.router.navigate(['edit-product/', { idProduct }]);
  }

  deleteProduct(product: any) {
    this.wooService.deleteProduct(product.id).subscribe({
      next: (resp) => {
        console.log(`Producto ${product.id} Eliminado con exito`);
      },
    });
  }

  //* ACCIONES POR LOTE
  pauseProductByBatch(products: ProductInventory[]) {
    let items: UpdateStatusProduct[] = [];

    products.forEach((item, i) => {
      items[i] = {
        id: item.id,
        stock_status: 'outofstock',
        status: 'draft',
      };
    });

    this.confirmService.confirm({
      target: event?.target as EventTarget,
      message: '¿Estás seguro de pausar esta publicación?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.wooService.updateProductStatus(items).subscribe({
          next: (resp) => {
            this.#stateWooProducts().status =
              resp.length > 0 ? 'success' : 'empty';
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmación',
              detail: '¡Producto pausado con exito!',
              key: 'tc',
            });
            this.getProducts();
          },

          error: (err) => {
            console.error(err);
            this.#stateWooProducts.set({
              status: 'error',
              products: [],
            });
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: '¡Se produjo error al actualizar!',
              key: 'tc',
            });
          },
        });
      },
    });
  }

  activateProductByBatch(products: ProductInventory[]) {
    let items: UpdateStatusProduct[] = [];

    products.forEach((item, i) => {
      items[i] = {
        id: item.id,
        stock_status: 'instock',
        status: 'publish',
      };
    });

    this.confirmService.confirm({
      target: event?.target as EventTarget,
      message: `Reactivar (${products.length}) productos, al reactivar tus productos, vuelven a estar visibles en tu tienda`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.wooService.updateProductStatus(items).subscribe({
          next: (resp) => {
            this.#stateWooProducts().status =
              resp.length > 0 ? 'success' : 'empty';
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmación',
              detail: '¡Producto reactivado con exito!',
              key: 'tc',
            });
            this.getProducts();
          },

          error: (err) => {
            console.error(err);
            this.#stateWooProducts.set({
              status: 'error',
              products: [],
            });
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: '¡Se produjo error al actualizar!',
              key: 'tc',
            });
          },
        });
      },
    });
  }

  deleteByBatch(products: ProductInventory[]) {
    let items: number[] = [];

    products.forEach((item, i) => {
      items[i] = item.id;
    });

    this.confirmService.confirm({
      target: event?.target as EventTarget,
      message: '¿Estás seguro de eliminar estas publicaciónes?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.wooService.deleteProductsByBranch(items).subscribe({
          next: (resp) => {
            this.#stateWooProducts().status =
              resp.length > 0 ? 'success' : 'empty';
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmación',
              detail: '¡Productos eliminado con exito!',
              key: 'tc',
            });
            this.getProducts();
          },

          error: (err) => {
            console.error(err);
            this.#stateWooProducts.set({
              status: 'error',
              products: [],
            });
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: '¡Se produjo error al eliminar productos!',
              key: 'tc',
            });
          },
        });
      },
    });
  }

  gotoMassiveEditor(products: ProductInventory[]) {
    // this.wooService.setMassiveProducts(products);
    this.wooService.saveData(products);
    this.router.navigate(['/dashboard/woocommerce/editor-masivo']);
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

interface StatusPublish {
  status: 'loading' | 'success' | 'empty' | 'error';
}
