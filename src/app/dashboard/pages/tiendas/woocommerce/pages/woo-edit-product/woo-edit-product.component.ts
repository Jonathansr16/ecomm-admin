import {
  Component,
  Input,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { MessageService } from 'primeng/api';
import { WooProducto } from '@woocommerce/models/wc-new-product.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { InputNumberModule } from 'primeng/inputnumber';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ExpansionPanelComponent } from '@components/expansion-panel/expansion-panel.component';
import { WooProductService } from '@woocommerce/services/woo-product-service.service';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { UploadImageComponent } from '@components/upload-image/upload-image.component';
import { RouterLink } from '@angular/router';
import { StateWooCategory } from '@woocommerce/interface/woo-state-category';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  IdCategoryByProduct,
  WooCategoryResult,
} from '@woocommerce/interface/woo-category-product.interface';
import { DropdownModule } from 'primeng/dropdown';
import { combineLatestWith, tap } from 'rxjs';
import { StateWooProduct } from '@woocommerce/interface/woo-state-products.interface';
import { StateWooProductVariations } from '@woocommerce/interface/woo-state-product-variation.interface';
import { StateWooProductAttibutes } from '@woocommerce/interface/woo-state-product-attributes.interface';

@Component({
  selector: 'app-woo-edit-product',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    SkeletonModule,
    InputNumberModule,
    FileUploadModule,
    BadgeModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    UploadImageComponent,
  ],
  templateUrl: './woo-edit-product.component.html',
  styleUrls: ['./woo-edit-product.component.scss'],
  providers: [MessageService],
})
export default class WooEditProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  // showPanelAddCategory = false;
  breadcrumHome = signal<BreadcrumbItem>({
    icon: 'list_alt',
    label: 'Inventario',
    separator: true,
  })

  breadcrumbItems = signal<BreadcrumbItem[]>([
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
      label: 'Edit-product',
    },
  ])

  showPanelAddCategory = signal<boolean>(false);

  #stateWooProduct = signal<StateWooProduct>({
    status: 'loading',
    data: new WooProducto(),
  });

  #stateWooCategory = signal<StateWooCategory>({
    status: 'loading',
    data: [],
  });

  #stateWooVariations = signal<StateWooProductVariations>({
    status: 'loading',
    data: []
  });

  #stateWooAttr = signal<StateWooProductAttibutes>({
    status: 'loading',
    data: []
  });

  selectedCategory = signal<WooCategoryResult[]>([]);
  itHasVarians = signal<boolean>(false);

  wooProduct =    computed( () => this.#stateWooProduct() );
  wooCategory =   computed( () => this.#stateWooCategory() );
  wooAttr =       computed( () => this.#stateWooAttr() );
  wooVariations = computed( () => this.#stateWooVariations() );

  isOpen = signal<boolean[]>( [] );
  num = 0;

  createFormUpdateProduct(): void {
    this.formProduct = this.formBuilder.group(
      {
        name: [
          '',
          [Validators.required, this.validatorService.notWhitesSpaceValid],
        ],
        description: [
          '',
          [Validators.required, this.validatorService.notWhitesSpaceValid],
        ],
        short_description: [
          '',
          [Validators.required, this.validatorService.notWhitesSpaceValid],
        ],
        regular_price: [
          this.num.toString(),
          [Validators.required, this.validatorService.notWhitesSpaceValid],
        ],
        sale_price: [this.num.toString()],
        sku: ['', Validators.required],

        stock_quantity: [this.num.toString()],
        categories: [],
      },
      {
        validators: [
          this.validatorService.priceInvalid('regular_price', 'sale_price'),
        ],
      }
    );
  }

  private readonly wooProductService = inject(WooProductService);
  private readonly validatorService = inject(ValidatorsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  @Input('id') productId!: number;


  constructor() {
    this.createFormUpdateProduct();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    const products$ = this.wooProductService
      .getProduct(this.productId)
      .pipe(tap((products) => this.setProductData(products)));

    const category$ = this.wooProductService
      .getCategories()
      .pipe(tap((categories) => this.setCategoryData(categories)));

    products$
      .pipe(combineLatestWith(category$))
      .subscribe(([productResp, categoryResp]) => {
        this.updateFormCategories(productResp.categories, categoryResp);
      });
  }



  getVariations() {

      this.wooProductService.getProductVariation(this.productId).subscribe({
        next: (resp) => {
          this.#stateWooVariations.set({
            status: resp && resp.length > 0 ? 'success' : 'empty',
            data: resp
          });

          console.log(resp)
        },
        error: (err) => {
          this.#stateWooVariations.set({
            status: 'error',
            data: []
          });
        }
      })
    
    }


  getAttributes() {
    this.wooProductService.getAttributes().subscribe( {
      next: (resp) => {
        this.#stateWooAttr.set({
          status: resp && resp.length > 0 ? 'success' : 'empty',
          data: resp
        });

        console.log(resp)
      },
      error: (err) => {
        this.#stateWooAttr.set({
          status: 'error',
          data: []
        });
      }
    })
  }

  private setProductData(resp: WooProducto) {
    this.#stateWooProduct.set({
      status: 'success',
      data: { ...resp },
    });
    this.formProduct.patchValue({ ...resp });

    // console.log(this.wooProduct().data);
  }

  private setCategoryData(resp: WooCategoryResult[]) {
    this.#stateWooCategory.set({
      data: resp,
      status: resp.length > 0 ? 'success' : 'empty',
    });
  }

  private updateFormCategories(
    productCategories: IdCategoryByProduct[],
    allCategories: WooCategoryResult[]
  ) {
    const selectedCategories = allCategories.filter((item) =>
      productCategories.some((cat) => cat.id === item.id)
    );

    this.selectedCategory.set(selectedCategories);
  }


  private get categories(): FormArray {
    return this.formProduct.get('categories') as FormArray;
  }

  setCategories(selectedCategories: WooCategoryResult[]) {
    this.selectedCategory.set(selectedCategories);


    const idsCategories = selectedCategories.map(category => ({ id: category.id }));

    while (this.categories.length !== 0) {
      this.categories.removeAt(0)
    }


    this.formProduct.get('categories')!.patchValue(idsCategories); // Actualiza el formControl 'categories'

  }
  //* EVALUA SI UN CAMPO ESPECIFICOS FUE EDITADO PARA GUARDAR
  verifyField(formField: string, value: string): boolean {
    const currentValue = this.formProduct.get(formField);
    const lastValue = value;

    if (!currentValue || !currentValue.value || !lastValue) {
      return false; // or handle this case accordingly
    }

    return currentValue.value.trim() === lastValue.trim() ||
      (currentValue.invalid && currentValue.touched) ||
      currentValue.value.trim().length === 0
      ? true
      : false;
  }
  //* DEVUELVE EL VALOR ANTERIOR ANTES DE SER MODIFICADO
  cancelUpdate(formField: string, value: string) {
    const currentValue = formField;
    const lastValue = value;

    this.formProduct.get(currentValue)?.patchValue(lastValue);
  }

  //* COMPRUEBA SI UN CAMPO ES VALIDO
  invalidField(field: string): boolean {
    return this.formProduct?.get(field)?.invalid && this.formProduct.touched
      ? true
      : false;
  }

  //* ACTUALIZA UN CAMPO ESPECIFICIO
  updateField(field: string): void {
    const fieldControl = this.formProduct.get(field);

    if (fieldControl?.valid) {
      const newValue = fieldControl.value;
      const data: any = { [field]: newValue };

      this.wooProductService
        .updateFieldProduct(this.productId, data)
        .subscribe({
          next: (resp) => {
            // this.wcProduct[field] = resp[field];
            this.#stateWooProduct().data[field] = resp[field];

            this.messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'Actualización',
              detail: '¡Actualización echa con exito!',
            });
          },
        });
    }
  }

  toggleAccordeon(event: boolean, index: number) {
    this.isOpen.update(value => {
      value[index] = event;
      return value;
    })
  }

  toggleShowAddCategory() {
    this.showPanelAddCategory.update(value => !value)
  }
}


