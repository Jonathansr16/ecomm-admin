import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';
import { ordenProducto } from 'src/app/core/interface/order-productos.interface';
import { wcProductoModel } from '../models/wc-new-product.model';
import { CategoryResponse, WcProductoResponse } from '../interface/wc-producto.interface';

@Injectable({
  providedIn: 'root',
})
export class WcommerceService {
  private url = 'https://servitae.mx/wp-json/wc/v3/';
  private consumerKey = environment.wcommerce.client_key;
  private consumerSecret = environment.wcommerce.secret_key;

  constructor(private http: HttpClient) {}

  // getQuery(query: string) {
  //   const url: string = `https://servitae.mx/wp-json/wc/v3/${query}?`;

  //   const params = new HttpParams()
  //   .set('consumer_key', this.consumerKey)
  //   .set('consumer_secret', this.consumerSecret)

  //   return this.http.get(url, { params });

  // }

  //* OBTIENE TODOS LOS PRODUCTOS
  getProductos(): Observable<WcProductoResponse[]> {
    return this.http
      .get<WcProductoResponse>(
        `${this.url}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
      )
      .pipe(
        map((data: any) =>
          data.map((producto: any) => ({
            id: producto.id,
            nombre: producto.name,
            images: producto.images[0],
            sku: producto.sku,
            precio: producto.price,
            stock: producto.stock_quantity,
            categorias: producto.categories,
          }))
        )
      );
  }


  //* OBTIENE UN PRODUCTO EN ESPECIFICO
  getProduct(id: number): Observable<WcProductoResponse> {
    return this.http.get<WcProductoResponse>(`${this.url}products/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`)
  }

  // Productos(): Observable<WcProductoResponse[]> {
  //   return this.getQuery('products')
  //     .pipe(
  //       map((data: any) =>
  //         data.map((producto: any) => ({
  //           nombre: producto.name,
  //           images: producto.images[0],
  //           sku: producto.sku,
  //           precio: producto.price,
  //           stock: producto.stock_quantity,
  //           categorias: producto.categories,
  //         }))
  //       )
  //     );
  // }


  //* OBTIENE TODAS LAS CATEGORIAS CREADAS
  getCategorias(): Observable<CategoryResponse[]> {
    return this.http
      .get<CategoryResponse>(
        `${this.url}products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
      )
      .pipe(
        map((data: any) =>
          data.map((categoria: any) => ({
            id: categoria.id,
            description: categoria.description,
            name: categoria.name,
          }))
        )
      );
  }

  //* OBTIENE LAS ORDENES
  getOrder(): Observable<any> {
    return this.http
      .get(
        `${this.url}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
      )
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  //* CREAR UN NUEVO PRODUCTO
  createProduct(producto: wcProductoModel): Observable<WcProductoResponse> {
    const productData = {
      ...producto,
    };

  
    return this.http.post<WcProductoResponse>(
      `${this.url}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`,
      productData
    );
  }


}
