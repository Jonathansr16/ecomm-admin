import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorsService } from "../services/validators.service"
import { inject } from "@angular/core";

export function generateProductForm(): FormGroup {
    
let validatorService= inject(ValidatorsService);

// const titleValidators        : ValidatorFn[] = [ Validators.required, Validators.minLength(3), Validators.maxLength(60), validatorService.notWhitesSpaceValid ];
// const descriptionValitors    : ValidatorFn[] = [ Validators.required, Validators.minLength(10), Validators.maxLength(2000), validatorService.notWhitesSpaceValid ];
// const regularPriceValidators : ValidatorFn[] = [ Validators.required ]; 
// const salePriceValidators    : ValidatorFn[] = [ Validators.required ]; 
// const skuValidators          : ValidatorFn[] = [ Validators.required ]; 
// const stockValidators        : ValidatorFn[] = [ Validators.required ];

return new FormGroup(
    {
      title:                  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60), validatorService.notWhitesSpaceValid]),
      description:            new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000), validatorService.notWhitesSpaceValid]),
      regularPrice:           new FormControl('', [Validators.required]),
      salePrice:              new FormControl('', [Validators.required]),
      sku:                    new FormControl('', [Validators.required] ),
      stock:                  new FormControl('', [Validators.required] ),   
    }
    )
}
