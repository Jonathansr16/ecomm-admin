import { categorias } from "src/app/core/interface/categorias.interface";

export class wcProductoModel {
  name: string = "";
  description: string = "";
  short_description: string = "";
  regular_price: string ="";
  sale_price: string= "";
  sku: string = "";
  stock_status?: string;
  stock_quantity?: string;
  categories?: categorias[] = [];
  images: FormData;

  constructor() {
     this.stock_status = 'instock';
      this.images = new FormData();
  }
  
}

export interface wcImage {
  image: File
}
