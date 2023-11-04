import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { wcProductoModel } from '../models/wc-new-product.model';
import { CategoryResponse, WcProductoResponse } from '../interface/wc-producto.interface';
import { PedidosResponse } from '@wcommerce/interface/wcommerce-pedidos.interface';

@Injectable({
  providedIn: 'root',
})
export class WcommerceService {
  private url = 'https://servitae.mx/wp-json/wc/v3/';
  private consumerKey = environment.wcommerce.client_key;
  private consumerSecret = environment.wcommerce.secret_key;

  constructor(private http: HttpClient) { }

  //* OBTIENE TODOS LOS PRODUCTOS
  getProducts(): Observable<WcProductoResponse[]> {
    return this.http.get<WcProductoResponse>(
      `${this.url}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
    ).pipe(
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
    return this.http.get<WcProductoResponse>(
      `${this.url}products/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`).pipe(
     map((product: WcProductoResponse) => ({
      id:                    product.id,
      name:                  product.name,
      description:           product.description,
      short_description:     product.short_description,
      sku:                   product.sku,
      regular_price:         product.regular_price,
      sale_price:            product.sale_price,
      total_sales:           product.total_sales,
      categories:            product.categories,
      images:                product.images,
      stock_quantity:        product.stock_quantity,
      stock_status:          product.stock_status,
      }))
    );
  }

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
  getOrder(): Observable<PedidosResponse[]> {
    return this.http
      .get<PedidosResponse>(
        `${this.url}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
        ).pipe(
          map((data: any) =>
            data.map((order: any) => ({
              id_order: order.id,
              date_created: order.date_created,
              first_name: order.billing.first_name,
              last_name: order.billing.last_name,
              status: order.status,
              date_modified: order.date_modified,
              product: order.line_items[0].name,
              img: order.line_items[0].image.src,
              sku: order.line_items[0].sku,
              price: order.line_items[0].price,
              quantity: order.line_items[0].quantity
            }))
          )
        );
     
  }


  //*OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(status: 'pending' | 'processing' | 'completed' | 'cancel'): Observable<PedidosResponse[]> {

   return this.http.get<PedidosResponse>(`${this.url}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&status=${status}`)
   .pipe(
    map((data: any) =>
      data.map((order: any) => ({
        id_order: order.id,
        date_created: order.date_created,
        first_name: order.billing.first_name,
        last_name: order.billing.last_name,
        status: order.status,
        date_modified: order.date_modified,
        product: order.line_items[0].name,
        img: order.line_items[0].image.src,
        sku: order.line_items[0].sku,
        price: order.line_items[0].price,
        quantity: order.line_items[0].quantity
      }), console.log(data))
    )
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

  //* ACTUALIZA UN PRODUCTO ESPECIFICO
  setProduct(idProduct: number, producto: wcProductoModel): Observable<WcProductoResponse> {
    const product = {
      ...producto
    };

    return this.http.post<WcProductoResponse>(
      `${this.url}products/${idProduct}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`, product
    )

  }

  //*ACTUALIZA UN CAMPO ESPECIFICO 
  setFielUpdate(idProduct: any, field: string): Observable<WcProductoResponse> {

    return this.http.put<WcProductoResponse>(`${this.url}products/${idProduct}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`, field)
  }

  // getQuery(query: string) {
  //   const url: string = `https://servitae.mx/wp-json/wc/v3/${query}?`;

  //   const params = new HttpParams()
  //   .set('consumer_key', this.consumerKey)
  //   .set('consumer_secret', this.consumerSecret)

  //   return this.http.get(url, { params });

  // }

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

}
