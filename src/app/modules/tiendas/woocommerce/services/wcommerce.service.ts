import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';
import { ordenProducto } from 'src/app/core/interface/order-productos.interface';



@Injectable({
  providedIn: 'root'
})
export class WcommerceService {

 private url = 'https://servitae.org/wp-json/wc/v3/';
 private  consumerKey = environment.wcommerce.client_key;
 private  consumerSecret =environment.wcommerce.secret_key;
 
  constructor(private http: HttpClient) {

   }

  getQuery( query: string) {

   const url:string = `wp-json/wc/v3/${query}?`

    const headers = new HttpHeaders({
      'consumer_key': environment.wcommerce.client_key,
      'consumer_secret': environment.wcommerce.secret_key,
    });
    return this.http.get(url, {headers});
  }

  getProducts() {

    return this.getQuery('products');
  }

//* OBTIENE TODOS LOS PRODUCTOS
  Productos(): Observable<ProductosTable> {



 return this.http.get(`${this.url}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`,)
 .pipe(
  map( (data: any) => data.map( (producto: any) => (
    {
    nombre: producto.name,
    images: producto.images[0],
    sku: producto.sku,
    precio: producto.price,
    stock: producto.stock_quantity
  }
    )
  )));
 }

 //* OBTIENE LAS ORDENES 
 getOrder(): Observable<any>  {
  
  return this.http.get(`${this.url}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`,)
  .pipe(
    map( resp => {
      return resp;
    })
  )
  
 }

}