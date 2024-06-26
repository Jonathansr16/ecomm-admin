import { WooImageResult, WooProductCategory, WooProductResult } from "../interface/woo-producto.interface";

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
  price             = '';
  regular_price     = '';
  sale_price        = '';
  sku               = "";
  categories:       WooProductCategory[] = [];
  stock_quantity    = 1;
  status?           = "";
  stock_status?     = "";
  images:          WooImageResult[] = [];

  constructor() {
    
  }
  
}

