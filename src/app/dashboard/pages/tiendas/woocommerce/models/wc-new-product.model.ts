import { WooProductCategory, WooProductImage, WooProductResult } from "../interface/woo-producto.interface";

export class WooProducto {

  static newProductFromJSON(obj : WooProductResult) {
    return new WooProducto
  }

  // Firma de índice que acepta cualquier cadena como clave
  [key: string]: any; 
  id?               = 0;
  name              = "";
  description       = "";
  short_description = "";
  regular_price     = "";
  price        = "";
  sku               = "";
  status?            = "";
  total_sales?:          number;
  categories:           WooProductCategory[] = [];
  stock_quantity:       number = 1;
  stock_status? = "";
  images?:                WooProductImage[] = [];

  constructor() {
    
  }
  
}

