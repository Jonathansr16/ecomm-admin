import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { wcProductoModel } from '@wcommerce/models/wc-new-product.model';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

import {  MessageService } from 'primeng/api';
import { categorias } from 'src/app/core/interface/categorias.interface';

import Swal from 'sweetalert2'
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { CategoryResponse } from '@wcommerce/interface/wc-producto.interface';

@Component({
  selector: 'app-wc-new-product',
  templateUrl: './wc-new-product.component.html',
  styleUrls: ['./wc-new-product.component.scss'],
  providers: [MessageService],
})
export class WcNewProductComponent  {

  @ViewChildren('titleAccordeon') titlesAccordeon: QueryList<ElementRef> | undefined;

  indicePanel:  number = -1;
  showTitle: number | undefined;
  currentStep: number;
  steps: string[] = ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5'];

  togglePanelState(panelNumber: number) {
    if (this.indicePanel === panelNumber) {
      this.indicePanel = -1; // Cierra el panel si ya está abierto
    } else {
      this.indicePanel = panelNumber; // Abre el panel
    }
  }

  toggleShowTitle(index: number) {
    if (this.showTitle === index) {
          this.showTitle = -1;
        } else {
          this.showTitle = index;
        }
  }

  producto = new wcProductoModel();
  // @ts-ignore
  formRegisterProducto: FormGroup;

  images: any[] = [];
  imagesBack: FormData = new FormData();
  activeAccordeon: number = 0;
  arrayCategories: CategoryResponse[] = [];
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

  constructor(private formBuilder: FormBuilder, private wcService: WcommerceService, private validatorService: ValidatorsService, private messageService: MessageService, private renderer2: Renderer2) {

    this.createFormProduct();
    this.currentStep = 0;
    this.wcService.getCategorias().subscribe(data => {

      this.arrayCategories = data;

      console.log(this.categoriesArray.length);

    }, (error) => {

      console.log(error)
    });

  }


  //*GET DATA REGISTER FORM
  // get nameInvalid() {
  //   return this.formRegisterProducto.get('name')?.invalid && this.formRegisterProducto.get('name')?.touched || this.formRegisterProducto.get('name')?.invalid;
  // }

  // get descriptionInvalid() {
  //   return this.formRegisterProducto.get('description')?.invalid && this.formRegisterProducto.get('description')?.touched || this.formRegisterProducto.get('description')?.invalid;
  // }

  // get shortDescriptionInvalid() {
  //   return this.formRegisterProducto.get('short_description')?.invalid && this.formRegisterProducto.get('short_description')?.touched || this.formRegisterProducto.get('short_description')?.invalid;
  // }

  // get regularPriceInvalid() {
  //   return this.formRegisterProducto.get('regular_price')?.invalid && this.formRegisterProducto.get('regular_price')?.touched || this.formRegisterProducto.get('regular_price')?.invalid;
  // }

  get salePriceInvalid() {
    const regularPrice = this.formRegisterProducto.get('regular_price')?.value;
    const salePrice = this.formRegisterProducto.get('sale_price')?.value;

    return (regularPrice > salePrice) ? false : true;
  }

  // get skuInvalid() {
  //   return this.formRegisterProducto.get('sku')?.invalid && this.formRegisterProducto.get('sku')?.touched || this.formRegisterProducto.get('sku')?.invalid;
  // }

  // get stockQuantityInvalid() {
  //   return this.formRegisterProducto.get('stock_quantity')?.invalid && this.formRegisterProducto.get('stock_quantity')?.touched || this.formRegisterProducto.get('stock_quantity')?.invalid;
  // }

  get categoriesArray() {
    return this.formRegisterProducto.get('categories') as FormArray;
  }

  get imagesProduct() {
    return this.formRegisterProducto.get('images') as FormArray;
  }


  validField(field: string) {
    return this.formRegisterProducto.get(field)?.invalid && this.formRegisterProducto.get(field)?.touched;

  }

 invalidField(field: string) {
  return this.formRegisterProducto.get(field)?.invalid;
   
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

    this.images.forEach(file => {

      this.imagesProduct.push(this.formBuilder.control(file));
      this.imagesBack.append('file', file);
    });

    const formValues = this.formRegisterProducto.value;
    const regularPrice = formValues.regular_price.toString();
    const salePrice = formValues.sale_price.toString();

    this.producto = {
      name: formValues.name,
      description: formValues.description,
      short_description: formValues.short_description,
      regular_price: regularPrice,
      sale_price: salePrice,
      sku: formValues.sku,
      stock_quantity: formValues.stock_quantity,
      categories: formValues.categories,
      images: this.imagesBack
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Validando',
      text: 'Espere por favor..',
    });


    Swal.showLoading();
    Swal.close();

    Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Producto registrado con exito',

      });
    console.log(this.producto);
    this.formRegisterProducto.reset();
    // this.wcService.createProduct(this.producto).subscribe(data => {

    //   Swal.close();

    //   // Swal.fire({
    //   //   allowOutsideClick: false,
    //   //   icon: 'success',
    //   //   title: 'Producto registrado con exito',

    //   // });

    //   this.messageService.add({
    //     key: 'tc',
    //     severity: 'success',
    //     summary: 'Actualización',
    //     detail: 'Actualización echa con exito!'
    //   });



    //   console.log(data)
    //   this.formRegisterProducto.reset();
    // }, (error) => {
    //   console.log(error);

    //   Swal.fire({
    //     icon: 'error',
    //     title: error.error.code,
    //     text: error.error.message
    //   });
    // })


  }



  //*ABRE Y CIERRE ACORDEON
  // toggleAccordeon(index: number) {
  //   if (this.activeAccordeon === index) {
  //     this.activeAccordeon = -1;
  //   } else {
  //     this.activeAccordeon = index;
  //   }
  // }
  toggleAccordeon(index: number): void {

    // Obtén el elemento del título y su contenido actual
    const currentTitle = this.titlesAccordeon?.toArray()[index].nativeElement;
    const currentContent: HTMLElement = this.renderer2.nextSibling(currentTitle);


    // Verifica si el acordeón actual está abierto o cerrado
    if (!currentTitle.classList.contains('isOpen')) {
      // Cierra el acordeón abierto actualmente (si hay uno)
      if (this.activeAccordeon !== -1) {
        const previousTitle = this.titlesAccordeon?.toArray()[this.activeAccordeon].nativeElement;
        const previousContent: HTMLElement = this.renderer2.nextSibling(previousTitle);
        this.renderer2.removeClass(previousTitle, 'isOpen');
        this.renderer2.setStyle(previousContent, 'height', '0');
      }

      // Abre el acordeón actual
      this.activeAccordeon = index;
      this.renderer2.addClass(currentTitle, 'isOpen');
      this.renderer2.setStyle(currentContent, 'height', `${currentContent.scrollHeight}px`);
    } else {
      // Cierra el acordeón actual si ya está abierto
      this.activeAccordeon = -1;
      this.renderer2.removeClass(currentTitle, 'isOpen');
      this.renderer2.setStyle(currentContent, 'height', '0');


    }


  }


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
  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

}


/*
 - Mostrar "numero" de step "activo" si esa 
   si algun campo de esa seccion es "invalido".

- Mostrar "icono de check" de step "si ya se
  paso ala siguiente sección" si los
  campos de esa sección son validos.

- Mostrar "numero sin relleno" de steps
  inactivos si los campos son invalidos
*/