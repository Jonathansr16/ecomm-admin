import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  notWhitesSpaceValid(control: FormControl) {

    return (control.value || '').trim().length? null : { 'whitespace': true };       
  }

  passwordsNotEquals(pass1 : string, pass2: string) {
  
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if(pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notEquals: true });
      }
    }
  }


  priceOfertInvalid(regularPrice: string, salePrice: string) {

    return (formGroup: FormGroup) => {

      const regularPriceControl = formGroup.controls[regularPrice];
      const salePriceControl   = formGroup.controls[salePrice];


      if(salePriceControl.value < regularPriceControl.value) {
          salePriceControl.setErrors(null);
      } else {
        salePriceControl.setErrors({ precioOFerta: true});
      }

    }
  }


}

