import { CategoryResponse } from "../interface/wc-producto.interface";

export class wcProductoModel {
  
  id?:                   number;
  name:                  string = "";
  description:           string = "";
  short_description?:    string = "";
  regular_price:        string = "";
  sale_price?:            string = "";
  sku:                   string = "";
  status?:                string = "";
  price?:                 string = "";
  total_sales?:          number;
  categories:            CategoryResponse[] = [];
  tags?:                 any[];
  stock_quantity?:       null;
  stock_status?:         string;
  images:                FormData;

  constructor() {
     this.stock_status = 'instock';
      this.images = new FormData();
      this.total_sales = 0;
  }
  
}

export interface wcImage {
  image: File
}
