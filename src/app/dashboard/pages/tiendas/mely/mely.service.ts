import { Injectable, inject } from '@angular/core';
import { ProductsSellerResponse, ResultResponse } from '@mely/interfaces/products.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ProductInventory } from '@components/interfaces/product.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BodyProductResponse, ProductsByIdsResponse} from './interfaces/products-by-ids.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { OrdersResponse, Result } from './interfaces/orders.interface';
import { ProductsByUserResponse } from './interfaces/product-by-user.interface';


@Injectable({
  providedIn: 'root'
})
export class MelyService {

 private readonly http = inject(HttpClient);


  constructor() { }

 
  //*Obtiene los productos por vendedor
  getProductsBySeller(page: number, per_page: number): Observable<{ products: ProductInventory[], idProducts: string[], totalProducts: number}> {
    let params = new HttpParams()
    .append('offset', page)
    .append('limit', per_page);

    return this.http.get<ProductsSellerResponse>('https://api.mercadolibre.com/sites/MLM/search?seller_id=87159847', {params}).pipe(
       map( ( resp) => {
        const products = resp.results.map( (item) => this.transformData(item));

      const id =  products.map( (product) =>  product.id)
        return {
          products: products,
          idProducts: id,
          totalProducts: resp.paging.total,
        };
       }),
      
       
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
      isDropdownInformation: true,
      channel: 'mely'
    }
  }

  getProductsByUser(): Observable<{ idProducts: string[], totalProducts: number }> {

    return this.http.get<any>('/users/87159847/items/search').pipe(
      map((resp) => {

        
        return {
          idProducts: resp.results,
          totalProducts: resp.paging.total
        }
      }),
      catchError((error) => {
        console.error('Error fetching products by user:', error);
        // Manejar el error aquí, por ejemplo, devolver un valor predeterminado o lanzar una nueva excepción
        return of({ idProducts: [], totalProducts: 0 }); // Devolver un valor predeterminado
        // O podrías lanzar una nueva excepción
        // return throwError('Error fetching products by user');
      })
    );
  }

//* OBTIENE LOS PRODUCTOS POR ID
  getProductsByids(ids: string[]): Observable<ProductInventory[]> {

    let params = new HttpParams()
    .append('orders', 'sold_quantity_desc')
    const idString = ids.join(',')
      return this.http.get<ProductsByIdsResponse[]>(`https://api.mercadolibre.com/items?ids=${ids}`, {params}).pipe(
        map( (resp) => {
          return resp.map(item => this.transformProduct(item.body));
        }),
 
      )
  }


//* OBTIENE LAS ORDENES
  getOrders(limit: number, offset: number, sort: string ): Observable<{orders: Orders[], totalOrders: number}> {
    let params = new HttpParams()
    .append('limit', limit)
    .append('offset', offset)
    .append('sort', sort)

   return this.http.get<OrdersResponse>('/orders/search?seller=87159847', {params}).pipe(
      map( (resp) => {
        return {
          orders: resp.results.map( (item) =>  this.transformOrder(item)),
          totalOrders: resp.paging.total
        }
      }),
      tap( (item) => console.log(item))
    )
  }

  //* OBTIENE UNA ORDEN ESPECIFICA


  transformProduct(product: BodyProductResponse): ProductInventory {
  let skula = 'Sin definir';
  product.attributes.forEach( (item) => {
    if(item.id === 'SELLER_SKU')  {
      skula = item.values[0].name!;
    }

  });

    return {
    id: product.id,
    title: product.title,
    sku: skula,
    store: 'mely',
    sale_price: product.price,
    isFulfillment: product.shipping.logistic_type === 'fulfillment' ? true : false,
    units: product.available_quantity,
    status: product.status === 'active' ? 'active' : 'inactive',
    total_sales: product.sold_quantity,
    imagesProduct: product.thumbnail,
    isDropdownInformation: true,
    channel: 'mely'
    }
  }

  transformOrder(order: Result ): Orders {

    let statuOrder: 'Pendiente' | 'En Proceso' | 'Concretado' | 'En Devolucion' | 'No Concretada' = 'En Proceso';
    const orderStatus = order.tags.forEach( (tag) => {

      if(tag === 'not_paid' && 'not_delivered') {
       statuOrder = 'No Concretada';
      } else if(tag === 'paid' && 'not_delivered') {
      statuOrder = 'En Proceso'
      } else if(tag === 'paid' && 'delivered') {
        statuOrder = 'Concretado';
      } 
      
    });

    return {
      id: order.id,
      noOrder: order.id.toString(),
      status: statuOrder,
      date_created: order.payments[0].date_created,
      authorization_date: order.payments[0].date_last_modified,
      fulfillment: false,
      total_order: order.total_amount,
      channel: 'mely',
      products: order.order_items.map( (item) => {
        return {
          product: item.item.title,
          sku: item.item.seller_sku,
          total_product: item.unit_price,
          quantity: item.quantity,
       
        }

      })

    }
  }


}


