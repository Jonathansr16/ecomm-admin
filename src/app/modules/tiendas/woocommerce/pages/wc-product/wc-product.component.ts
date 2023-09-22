import { Component } from '@angular/core';
import { WcProductoResponse } from '@tiendas/woocommerce/interface/wc-producto.interface';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';

import { ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { wcProductoModel } from '@tiendas/woocommerce/models/wc-new-product.model';
import { ValidatorsService } from 'src/app/core/services/validators.service';

@Component({
  selector: 'app-wc-product',
  templateUrl: './wc-product.component.html',
  styleUrls: ['./wc-product.component.scss'],
})
export class WcProductComponent {
  // @ts-ignore
  formProduct: FormGroup;
  activeAccordeon: number = 0;
  idProduct: number = 0;

  wcProduct: wcProductoModel = new wcProductoModel();

  lastValue: string = '';
  currentValue: string = '';
  equals?: boolean = true;
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
      {
        Validators: this.validatorService.fielEqual(
          'name',
          this.wcProduct.name
        ),
      }
    );
  }

  constructor(
    private wcService: WcommerceService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService
  ) {
    this.createFormUpdateProduct();
    this.activateRoute.params.subscribe((params) => {
      this.idProduct = params['id'];
      this.wcService.getProduct(params['id']).subscribe(
        (data) => {
          this.wcProduct = {
            ...data,
          };

          this.formProduct.patchValue({
            ...data,
          });

          console.log(this.formProduct);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = true;
        }
      );
    });
  }

  //*Evalua campos ESPECIFICOS
  get invalidName() {
    const lastValue = this.wcProduct.name;
    const currentValue = this.formProduct.get('name');

    return currentValue?.value === lastValue ||
      (currentValue?.invalid && currentValue?.touched)
      ? true
      : false;
  }

  get invalidDescription() {
    const lastValue = this.wcProduct.description;
    const currentValue = this.formProduct.get('description');

    return currentValue?.value === lastValue ||
      (currentValue?.invalid && currentValue?.touched)
      ? true
      : false;
  }

  get invalidShortDescription() {
    const lastValue = this.wcProduct.short_description;
    const currentValue = this.formProduct.get('short_description');

    return currentValue?.value === lastValue ||
      (currentValue?.invalid && currentValue?.touched)
      ? true
      : false;
  }

  get invalidRegularPrice() {
    const lastValue = this.wcProduct.regular_price;
    const currentValue = this.formProduct.get('regular_price');

    return currentValue?.value === lastValue || ( currentValue?.invalid && currentValue.touched) 
    ? true
    : false;
  }

  get invalidSalePrice() {
    const lastValue = this.wcProduct.sale_price;
    const currentValue = this.formProduct.get('sale_price');

    return currentValue?.value === lastValue || (currentValue?.invalid && currentValue.touched)
    ? true
    : false;
  }

  //*RESETEA UN CAMPO ESPECIFICO
  resetName() {
    this.formProduct.get('name')?.reset(this.wcProduct.name);
  }

  resetDescription() {
    this.formProduct.get('description')?.reset(this.wcProduct.description);
  }

  resetShortDescription() {
    this.formProduct.get('short_description')?.reset(this.wcProduct.short_description);
  }

  resetRegularPrice() {
    this.formProduct.get('regular_price')?.reset(this.wcProduct.regular_price);
  }

  resetSalePrice() {
    this.formProduct.get('sale_price')?.reset(this.wcProduct.sale_price);
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
