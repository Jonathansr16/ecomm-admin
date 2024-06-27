import { Injectable } from '@angular/core';
import {  FormControl, FormGroup, ValidationErrors } from '@angular/forms';


interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() { }

 
  notWhitesSpaceValid(control: FormControl): ErrorValidate | null {
    const value = control.value;
    if (typeof value === 'string') {
      if ((value || '').trim().length) {
        return null;
      }
      return { whitespace: true };
    }
    // If the value is not a string, return null or handle it accordingly
    return null;
  }
  matchValidator(controlName1: string, controlName2: string) {
    return (formGroup: FormGroup) => {
      const control1 = formGroup.get(controlName1);
      const control2 = formGroup.get(controlName2);
  
      if (control1?.value !== control2?.value) {
        control2?.setErrors({ matchValidator: true });   
      } else {
        control2?.setErrors(null);
      }
    };
  }


invalidUpdateField(controlName1: string, field: string) {

  return (formGroup: FormGroup) => {
    const control1 = formGroup.get(controlName1);

    if(control1?.value !== field) {
      control1?.setErrors({ dataUpdate: true});
    } else {
      control1.setErrors(null)
    }


  }
}


 priceInvalid(control1 : string, control2: string) {

  return (formGroup: FormGroup) => {

    const regular = formGroup.controls[control1];
    const oferta = formGroup.controls[control2];

    if( (regular.value > oferta.value) &&(regular.value > 0 && oferta.value > 0) ) {
      oferta.setErrors(null);
    } else {
      oferta.setErrors({priceInvalid: true })
    }


  }
 }





}

