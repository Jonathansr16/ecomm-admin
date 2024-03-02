import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorsService } from "../services/validators.service"
import { inject } from "@angular/core";

export function generateProductForm(): FormGroup {
    
let validatorService= inject(ValidatorsService);

const titleValidators        : ValidatorFn[] = [ Validators.required, Validators.minLength(3), Validators.maxLength(60), validatorService.notWhitesSpaceValid ];
const descriptionValitors   : ValidatorFn[] = [ Validators.required, Validators.minLength(10), Validators.maxLength(2000), validatorService.notWhitesSpaceValid ];
const regularPriceValidators: ValidatorFn[] = [ Validators.required ]; 
const salePriceValidators   : ValidatorFn[] = [ Validators.required ]; 
const skuValidators         : ValidatorFn[] = [ Validators.required ]; 
const stockQuantity         : ValidatorFn[] = [ Validators.required ];

return new FormGroup(
    {
      title:                  new FormControl('', titleValidators),
      description:            new FormControl('', descriptionValitors),
      regularPrice:           new FormControl('', regularPriceValidators),
      salePrice:              new FormControl('', salePriceValidators),
      sku:                    new FormControl('', skuValidators ),
      stockQuantity:          new FormControl('', stockQuantity ),   
    }
    )
}
