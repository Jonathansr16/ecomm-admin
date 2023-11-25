import { Component } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { WooProducto } from '@wcommerce/models/wc-new-product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService]
})
export class ProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  activeAccordeon: number = 0;
  idProduct: any;

  wcProduct: WooProducto = new WooProducto();

  lastValue: string = '';
  currentValue: string = '';
  loading: boolean = true;
  completedEdit: number = 0;
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

  constructor(
    private wcService: WcommerceService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService,
    private messageService: MessageService,


  ) {
    this.createFormUpdateProduct();
    this.idProduct = this.activateRoute.snapshot.paramMap.get('id');

    this.wcService.getProduct(this.idProduct).subscribe(data => {
      this.wcProduct = {
        ...data
      };

      this.loading = false;
      this.formProduct.patchValue({ ...data });

    })


  }


  getProductById(id: number){
    this.wcService.getProduct(this.idProduct).subscribe({
      next: (resp) => {
        this.wcProduct = {
          ...resp
        };
      },
      error: (errorMessage) => {
        this.loading = false;
        this.formProduct.patchValue({  });

      }
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
    if (this.formProduct.get(field)?.invalid && this.formProduct.touched) {
      return true
    } else {
      return false;
    }
  }

  //* ACTUALIZA UN CAMPO ESPECIFICIO

  updateName() : void {

    const nameProduct = this.formProduct.get('name');

    if (nameProduct?.valid) {

      const data: any = {
        name: nameProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateDescription() : void {

    const descriptionProduct = this.formProduct.get('description');

    if (descriptionProduct?.valid) {

      const data: any = {
        description: descriptionProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateShortDescription() : void {

    const shortDescription = this.formProduct.get('short_description');

    if (shortDescription?.valid) {

      const data: any = {
        short_description: shortDescription.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateRegularPrice() : void {

    const regularPriceProduct = this.formProduct.get('regular_price');

    if (regularPriceProduct?.valid) {

      const data: any = {
        regular_price: regularPriceProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateSalePrice() : void {

    const salePriceProduct = this.formProduct.get('sale_price');

    if (salePriceProduct?.valid) {

      const data: any = {
        sale_price: salePriceProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateSku() : void {

    const skuProduct = this.formProduct.get('sku');

    if (skuProduct?.valid) {

      const data: any = {
        sku: skuProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

  updateQuantity() : void {

    const stockProduct = this.formProduct.get('stock_quantity');

    if (stockProduct?.valid) {

      const data: any = {
        stock_quantity: stockProduct.value
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Validando',
        text: 'Espere por favor...'

      });

      Swal.showLoading();

      this.wcService.setFielUpdate(this.idProduct, data).subscribe(data => {

        Swal.close();
        this.wcProduct.name = data.name;

        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Actualización echa con exito!'
        });

        console.log(data)

      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error'
        })
      })

    }
  }

 

  

  //* Abre & cierra cada acordeon
  toggleAccordeon(index: number): void {
    if (this.activeAccordeon === index) {
      this.activeAccordeon = -1;
    } else {
      this.activeAccordeon = index;
      console.log(this.formProduct.controls)
    }
  }


}
