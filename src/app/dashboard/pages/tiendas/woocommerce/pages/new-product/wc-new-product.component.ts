import { Component, ElementRef, QueryList, Renderer2, ViewChildren, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { WooProducto } from '@woocommerce/models/wc-new-product.model';

import {  MessageService } from 'primeng/api';

import { ValidatorsService } from 'src/app/core/services/validators.service';
import { WooProductCategory } from '@woocommerce/interface/woo-producto.interface';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { WooProductService } from '@woocommerce/services/woo-product-service.service';

@Component({
  selector: 'app-wc-new-product',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, ToastModule, InputTextareaModule, TooltipModule ],
  templateUrl: './wc-new-product.component.html',
  styleUrls: ['./wc-new-product.component.scss'],
  providers: [MessageService],
})
export default class WcNewProductComponent  {

  @ViewChildren('titleAccordeon') titlesAccordeon: QueryList<ElementRef> | undefined;

  showTitle: number | undefined;
  showLoader: boolean = false;

  producto = new WooProducto();
  // @ts-ignore
  formRegisterProducto: FormGroup;

  images: any[] = [];
  imagesBack: FormData = new FormData();
  // activeAccordeon: number = 0;
  arrayCategories: WooProductCategory[] = [];
  completed: number = 0;
  numFieldValid: number = 0;

  //*CREA EL FORMULARIO REGISTRO PRODUCTO
  createFormProduct(): void {
    this.formRegisterProducto = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), this.validatorService.notWhitesSpaceValid]],
      description: ['', [Validators.required, Validators.minLength(20), this.validatorService.notWhitesSpaceValid]],
      short_description: ['', [Validators.required, Validators.minLength(10), this.validatorService.notWhitesSpaceValid]],
      regular_price: ['', [Validators.required, Validators.minLength(1),]],
      sale_price: ['', [Validators.required, Validators.minLength(1),]],
      sku: ['', [Validators.required, Validators.minLength(3), this.validatorService.notWhitesSpaceValid]],
      stock_quantity: ['', [Validators.required]],
      // categories: ['', Validators.required]
      categories: this.formBuilder.array([]),
      // images: this.formBuilder.array([])
    },
      {
        validators: this.validatorService.priceInvalid('regular_price', 'sale_price')
      });

  }

 private formBuilder = inject(FormBuilder);
 private readonly wooProductService = inject(WooProductService);
 private readonly validatorService = inject(ValidatorsService);
 private messageService = inject(MessageService);
private readonly renderer2 = inject(Renderer2);

  constructor( ) {
    this.createFormProduct();
  }

  getCategories() {
    this.wooProductService.getCategorias().subscribe( {
      next: (resp) => {
        this.arrayCategories = resp;
      },
      error: (errorMessage) => {
        console.log(errorMessage)
      }
    })
  }




  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
    this.formRegisterProducto.reset();

  }
  get salePriceInvalid() {
    const regularPrice = this.formRegisterProducto.get('regular_price')?.value;
    const salePrice = this.formRegisterProducto.get('sale_price')?.value;

    return (regularPrice > salePrice) ? false : true;
  }

  get categoriesArray() {
    return this.formRegisterProducto.get('categories') as FormArray;
  }

  get imagesProduct() {
    return this.formRegisterProducto.get('images') as FormArray;
  }


  validField(field: string) {
    return this.formRegisterProducto.get(field)?.invalid && this.formRegisterProducto.get(field)?.touched;

  }



  completedStatus() {

    const totalFields: number = Object.keys(this.formRegisterProducto.controls).length;

    this.numFieldValid = Object.values(this.formRegisterProducto.controls).filter(control => control.valid).length;

    this.completed = ((this.numFieldValid / totalFields) * 100);
    this.completed = Math.round(this.completed)

    this.completed = ((this.numFieldValid / totalFields) * 100);
    this.completed = Math.round(this.completed)

  }

  //* VALIDA Y ALMACENA LOS VALORES DEL FORMULARIO
  registerProduct() {
    if (this.formRegisterProducto?.invalid) {
      return Object.values(this.formRegisterProducto.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    // this.images.forEach(file => {

    //   this.imagesProduct.push(this.formBuilder.control(file));
    //   this.imagesBack.append('file', file);
    // });

    const formValues = this.formRegisterProducto.value;

    this.producto = {
      name: formValues.name,
      description: formValues.description,
      short_description: formValues.short_description,
      regular_price: formValues.regular_price.toString(),
      price: formValues.sale_price.toString(),
      sku: formValues.sku,
      stock_quantity:  parseInt(formValues.stock_quantity),
      categories: formValues.categories,
      // images: this.imagesBack
    }
    this.showLoader = true;

  //  setTimeout(() => {
  //   this.showLoader = false;
  //   console.log(this.producto);
  //   this.messageService.add({ key: 'tc', severity: 'success', summary: 'Exito', detail: 'Producto registrado con exito!' });
  //   this.formRegisterProducto.reset();
  // }, 3100);



    this.wooProductService.createProduct(this.producto).subscribe({
      next: (resp) => {
        this.showLoader = false;
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Exito', detail: 'Producto registrado con exito!' });
        console.log(resp);
        this.formRegisterProducto.reset();

      },
      error: (errorMessage) => {
        this.showLoader = false;
        console.log(errorMessage);
      }
    });


  }


  // toggleAccordeon(index: number): void {

  //   // Obtén el elemento del título y su contenido actual
  //   const currentTitle = this.titlesAccordeon?.toArray()[index].nativeElement;
  //   const currentContent: HTMLElement = this.renderer2.nextSibling(currentTitle);


  //   // Verifica si el acordeón actual está abierto o cerrado
  //   if (!currentTitle.classList.contains('isOpen')) {
  //     // Cierra el acordeón abierto actualmente (si hay uno)
  //     if (this.activeAccordeon !== -1) {
  //       const previousTitle = this.titlesAccordeon?.toArray()[this.activeAccordeon].nativeElement;
  //       const previousContent: HTMLElement = this.renderer2.nextSibling(previousTitle);
  //       this.renderer2.removeClass(previousTitle, 'isOpen');
  //       this.renderer2.setStyle(previousContent, 'height', '0');
  //     }

  //     // Abre el acordeón actual
  //     this.activeAccordeon = index;
  //     this.renderer2.addClass(currentTitle, 'isOpen');
  //     this.renderer2.setStyle(currentContent, 'height', `${currentContent.scrollHeight}px`);
  //   } else {
  //     // Cierra el acordeón actual si ya está abierto
  //     this.activeAccordeon = -1;
  //     this.renderer2.removeClass(currentTitle, 'isOpen');
  //     this.renderer2.setStyle(currentContent, 'height', '0');


  //   }


  // }


  //* ALMACENA Y ACTUALIZA LOS DATOS DEL ARRAY CATEGORIAS SELECCIONADAS


  MultiSelectChangeEvent(event: any) {


    while (this.categoriesArray.length !== 0) {
      this.categoriesArray.removeAt(0);
    }


    const id = event.value['id'];
    this.categoriesArray.push(this.formBuilder.control({ id }));


    // event.value.forEach((item : any, index: number) => {

    //     const id = item.id;
    //   // const name = item.name;
    //     this.categoriesArray.push( this.formBuilder.control({id}))
    //      });


  };


  // Métodos para navegar entre pasos
  // nextStep(): void {
  //   if (this.currentStep < this.steps.length - 1) {
  //     this.currentStep++;
  //   }
  // }

  // prevStep(): void {
  //   if (this.currentStep > 0) {
  //     this.currentStep--;
  //   }
  // }

}
