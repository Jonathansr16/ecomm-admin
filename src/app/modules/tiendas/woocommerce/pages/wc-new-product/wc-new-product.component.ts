import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { wcProductoModel } from '@tiendas/woocommerce/models/wc-new-product.model';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

import { MessageService } from 'primeng/api';
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
  


  arrayCategories: CategoryResponse[] = [];
   selectedCategories?: categorias[];

  constructor(private formBuilder: FormBuilder, private wcService: WcommerceService, private validatorService: ValidatorsService, private messageService: MessageService) {
   
    this.createFormProduct();
  
    this.wcService.getCategorias().subscribe( data  => {
      
      this.arrayCategories = data;
    
     }, (error) => {
  
      console.log(error)
     });
  }


  ngOnInit(): void {
   
  }

  // Métodos para navegar entre pasos
  // nextStep(): void {
  //   if (this.currentStep < this.items.length - 1) {
  //     this.currentStep++;
  //   }
  // }

  // prevStep(): void {
  //   if (this.currentStep > 0) {
  //     this.currentStep--;
  //   }
  // }

   //*GET DATA REGISTER FORM
get nameInvalid() {
  return this.formRegisterProducto.get('name')?.invalid && this.formRegisterProducto.get('name')?.touched;
}

get descriptionInvalid() {
  return this.formRegisterProducto.get('description')?.invalid && this.formRegisterProducto.get('description')?.touched;
}

get shortDescriptionInvalid() {
  return this.formRegisterProducto.get('short_description')?.invalid && this.formRegisterProducto.get('short_description')?.touched;
}

get regularPriceInvalid() {
  return this.formRegisterProducto.get('regular_price')?.invalid && this.formRegisterProducto.get('regular_price')?.touched;
}

get salePriceInvalid() {
  return this.formRegisterProducto.get('sale_price')?.invalid && this.formRegisterProducto.get('sale_price')?.touched;
}

get priceSaleInvalid() {
 
  const regularPrice =    this.formRegisterProducto.get('regular_price')?.value;
  const salePrice    =    this.formRegisterProducto.get('sale_price')?.value;

  return (salePrice < regularPrice) ? false : true;
}

get skuInvalid() {
  return this.formRegisterProducto.get('sku')?.invalid && this.formRegisterProducto.get('sku')?.touched;
}

get stockStatusInvalid() {
  return this.formRegisterProducto.get('stock_status')?.invalid && this.formRegisterProducto.get('stock_status')?.touched;
}

get stockQuantityInvalid() {
  return this.formRegisterProducto.get('stock_quantity')?.invalid && this.formRegisterProducto.get('stock_quantity')?.touched;
}

get categoriesArray() {
  return this.formRegisterProducto.get('categories') as FormArray;
}

get imagesProduct() {
  return this.formRegisterProducto.get('images') as FormArray;
}


  //*CREA EL FORMULARIO REGISTRO PRODUCTO
  createFormProduct(): void {
    this.formRegisterProducto = this.formBuilder.group({
      name: ['',              [ Validators.required, Validators.minLength(5),   this.validatorService.notWhitesSpaceValid ]],
      description:       ['', [ Validators.required, Validators.minLength(20),  this.validatorService.notWhitesSpaceValid ]],
      short_description: ['', [ Validators.required, Validators.minLength(10),  this.validatorService.notWhitesSpaceValid ]],
      regular_price: ['',     [ Validators.required, Validators.minLength(2),                                             ]],
      sale_price: ['',        [ Validators.required, Validators.minLength(2),                                             ]],
      sku: ['',               [ Validators.required, Validators.minLength(3),   this.validatorService.notWhitesSpaceValid ]],
      stock_status: ['',      [                                                                                            ]],
      check_inventario: [false],
      stock_quantity: [''    ],
       categories: this.formBuilder.array([]),
      images: this.formBuilder.array([])
    },
    
    {
      Validators: this.validatorService.priceOfertInvalid('regular_price', 'sale_price'), 
    }
    );

    this.formRegisterProducto.get('check_inventario')?.valueChanges.subscribe( formValues => {
     
     this.showGestion= formValues;

     
      const inventario = this.formRegisterProducto.get('stock_quantity');
      const statusInventario = this.formRegisterProducto.get('stock_status');
    
  
      if(this.showGestion == true) {
    
        inventario?.setValidators([Validators.required]);
        statusInventario?.clearValidators();
        statusInventario?.setValue('');
      } else {
        inventario?.clearValidators();
        inventario?.setValue('');
        statusInventario?.setValidators([Validators.required]);
        
      }
      inventario?.updateValueAndValidity();
      statusInventario?.updateValueAndValidity();
    })
  }

//* VALIDA Y ALMACENA LOS VALORES DEL FORMULARIO
  registerProduct() {
    if(this.formRegisterProducto?.invalid) {
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

    this.wcService.createProduct(this.producto).subscribe(data => {

      Swal.close();

      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Producto registrado con exito',
    
      });

      this.formRegisterProducto.reset();

      console.log(data)
    }, (error) => {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: error.error.code,
        text: error.error.message
      });
    })


  }


  //* ALMACENA Y ACTUALIZA LOS DATOS DEL ARRAY CATEGORIAS SELECCIONADAS
    MultiSelectChangeEvent(event: any) {
     
         while (this.categoriesArray.length !== 0) {
          this.categoriesArray.removeAt(0);
        }

        const valor = event.value.forEach((item : any, index: number) => {
        
          const id = item.id;
         

          this.categoriesArray.push( this.formBuilder.control({id}))
           });
      
 
        };
      

    
      

}
