import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductsSellerResponse, ResultResponse } from '@mely/interfaces/products.interface';
import { environment } from '../../../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { ProductInventory } from '@components/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class MelyService {

 private readonly http = inject(HttpClient);
 private readonly url = environment.mely.url;
private readonly token = environment.mely.access_tokem;
  constructor() { }

  getQuery(query: string, params: HttpParams) {
    const url = `${this.url}/${query}`;

    const headers = new HttpHeaders({
     'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(url, {headers, params})
  }
  //*Obtiene los productos por vendedor
  getProductBySeller(page: number, per_page: number): Observable<{ products: ProductInventory[], totalRecords: number}> {

    let params = new HttpParams()
    .append('offset', page)
    .append('limit', per_page);

    return this.getQuery('/sites/MLM/search?seller_id=87159847', params).pipe(
       map( ( resp: any) => {
        return {
          products: resp.results.map( (item: any) => this.transformData(item)),
          totalRecords: resp.paging.total
        }
       })
      )



  }

  transformData(product: ResultResponse): ProductInventory {

    return {
      id: product.id,
      title: product.title,
      sku: product.inventory_id || 'No incluido',
      store: 'mely',
      regular_price: product.price,
      sale_price: product.price,
      imagesProduct: [product.thumbnail],
      status: 'active',
      units: product.available_quantity,
      isDropdownInformation: false
    }
  }

}
