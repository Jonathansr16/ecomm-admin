import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MelyProductByUserID } from '@mely/interfaces/mely-product-by-user.interface';
import {
  BodyProductResponse,
  ProductsByIdsResponse,
} from '@mely/interfaces/mely-products-by-ids.interface';
import { Observable, map } from 'rxjs';
import { Inventory } from 'src/app/core/interface/product.interface';
import { AttributesVariants, VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { FileItem } from 'src/app/core/models/file-item.models';

@Injectable({
  providedIn: 'root',
})
export class MelyProductsService {
  
  private readonly http = inject(HttpClient);

  //*Obtiene los productos por usuario
  getProductsByUserId(
    orders: string,
    limit: number,
    offset: number
  ): Observable<{ ids: string[]; totalIds: number }> {
    let params = new HttpParams()
      .append('orders', orders)
      .append('limit', limit)
      .append('offset', offset);

    return this.http
      .get<MelyProductByUserID>(
        '/users/87159847/items/search?filters=paused&filters=active',
        { params }
      )
      .pipe(
        map((resp) => {
          return {
            ids: resp.results,
            totalIds: resp.paging.total,
          };
        })
      );
  }

  //* OBTIENE LOS PRODUCTOS POR ID
  getProductsByids(ids: string[]): Observable<Inventory[]> {
    let params = new HttpParams().append('orders', 'sold_quantity_desc');
    const idString = ids.join(',');
    return this.http
      .get<ProductsByIdsResponse[]>(`/items?ids=${idString}`, { params })
      .pipe(
        map((resp) => {
          return resp.map((item) => this.transformProduct(item.body));
        })
      );
  }

  //*OBTIENE LOS PRODUCTOS BUSCADOS
  getProductsBySearch(value: string, limit: number, offset: number): Observable<{ ids: string[], totalIds: number}> {
   
    const searchValue = value.replace(/ /g, '%20');

    let params = new HttpParams()
    .append('limit', limit)
    .append('offset', offset);


  return this.http.get<MelyProductByUserID>(
      `/users/87159847/items/search?q=${searchValue}`,
      { params }
    )
    .pipe(
      map((resp) => {
        return {
          ids: resp.results,
          totalIds: resp.paging.total,
        };
      })
    );
  }

  //* OBTIENE VARIANTES DE UN PRODUCTO
  getProductByVariant(id: string): Observable<VariantProduct[]> {
    return this.http.get<ProductsByIdsResponse[]>(`/items?ids=${id}`).pipe(
      map((resp) => {
        const product = resp[0];
      
        return product.body.variations.map( (variant) => {
          const file = new File([], variant.attribute_combinations[0].value_name, { type: 'image/*' });
          const fileItem = new FileItem(file);
          fileItem.objectURL = `http://http2.mlstatic.com/D_${variant.picture_ids[0]}-I.jpg`;

          return {
            id: variant.id.toString(),
            sku: 'Sin especificar',
            stock: variant.available_quantity,
            regular_price: variant.price,
            sale_price: variant.price,
            images: [fileItem],
            status: variant.available_quantity > 0 ? 'active' : 'inactive',
          } as VariantProduct
        })
     
      })
    );
  }

  transformProduct(product: BodyProductResponse): Inventory {
   
    let skuProduct = 'Sin definir';
    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    }); 

    const fileItems: FileItem[] = [];

    product.pictures.forEach( (item, index) => {
      const file = new File([], item.id, { type: 'image/*'});
      const fileItem = new FileItem(file);
      fileItem.objectURL = item.url;

      fileItems.push(fileItem); 
    })

    return {
      id: product.id,
      title: product.title,
      sku: skuProduct,
      store: 'mely',
      regular_price: product.original_price || product.price,
      sale_price: product.price,
      total_sales: product.sold_quantity,
      isFulfillment:
        product.shipping.logistic_type === 'fulfillment' ? true : false,
      stock: product.available_quantity,
      status: product.status === 'active' ? 'active' : 'inactive',
      isDropdownInformation: product.variations.length > 0,
      variations: this.transformVariant(product),
      images: fileItems
    }
  }

  transformVariant(product: BodyProductResponse): VariantProduct[] {
    let skuProduct = 'Sin definir';

   
    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    });

    return product.variations.map( (variant) => {
      const file = new File([], variant.attribute_combinations[0].value_name, { type: 'image/*' });
      const fileItem = new FileItem(file);
      fileItem.objectURL = `http://http2.mlstatic.com/D_${variant.picture_ids[0]}-I.jpg`;



      const att : AttributesVariants = {
        id: variant.attribute_combinations[0].id,
        attribute: variant.attribute_combinations[0].name,
        value: variant.attribute_combinations[0].value_name
      };

      att

      return {
        id: variant.id.toString(),
        sku: skuProduct,
        stock: variant.available_quantity,
        regular_price: variant.price,
        sale_price: variant.price,
        images: [fileItem],
        status: variant.available_quantity > 0 ? 'active' : 'inactive',
        attributes: [att]
      } as VariantProduct;
    } )

  }
}
