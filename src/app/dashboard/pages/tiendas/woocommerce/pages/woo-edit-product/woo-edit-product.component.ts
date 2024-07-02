import { Component, Input, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
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
import { FileItem } from 'src/app/core/models/file-item.models';
import { RouterLink } from '@angular/router';

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
    UploadImageComponent
  ],
  templateUrl: './woo-edit-product.component.html',
  styleUrls: ['./woo-edit-product.component.scss'],
  providers: [MessageService]
})
export default class WooEditProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  activeAccordeon: number = -1;

  #stateWooProduct = signal<StateWooProduct>({
    status: 'loading',
    data: new WooProducto()
  });


  wooProduct = computed( () => this.#stateWooProduct());

  images: FileItem[] = [];
 num = 0;
//  wcProduct: WooProducto = new WooProducto();

  lastValue: string = '';
  currentValue: string = '';
  loading: boolean = true;
  completedEdit: number = 0;

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
      label: 'Edit-product',
    },
  ];

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
        sale_price: [
          this.num.toString()
        ],
        sku: ['', Validators.required],

        stock_quantity: [
        this.num.toString()
        ],
        categories: this.formBuilder.array([this.wooProduct().data.categories]),
      },
      {
        validators: [
          this.validatorService.priceInvalid('regular_price', 'sale_price'),
        ]

      }

    )
  }

  wooProductService = inject(WooProductService);
  validatorService = inject(ValidatorsService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService);
  @Input('id') productId!: number;


  constructor() {
    this.createFormUpdateProduct();
  }

  ngOnInit(): void {

    this.wooProductService.getProducto(this.productId).subscribe(resp => {

      this.#stateWooProduct.set({
        status: 'success',
        data: {
          id: resp.id,
          name: resp.name,
          description: resp.description,
          short_description: resp.short_description,
          sku: resp.sku,
          price: resp.regular_price,
          stock_quantity: resp.stock_quantity,
          regular_price: resp.regular_price,
          sale_price: resp.sale_price,
          status: resp.status,
          stock_status: resp.stock_status,
          categories: resp.categories,
          images: resp.images
        }
      });
  
    
      this.formProduct.patchValue({ ...resp });
      console.log(this.wooProduct())

    });

    // this.wooProduct();
  }

  //* EVALUA SI UN CAMPO ESPECIFICOS FUE EDITADO PARA GUARDAR
  verifyField(formField: string, value: string): boolean {
    const currentValue = this.formProduct.get(formField);
    const lastValue = value;
  
    if (!currentValue || !currentValue.value || !lastValue) {
      return false; // or handle this case accordingly
    }
  
    return (currentValue.value.trim() === lastValue.trim()) || (currentValue.invalid && currentValue.touched) || (currentValue.value.trim().length === 0)
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

    return (this.formProduct?.get(field)?.invalid && this.formProduct.touched)
      ? true
      : false;
  }

  //* ACTUALIZA UN CAMPO ESPECIFICIO
  updateField(field: string): void {

    const fieldControl = this.formProduct.get(field);

    if (fieldControl?.valid) {

      const newValue = fieldControl.value;
      const data: any = { [field]: newValue };

      this.wooProductService.updateFieldProduct(this.productId, data).subscribe({
        next: (resp => {

        // this.wcProduct[field] = resp[field];
        this.#stateWooProduct().data[field] = resp[field];

          this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Actualización',
            detail: '¡Actualización echa con exito!'
          })
        })
      })
    }
  }

onTemplatedUpload() {
  this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
}



// Función para convertir una URL de imagen en un File
async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}


}

interface StateWooProduct {
  status: 'loading' | 'success' | 'empty' | 'error';
  data: WooProducto
}