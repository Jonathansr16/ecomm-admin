import { WooProductCategory, WooProductImage, WooProductResult } from "../interface/woo-producto.interface";

export class WooProducto {

  static newProductFromJSON(obj : WooProductResult) {
    return new WooProducto
  }

  // Firma de índice que acepta cualquier cadena como clave
  [key: string]:   any; 
  id?               = 0;
  name              = "";
  description       = "";
  short_description = "";
  regular_price     = 0;
  price             = 0;
  sku               = "";
  status?           = "";
  categories:       WooProductCategory[] = [];
  stock_quantity    = 1;
  stock_status?     = "";
  images?:          WooProductImage[] = [];

  constructor() {
    
  }
  
}

