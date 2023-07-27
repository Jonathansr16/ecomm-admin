import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


@Injectable({
  providedIn: 'root'
})
export class WcommerceService {

  constructor(private http: HttpClient) { }

  urlStore: string = '';
  client_key: string = '';
  secret_key: string = '';

  getQuery(query: string, consumerKey: string, consumerSecret: string) {

    const url = `${this.urlStore}/wp-json/wc/v3/${query}?`;

    const headers = new HttpHeaders({
        'consumer_key': consumerKey,
        'consumer_secret':consumerSecret
    })
    return this.http.get(url, {headers})
  }


  //* GET PRODUCTS
  // getProducts() {
  //   return this.getQuery()
  // }

}


