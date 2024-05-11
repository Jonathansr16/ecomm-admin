import { Injectable, inject } from '@angular/core';
import { ProductsSellerResponse, ResultResponse } from '@mely/interfaces/mely-products.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BodyProductResponse, ProductsByIdsResponse, Shipping } from './interfaces/mely-products-by-ids.interface';
import { Orders } from 'src/app/core/interface/orders.interface';
import { MelyOrders, MelyResult } from './interfaces/mely-orders.interface';
import { MelyProductByUserID } from './interfaces/mely-product-by-user.interface';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';


@Injectable({
  providedIn: 'root'
})
export class MelyService {

  private readonly http = inject(HttpClient);

  constructor() { }

  //*Obtiene los productos por vendedor por usuario
  getProductsByUserId(orders: string, limit: number, offset: number): Observable<{ products: string[], totalproducts: number }> {

    let params = new HttpParams()

      .append('orders', orders)
      .append('limit', limit)
      .append('offset', offset)

    return this.http.get<MelyProductByUserID>('/users/87159847/items/search?filters=paused&filters=active', { params }).pipe(
      map((resp) => {

        return {
          products: resp.results,
          totalproducts: resp.paging.total
        }
      })
    )
  }

  //* OBTIENE LOS PRODUCTOS POR ID
  getProductsByids(ids: string[]): Observable<ProductInventory[]> {

    let params = new HttpParams()
      .append('orders', 'sold_quantity_desc')
    const idString = ids.join(',')
    return this.http.get<ProductsByIdsResponse[]>(`/items?ids=${ids}`, { params }).pipe(
      map((resp) => {
        return resp.map(item => this.transformProduct(item.body));
      }),

    )
  }

  //* OBTIENE TODAS LAS ORDENES
  getOrders(limit: number, offset: number, sort: string): Observable<{ orders: Orders[], totalOrders: number }> {
    let params = new HttpParams()
      .append('limit', limit)
      .append('offset', offset)
      .append('sort', sort)

    return this.http.get<MelyOrders>('/orders/search?seller=87159847', { params }).pipe(
      map((resp) => {
        return {
          orders: resp.results.map((item) => this.transformOrder(item)),
          totalOrders: resp.paging.total
        }
      }),
      tap((item) => console.log(item))
    )
  }

  //* OBTIENE LAS ORDENES POR ESTATUS
  getOrdersByStatus(limit: number, offset: number, sort: string, status: string): Observable<{ orders: Orders[], totalOrders: number }> {
    let params = new HttpParams()
      .append('limit', limit)
      .append('offset', offset)
      .append('sort', sort)
      .append('order.tag', status)

    return this.http.get<MelyOrders>('/orders/search?seller=87159847', { params }).pipe(

      map((resp) => {
        return {
          orders: resp.results.map((order) => this.transformOrder(order)),
          totalOrders: resp.paging.total
        }
      })
    )
  }

  //* OBTIENE UNA ORDEN ESPECIFICA
  // getOrder(idOrder: string) : Observable<OrderDetails> {
  //   return this.http.get<MelyOrders>(`/orders/search?seller=87159847&q=${idOrder}`).pipe(
  //     map( (resp) => this.transformOrder(resp.results[0]))
  //   )
  // }

  transformProduct(product: BodyProductResponse): ProductInventory {
    let skula = 'Sin definir';
    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
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
      isDropdownInformation: product.variations.length > 0,
      channel: 'mely'
    }
  }

  transformOrder(order: MelyResult): Orders {

    const item = order.payments[0];
    let statuOrder: 'Pendiente' | 'En Proceso' | 'Concretado' | 'En Devolucion' | 'No Concretada' = 'En Proceso';

    if (item.status === 'approved' && order.tags.includes("paid") && order.tags.includes("not_delivered")) {
      statuOrder = 'En Proceso';
    } else if (item.status === 'approved' && order.tags.includes("paid") && order.tags.includes("delivered")) {
      statuOrder = 'Concretado'
    } else if (item.status === 'refunded' && order.tags.includes("not_paid") && order.tags.includes("not_delivered")) {
      statuOrder = 'No Concretada';
    } else if (item.status === 'in_mediation' && order.tags.includes("paid") && order.tags.includes("delivered")) {
      statuOrder = 'En Devolucion';
    }


    return {
      id: order.pack_id !== null ? order.pack_id.toString() : order.id.toString(),
      noOrder: order.id.toString(),
      status: statuOrder,
      date_created: item.date_created,
      authorization_date: item.date_last_modified,
      fulfillment: false,
      total_order: order.total_amount,
      channel: 'mely',
      products: order.order_items.map((item) => {
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


