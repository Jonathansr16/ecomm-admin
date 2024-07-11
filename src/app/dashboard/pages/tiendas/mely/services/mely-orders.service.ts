import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MelyOrders, MelyResult } from '@mely/interfaces/mely-orders.interface';
import {
  BodyProductResponse,
  ProductsByIdsResponse,
} from '@mely/interfaces/mely-products-by-ids.interface';
import { MelyShipping } from '@mely/interfaces/mely-shipment.interface';
import { Observable, map, tap } from 'rxjs';
import { Shipping } from 'src/app/core/interface/order-details.interface';
import { Orders, ProductOrder, ProductVariant } from 'src/app/core/interface/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class MelyOrdersService {
  private readonly http = inject(HttpClient);
  productByOrder: ProductOrder[] = [];
  idProductByOrder = new Set<string>();

  //* OBTIENE TODAS LAS ORDENES
  getOrders(
    limit: number,
    offset: number,
    sort: string
  ): Observable<{ orders: MelyOrders; totalOrders: number }> {
    let params = new HttpParams()
      .append('limit', limit)
      .append('offset', offset)
      .append('sort', sort);

    return this.http
      .get<MelyOrders>('/orders/search?seller=87159847', { params })
      .pipe(
        map((resp) => {
          return {
            orders: resp,
            totalOrders: resp.paging.total,
          };
        })
      );
  }

  //* OBTIENE LOS ID DE CADA PRODUCTO EN CADA ORDEN
  getProductByIdOrder(): Observable<ProductOrder[]> {
    const idString = Array.from(this.idProductByOrder).join(',');

    return this.http
      .get<ProductsByIdsResponse[]>(`/items?ids=${idString}`)
      .pipe(
        map((resp) => {
          return resp.map((item) => this.transformProductOrder(item.body));
        }),
       
      );
  }

  //* OBTIENE LAS ORDENES POR ESTATUS
  getOrdersByStatus(
    status: string,
    sort: string,
    tag: string[],
    limit: number,
    offset: number
  ): Observable<{ orders: Orders[]; totalOrders: number }> {
    let params = new HttpParams()
      .append('sort', sort)
      .append('limit', limit)
      .append('offset', offset);

    const tags = tag.join(',');

    return this.http
      .get<MelyOrders>(
        `/orders/search?seller=87159847&order.status=${status}&order.tag=${tags}`,
        { params }
      )
      .pipe(
        map((resp) => {
          return {
            orders: resp.results.map((order) => this.transformOrder(order)),
            totalOrders: resp.paging.total,
          };
        })
      );
  }

  //*OBTIENE EL HISTORIAL DE ENVIO DE CADA ORDEN
  getInfoHistory(idProduct: string): Observable<Shipping> {
    return this.http
      .get<MelyShipping>(`/orders/${idProduct}/shipments`)
      .pipe(map((resp) => this.transformShipmentOrder(resp)));
  }

  transformProductOrder(product: BodyProductResponse): ProductOrder {
    let skuProduct = 'Sin definir';
    let variante: ProductVariant[] = [];
    

    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    });

  
    if(product.variations) {
      product.variations.forEach( (variant, index) => {
        variante[index] = {
          id: variant.id,
          attribute: variant.attribute_combinations[0].name,
          value: variant.attribute_combinations[0].value_name,
          image: {
            src: `http://http2.mlstatic.com/D_${variant.picture_ids[0]}-I.jpg`,
            alt:variant.attribute_combinations[0].value_name
          }
        }

      });


    } else {
      variante = [];
    }

    return {
      id: product.id,
      product: product.title,
      sku: skuProduct,
      total_product: product.price,
      isFulfiment:
        product.shipping.logistic_type === 'fulfillment' ? true : false,
      image: {
        src: product.thumbnail,
        alt: product.title,
      },

      variations: variante
      
    };
  }

  transformOrder(order: MelyResult): Orders {
    const item = order.payments[0];
    let statuOrder:
      | 'Pendiente'
      | 'En Proceso'
      | 'Concretado'
      | 'En Devolucion'
      | 'No Concretada' = 'En Proceso';
    let product: ProductOrder = {
      id: '',
      product: '',
      sku: '',
      total_product: 0,
      quantity: 0,
      image: {
        src: '',
      },
      isFulfiment: false,
    };

   let isFulfilled = false;
   let variante: ProductVariant | undefined;

    this.productByOrder.forEach((producto, index) => {
     
      if (order.order_items[0].item.id === producto.id) {
        product = {
          id: producto.id,
          product: producto.product,
          sku: producto.sku,
          total_product: producto.total_product,
          image: {
            src: producto.image!.src,
            alt: producto.image?.alt,
          },
          isFulfiment: producto.isFulfiment,
        };

        isFulfilled = producto.isFulfiment ? true : false;
      }  
    });

    


    if (
      item.status === 'approved' &&
      order.tags.includes('paid') &&
      order.tags.includes('not_delivered')
    ) {
      statuOrder = 'Pendiente';
    } else if (
      item.status === 'approved' &&
      order.tags.includes('paid') &&
      order.tags.includes('not_delivered') &&
      order.tags.includes('pack_order')
    ) {
      statuOrder = 'En Proceso';
    } else if (
      item.status === 'approved' &&
      order.tags.includes('paid') &&
      order.tags.includes('delivered')
    ) {
      statuOrder = 'Concretado';
    } else if (
      item.status === 'refunded' &&
      order.tags.includes('not_paid') &&
      order.tags.includes('not_delivered')
    ) {
      statuOrder = 'No Concretada';
    } else if (
      item.status === 'in_mediation' &&
      order.tags.includes('paid') &&
      order.tags.includes('delivered')
    ) {
      statuOrder = 'En Devolucion';
    }

    return {
      id:
        order.pack_id !== null ? order.pack_id.toString() : order.id.toString(),
      noOrder: order.id.toString(),
      status: statuOrder,
      date_created: item.date_created,
      authorization_date: item.date_last_modified,
      isFulfillment: isFulfilled,
      total_order: order.total_amount,
      channel: 'mely',
      products: [product],
      variation: variante,
    
    };
  }

  transformShipmentOrder(shipment: MelyShipping): Shipping {
    return {
      client: shipment.receiver_address.receiver_name,
      address: shipment.receiver_address.street_name,
      cp: shipment.receiver_address.zip_code,
      city: shipment.receiver_address.city.name!,
      country: shipment.receiver_address.country.name!,
      references: shipment.receiver_address.comment,
    };
  }
}
