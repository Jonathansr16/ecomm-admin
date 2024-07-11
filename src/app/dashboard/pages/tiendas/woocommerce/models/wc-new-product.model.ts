import { FileItem } from "src/app/core/models/file-item.models";
import { WooProductResult } from "../interface/woo-producto.interface";
import { IdCategoryByProduct } from "@woocommerce/interface/woo-category-product.interface";

export class WooProducto {

  static newProductFromJSON(obj: WooProductResult) {
    return new WooProducto
  }

  // Firma de índice que acepta cualquier cadena como clave
  [key: string]: any;
  id? = 0;
  name = "";
  description = "";
  short_description = "";
  regular_price = '';
  sale_price = '';
  sku = "";
  categories: IdCategoryByProduct[] = [];
  stock_quantity = 1;
  status: 'draft' | 'pending' | 'private' | 'publish' = 'publish';
  stock_status: 'instock' | 'outofstock' | 'onbackorder' = 'instock';
  images: FileItem[] = [];
  variations: number[] = [];
  total_sales? = 0


}


