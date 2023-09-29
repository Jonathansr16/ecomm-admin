import { Component } from '@angular/core';
import { WcProductoResponse } from '@tiendas/woocommerce/interface/wc-producto.interface';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

import { ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { wcProductoModel } from '@tiendas/woocommerce/models/wc-new-product.model';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wc-product',
  templateUrl: './wc-product.component.html',
  styleUrls: ['./wc-product.component.scss'],
  providers: [MessageService]
})
export class WcProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  activeAccordeon: number = 0;
  idProduct: any;

  wcProduct: wcProductoModel = new wcProductoModel();

  lastValue: string = '';
  currentValue: string = '';
  loading: boolean = true;

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
        stock_status: [''],
        stock_quantity: [''],
        categories: this.formBuilder.array([this.wcProduct.categories]),
      },
      
    );
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
      this.formProduct.patchValue({...data});
     
    })

   
  }

  //*Evalua un campos ESPECIFICOS
  invalidField(field:string, lastValue: string ):boolean {
   
   const currentValue = this.formProduct.get(field);

   return ( currentValue?.value.trim() === lastValue.trim() ) || ( currentValue?.invalid && currentValue.touched ) || (currentValue?.value.trim().length === 0)
    ? true
    : false;
  }

  //*RESETEA UN CAMPO ESPECIFICO
  cancelUpdate(field: string, lastValue: string) {
      this.formProduct.get(field)?.patchValue(lastValue);
  }

  //*ACTUALIZA UN CAMPO ESPECIFICIO
  updateField(field: string) {
    const value = this.formProduct.get(field)?.value;
    this.wcService.setFielUpdate(this.idProduct, value).subscribe( data => {

      this.messageService.add({
        severity: 'success',
        summary: 'Actualización',
        detail: 'Actualización echa con exito!'
      });

      console.log(data);
      this.wcProduct.name = data.name;
      this.formProduct.get(field)?.patchValue(data.name);

    }, (error) => {
      console.log(error);
    })
  }

  //* Abre & cierra cada acordeon
  toggleAccordeon(index: number): void {
    if (this.activeAccordeon === index) {
      this.activeAccordeon = -1;
    } else {
      this.activeAccordeon = index;
    }
  }
}
