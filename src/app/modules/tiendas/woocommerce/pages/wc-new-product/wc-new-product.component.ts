import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-wc-new-product',
  templateUrl: './wc-new-product.component.html',
  styleUrls: ['./wc-new-product.component.scss'],
  providers: [],
})
export class WcNewProductComponent implements OnInit {

  items: MenuItem[] = [];
  submitted: boolean = false;
  activeIndex: number = 1;
  currentStep: number = 0;
  // @ts-ignore
  formRegisterProducto: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormProduct();
  }


  ngOnInit(): void {
     
  }

  // Métodos para navegar entre pasos
  nextStep(): void {
    if (this.currentStep < this.items.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

   //*GET DATA REGISTER FORM
get titleInvalid() {
  return this.formRegisterProducto.get('title')?.invalid && this.formRegisterProducto.get('title')?.touched;
}

get descriptionInvalid() {
  return this.formRegisterProducto.get('description')?.invalid && this.formRegisterProducto.get('description')?.touched;
}

get priceInvalid() {
  return this.formRegisterProducto.get('price')?.invalid && this.formRegisterProducto.get('price')?.touched;
}

get statusInvalid() {
  return this.formRegisterProducto.get('status')?.invalid && this.formRegisterProducto.get('status')?.touched;
}

get skuInvalid() {
  return this.formRegisterProducto.get('sku')?.invalid && this.formRegisterProducto.get('sku')?.touched;
}

  //*CREA EL FORMULARIO REGISTRO PRODUCTO
  createFormProduct(): void {
    this.formRegisterProducto = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      priceOfert: ['', Validators.required, Validators.minLength(2)],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', [Validators.required]],

    });
  }

  registerProduct() {
    if(this.formRegisterProducto?.invalid) {
      return Object.values(this.formRegisterProducto.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }
}
