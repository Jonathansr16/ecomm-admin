import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BodyProductResponse,
  ProductsByIdsResponse,
} from './interfaces/mely-products-by-ids.interface';
import {
  MelyAsk,
  MelyAskProduct,
  MelyAskResult,
  MelyQuestion,
} from './interfaces/mely-ask.interface';

@Injectable({
  providedIn: 'root',
})
export class MelyService {
  private readonly http = inject(HttpClient);
  idProductByQuestion = new Set<string>();
  productByQuestion: MelyAskProduct[] = [];

  constructor() {}

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
      product_status: product.status === 'active' ? 'active' : 'inactive',
    };
  }

  transformQuestion(question: MelyQuestion): MelyAskResult {
    let product: MelyAskProduct = {
      id: '',
      title: '',
      sku: '',
      price: 0,
      product_status: 'active',
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
          product_status:
            item.product_status === 'active' ? 'active' : 'inactive',
          img: item.img,
          isFulfillment: item.isFulfillment,
        };
      }
    });

    return {
      date_created: question.date_created,
      item_id: question.item_id.toString(),
      seller_id: question.seller_id,
      question_status: question.status,
      question: question.text,
      tags: question.tags,
      id: question.id,
      deleted_from_listing: question.deleted_from_listing,
      hold: question.hold,
      answer: question.answer,
      from: question.from,
      question_item: product,
    };
  }
}
