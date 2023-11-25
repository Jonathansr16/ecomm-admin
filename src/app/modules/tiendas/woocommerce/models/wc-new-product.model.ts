import { ProductImageResult, ProductCategoryResponse, ProductResult } from "../interface/woo-producto.interface";


export class WooProducto {


  static newProductFromJSON(obj : ProductResult) {
    return new WooProducto
  }

  
  id?               = 0;
  name              = "";
  description       = "";
  short_description = "";
  regular_price     = "";
  sale_price        = "";
  sku               = "";
  status?            = "";
  total_sales?:          number;
  categories:           ProductCategoryResponse[] = [];
  stock_quantity:       number = 1;
  stock_status? = "";
  images?:                ProductImageResult[] = [];

  constructor() {
    
  }
  
}

