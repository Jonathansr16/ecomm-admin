import { Component, Input, inject, OnInit } from '@angular/core';
import { WooService } from '@woocommerce/services/woo.service';
import {toSignal} from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    SkeletonModule,
    InputNumberModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [MessageService]
})
export default class EditProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  activeAccordeon: number = -1;

  wcProduct: WooProducto = new WooProducto();

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
          '',
          [Validators.required, this.validatorService.notWhitesSpaceValid],
        ],
        sale_price: [''],
        sku: ['', Validators.required],

        stock_quantity: [''],
        categories: this.formBuilder.array([this.wcProduct.categories]),
      },
      {
        validators: [
          this.validatorService.priceInvalid('regular_price', 'sale_price'),
        ]

      }

    )
  }

  wooService = inject(WooService);
  validatorService = inject(ValidatorsService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService)
  @Input('id') productId!: number;


  constructor() {
    this.createFormUpdateProduct();

  }

  ngOnInit(): void {

    this.wooService.getProduct(this.productId).subscribe(data => {
      this.wcProduct = {
        ...data
      };

      this.loading = false;
      console.log(data)
      this.formProduct.patchValue({ ...data });
    })
  }

  //* EVALUA SI UN CAMPO ESPECIFICOS FUE EDITADO PARA GUARDAR
  verifyField(formField: string, value: string): boolean {

    const currentValue = this.formProduct.get(formField);
    const lastValue = value;

    return (currentValue?.value.trim() === lastValue.trim()) || (currentValue?.invalid && currentValue.touched) || (currentValue?.value.trim().length === 0)
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

      this.wooService.setFielUpdate(this.productId, data).subscribe({
        next: (resp => {

        this.wcProduct[field] = resp[field];

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

  

  toggleAccordeon(index: number) {
    if (this.activeAccordeon === index) {
      this.activeAccordeon = -1; // Cerrar el acordeón si se hace clic nuevamente en el mismo panel
    } else {
      this.activeAccordeon = index; // Abrir el panel clickeado
    }
  }

}
