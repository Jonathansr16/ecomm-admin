import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MelyProductByUserID } from '@mely/interfaces/mely-product-by-user.interface';
import {
  BodyProductResponse,
  ProductsByIdsResponse,
} from '@mely/interfaces/mely-products-by-ids.interface';
import { Observable, map } from 'rxjs';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';

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
  ): Observable<{ products: string[]; totalproducts: number }> {
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
            products: resp.results,
            totalproducts: resp.paging.total,
          };
        })
      );
  }

  //* OBTIENE LOS PRODUCTOS POR ID
  getProductsByids(ids: string[]): Observable<ProductInventory[]> {
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

  //* OBTIENE VARIANTES DE UN PRODUCTO
  getProductByVariant(id: string): Observable<VariantProduct[]> {
    return this.http.get<ProductsByIdsResponse[]>(`/items?ids=${id}`).pipe(
      map((resp) => {
        const product = resp[0];

        return product.body.variations.map((variant) => {
          return {
            id: variant.id.toString(),
            title: variant.attribute_combinations[0].value_name,
            sku: 'Sin especificar',
            units: variant.available_quantity,
            regular_price: variant.price,
            sale_price: variant.price,
            imgProduct: {
              id: variant.picture_ids[0],
              url: `http://http2.mlstatic.com/D_${variant.picture_ids[0]}-I.jpg`,
              alt: variant.attribute_combinations[0].value_name,
            },
            status: variant.available_quantity > 0 ? 'active' : 'inactive',
          };
        });
      })
    );
  }

  transformProduct(product: BodyProductResponse): ProductInventory {
    let skuProduct = 'Sin definir';
    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    });

    return {
      id: product.id,
      title: product.title,
      sku: skuProduct,
      store: 'mely',
      regular_price: product.original_price || product.price,
      sale_price: product.price,
      isFulfillment:
        product.shipping.logistic_type === 'fulfillment' ? true : false,
      units: product.available_quantity,
      status: product.status === 'active' ? 'active' : 'inactive',

      imageProduct: {
        url: product.thumbnail,
        alt: product.thumbnail_id,
      },
      isDropdownInformation: product.variations.length > 0,
      channel: 'mely',
      variations: this.transformVarProduct(product),
    };
  }

  transformVarProduct(product: BodyProductResponse): VariantProduct[] {
    let skuProduct = 'Sin definir';

    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    });

    return product.variations.map((variant) => ({
      id: variant.id.toString(),
      title: variant.attribute_combinations[0].value_name,
      sku: skuProduct,
      units: variant.available_quantity,
      regular_price: variant.price,
      sale_price: variant.price,
      imgProduct: {
        id: variant.picture_ids[0],
        url: `http://http2.mlstatic.com/D_${variant.picture_ids[0]}-I.jpg`,
        alt: variant.attribute_combinations[0].value_name,
      },
      status: variant.available_quantity > 0 ? 'active' : 'inactive',
    }));
  }
}
