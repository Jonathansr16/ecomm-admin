import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { wcProductoModel } from '@tiendas/woocommerce/models/wc-new-product.model';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

import { Message, MessageService } from 'primeng/api';
import { categorias } from 'src/app/core/interface/categorias.interface';

import { MultiSelectChangeEvent, MultiSelectFocusEvent } from 'primeng/multiselect';
import Swal from 'sweetalert2'
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { CategoryResponse } from '@tiendas/woocommerce/interface/wc-producto.interface';

@Component({
  selector: 'app-wc-new-product',
  templateUrl: './wc-new-product.component.html',
  styleUrls: ['./wc-new-product.component.scss'],
  providers: [MessageService],
})
export class WcNewProductComponent implements OnInit {

  // items: MenuItem[] = [];
  // currentStep: number = 0;
  activeIndex: number = 1;
  showGestion: boolean= false;


  producto = new wcProductoModel();
  // @ts-ignore
  formRegisterProducto: FormGroup;

  images: any[] = [];
  imagesBack: FormData = new FormData();

  activeAccordeon: number =0;

  arrayCategories: CategoryResponse[] = [];
   selectedCategories: categorias[] = [];

   completed: number = 0;
   numFieldValid: number = 0;

     //*CREA EL FORMULARIO REGISTRO PRODUCTO
  createFormProduct(): void {
    this.formRegisterProducto = this.formBuilder.group({
      name:              ['', [ Validators.required, Validators.minLength(5),   this.validatorService.notWhitesSpaceValid ]],
      description:       ['', [ Validators.required, Validators.minLength(20),  this.validatorService.notWhitesSpaceValid ]],
      short_description: ['', [ Validators.required, Validators.minLength(10),  this.validatorService.notWhitesSpaceValid ]],
      regular_price:     ['', [ Validators.required, Validators.minLength(1),                                             ]],                                        
      sale_price:        ['', [ Validators.required, Validators.minLength(1),                                             ]],                                     
      sku:               ['', [ Validators.required, Validators.minLength(3),   this.validatorService.notWhitesSpaceValid ]],
      stock_quantity:    ['', [ Validators.required                                                                       ]],
      categories: this.formBuilder.array([  ]),
      // images: this.formBuilder.array([])
    },
     {
      validators: this.validatorService.priceInvalid('regular_price','sale_price')
    });

  }

   constructor(private formBuilder: FormBuilder, private wcService: WcommerceService, private validatorService: ValidatorsService, private messageService: MessageService) {

    this.createFormProduct();

    this.wcService.getCategorias().subscribe( data  => {

      this.arrayCategories = data;

     }, (error) => {

      console.log(error)
     });

    this.loadData();

  }


  ngOnInit(): void {

  }



   //*GET DATA REGISTER FORM
get nameInvalid() {
  return this.formRegisterProducto.get('name')?.invalid && this.formRegisterProducto.get('name')?.touched || this.formRegisterProducto.get('name')?.invalid;
}

get descriptionInvalid() {
  return this.formRegisterProducto.get('description')?.invalid && this.formRegisterProducto.get('description')?.touched || this.formRegisterProducto.get('description')?.invalid;
}

get shortDescriptionInvalid() {
  return this.formRegisterProducto.get('short_description')?.invalid && this.formRegisterProducto.get('short_description')?.touched || this.formRegisterProducto.get('short_description')?.invalid;
}

get regularPriceInvalid() {
  return this.formRegisterProducto.get('regular_price')?.invalid && this.formRegisterProducto.get('regular_price')?.touched || this.formRegisterProducto.get('regular_price')?.invalid;
}

get salePriceInvalid() {
  const regularPrice = this.formRegisterProducto.get('regular_price')?.value;
  const salePrice = this.formRegisterProducto.get('sale_price')?.value;

  return ( regularPrice > salePrice ) ? false : true;
}


get skuInvalid() {
  return this.formRegisterProducto.get('sku')?.invalid && this.formRegisterProducto.get('sku')?.touched || this.formRegisterProducto.get('sku')?.invalid;
}


get categoriesInvalid() {
  return  this.categoriesArray.length === 0 && this.categoriesArray.touched || this.categoriesArray.invalid;
}

get stockQuantityInvalid() {
  return  this.formRegisterProducto.get('stock_quantity')?.invalid && this.formRegisterProducto.get('stock_quantity')?.touched || this.formRegisterProducto.get('stock_quantity')?.invalid;
}

get categoriesArray() {
  return this.formRegisterProducto.get('categories') as FormArray;
}

get imagesProduct() {
  return this.formRegisterProducto.get('images') as FormArray;
}



completedStatus() {

   const totalFields : number =  Object.keys(this.formRegisterProducto.controls).length;

    this.numFieldValid = Object.values(this.formRegisterProducto.controls).filter(control => control.valid).length;


  this.completed =   ((this.numFieldValid / totalFields) *100);
  this.completed = Math.round(this.completed)


  
  this.completed =   ((this.numFieldValid / totalFields) *100);
  this.completed = Math.round(this.completed)

}



//* VALIDA Y ALMACENA LOS VALORES DEL FORMULARIO
  registerProduct() {
    if(this.formRegisterProducto?.invalid) {
      return Object.values(this.formRegisterProducto.controls).forEach(control => {
        control.markAsTouched();
        console.log(this.formRegisterProducto)

      });
    }

    

    this.images.forEach(file => {

      this.imagesProduct.push(this.formBuilder.control(file));
      this.imagesBack.append('file', file);
    });

    const formValues = this.formRegisterProducto.value;
    // const regularPrice = formValues.regular_price.toString();
    // const salePrice = formValues.sale_price.toString();

    // this.producto = {
    // name: formValues.name,
    // description: formValues.description,
    // short_description: formValues.short_description,
    // regular_price: regularPrice,
    // sale_price: salePrice,
    // sku: formValues.sku,
    // stock_quantity: formValues.stock_quantity,
    // categories: formValues.categories,
    // images: this.imagesBack
    // }


    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   title: 'Validando',
    //   text: 'Espere por favor..',
    // });


    // Swal.showLoading();

    // this.wcService.createProduct(this.producto).subscribe(data => {

    //   Swal.close();

    //   Swal.fire({
    //     allowOutsideClick: false,
    //     icon: 'success',
    //     title: 'Producto registrado con exito',

    //   });

    //   this.formRegisterProducto.reset();

    //   console.log(data)
    // }, (error) => {
    //   console.log(error);

    //   Swal.fire({
    //     icon: 'error',
    //     title: error.error.code,
    //     text: error.error.message
    //   });
    // })


  }

  loadData() {
    this.formRegisterProducto.reset({
      name: 'Mario Party 3 Físico En Caja Con Manual Nintendo 64',
      description: 'En Mario Party 3, únete a Mario, Luigi, Peach y otros personajes queridos en una nueva aventura llena de desafíos y risas',
      short_description: '¡Compra Mario Party 3 ahora mismo y prepárate para vivir la fiesta definitiva! Descubre quién se lleva la gloria y crea recuerdos que durarán para siempre en esta increíble odisea de juego.',
      sku: 'mp3full',
      stock_quantity: 40,
     
    })
  }

  //*ABRE Y CIERRE ACORDEON
toggleAccordeon(index: number) {
  if (this.activeAccordeon === index) {
    this.activeAccordeon = -1;
  } else {
    this.activeAccordeon = index;
  }
}

  //* ALMACENA Y ACTUALIZA LOS DATOS DEL ARRAY CATEGORIAS SELECCIONADAS
    MultiSelectChangeEvent(event: any) {

         while (this.categoriesArray.length !== 0) {
          this.categoriesArray.removeAt(0);
        }

      event.value.forEach((item : any, index: number) => {

          const id = item.id;
        // const name = item.name;
          this.categoriesArray.push( this.formBuilder.control({id}))
           });


        };



}
