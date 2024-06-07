import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BodyProductResponse,
  ProductsByIdsResponse,
} from './interfaces/mely-products-by-ids.interface';
import { Orders, ProductOrder } from 'src/app/core/interface/orders.interface';
import { MelyOrders, MelyResult } from './interfaces/mely-orders.interface';
import { MelyProductByUserID } from './interfaces/mely-product-by-user.interface';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';
import {
  MelyAsk,
  MelyAskProduct,
  MelyAskResult,
  Question,
} from './interfaces/mely-ask.interface';
import { OrderDetails, Shipping } from 'src/app/core/interface/order-details.interface';
import { MelyShipping } from './interfaces/mely-shipment.interface';

@Injectable({
  providedIn: 'root',
})
export class MelyService {
  private readonly http = inject(HttpClient);
  idProductByOrder = new Set<string>();
  productByOrder: ProductOrder[] = [];
  idProductByQuestion = new Set<string>();
  productByQuestion: MelyAskProduct[] = [];

  constructor() {}

  //*Obtiene los productos  por usuario
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

  //* OBTIENE LOS ID DE CADA PRODUCTO EN CADA ORDEN
  getProductByIdOrder(): Observable<ProductOrder[]> {
    const idString = Array.from(this.idProductByOrder).join(',');

    return this.http
      .get<ProductsByIdsResponse[]>(`/items?ids=${idString}`)
      .pipe(
        map((resp) => {
          return resp.map((item) => this.transformProductOrder(item.body));
        })
      );
  }


  //* OBTIENE LA ORDEN POR ID 
  // getOrderById(orderId: number): Observable<Orders> {
  //   return this.http.get<MelyOrders>(`/orders/search?seller=87159847&q=${orderId}`).pipe( 
  //      map( (resp) => this.transformOrder(resp.results))
    
  //   )
  // }

  //*OBTIENE EL HISTORIAL DE ENVIO DE CADA ORDEN
  getInfoHistory(idProduct: string): Observable<Shipping> {
    return this.http.get<MelyShipping>(`/orders/${idProduct}/shipments`).pipe(
      map( (resp) =>  this.transformShipmentOrder(resp))
    )
  }

  //* OBTIENE LOS ID DEL PRODUCTO DE CADA PREGUNTA
  getProductAsk(): Observable<MelyAskProduct[]> {
    let params = new HttpParams().append('orders', 'sold_quantity_desc');

    const idString = Array.from(this.idProductByQuestion).join(',');

    return this.http
      .get<ProductsByIdsResponse[]>(`/items?ids=${idString}`, { params })
      .pipe(
        map((resp) => {
          return resp.map((item) => this.transformProductAsk(item.body));
        })
      );
  }

  //* OBTIENE LAS PREGUNTAS
  getAsk(
    sort_fields: string,
    sort_types: 'ASC' | 'DESC',
    limit: number,
    offset: number
  ): Observable<{ ask: MelyAsk; totalAsk: number }> {
    let params = new HttpParams()
      .append('sort_fields', sort_fields)
      .append('sort_types', sort_types)
      .append('limit', limit)
      .append('offset', offset);

    return this.http
      .get<MelyAsk>('/my/received_questions/search', { params })
      .pipe(
        map((resp) => {
          return {
            ask: resp,
            totalAsk: resp.total,
          };
        })
      );
  }

  //* TRANSFORM DATA OF API
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

  transformProductOrder(product: BodyProductResponse): ProductOrder {
    let skuProduct = 'Sin definir';

    product.attributes.forEach((item) => {
      if (item.id === 'SELLER_SKU') {
        skuProduct = item.values[0].name!;
      }
    });

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

    let isFul = false;

    this.productByOrder.forEach((item, index) => {
      if (order.order_items[0].item.id === item.id) {
        product = {
          id: item.id,
          product: item.product,
          sku: item.sku,
          total_product: item.total_product,
          image: {
            src: item.image!.src,
            alt: item.image?.alt,
          },
          isFulfiment: item.isFulfiment,
        };

        isFul = item.isFulfiment!;
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
      isFulfillment: isFul,
      total_order: order.total_amount,
      channel: 'mely',
      products: [product],
    };
  }

  transformProductAsk(product: BodyProductResponse): MelyAskProduct {
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
      isFulfillment:
        product.shipping.logistic_type === 'fulfillment' ? true : false,
      img: {
        id: product.thumbnail_id,
        url: product.thumbnail,
        alt: product.title,
      },
      price: product.price,
      status: product.status === 'active' ? 'active' : 'inactive',
    };
  }

  transformQuestion(question: Question): MelyAskResult {
    let product: MelyAskProduct = {
      id: '',
      title: '',
      sku: '',
      price: 0,
      status: '',
      img: {
        id: '',
        url: '',
        alt: '',
      },
      isFulfillment: false,
    };

    this.productByQuestion.forEach((item) => {
      if (question.item_id === item.id) {
        product = {
          id: item.id,
          title: item.title,
          sku: item.sku,
          price: item.price,
          status: item.status,
          img: item.img,
          isFulfillment: item.isFulfillment,
        };
      }
    });

    return {
      date_created: question.date_created,
      item_id: question.item_id.toString(),
      seller_id: question.seller_id,
      status: question.status,
      text: question.text,
      tags: question.tags,
      id: question.id,
      deleted_from_listing: question.deleted_from_listing,
      hold: question.hold,
      answer: question.answer,
      from: question.from,
      question_item: product,
    };
  }

  transformShipmentOrder(shipment: MelyShipping): Shipping {

    return {
      client: shipment.receiver_address.receiver_name,
      address: shipment.receiver_address.street_name,
      cp: shipment.receiver_address.zip_code,
      city: shipment.receiver_address.city.name!,
      country: shipment.receiver_address.country.name!,
      references: shipment.receiver_address.comment
    }
  }


}
