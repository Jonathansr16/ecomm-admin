import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckOrderService {

  private selectedProducts: any = [];
    //Selecciona y Deselecciona el checkbox
 private selectAll: boolean = false;
    //Selecciona y Deselecciona caa checkbox del arreglo
  private selectOne:  boolean[] = [];
  

  constructor() { }
}
