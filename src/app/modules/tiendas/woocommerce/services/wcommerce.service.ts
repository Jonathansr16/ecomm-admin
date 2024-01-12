import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  OrderResponse,
  OrderResult,
  ProductOrderResult,
} from '@wcommerce/interface/woo-order.interface';
import { Orden } from '@wcommerce/models/wc-order.model';
import {
  ProductCategoryResponse,
  ProductImageResult,
  ProductResponse,
  ProductResult,
} from '@wcommerce/interface/woo-producto.interface';
import { WooProducto } from '@wcommerce/models/wc-new-product.model';

@Injectable()
export class WcommerceService {

  private url = 'https://servitae.mx/wp-json/wc/v3';
  statusData: 'loading' | 'success' | 'error' | undefined;

  constructor(private http: HttpClient) {}

  //* OBTIENE TODOS LOS PRODUCTOS
  getProducts(): Observable<ProductResult[]> {
    return this.http.get<ProductResponse[]>(`${this.url}/products`)
    .pipe(
      map( (resp: ProductResponse[]) =>
       resp.map( (producto: ProductResult) => ({
        id: producto.id,
        name: producto.name,
        description: producto.description,
        short_description: producto.short_description,
        sku: producto.sku,
        regular_price: producto.regular_price,
        sale_price: producto.sale_price,
        categories: producto.categories,
        images: producto.images[0],
        stock_quantity: producto.stock_quantity,
        stock_status: producto.stock_status,
        status: producto.status,
        total_sales: producto.total_sales
       }))
      ),
      tap((_) => console.log('productos buscados')),
      catchError(this.hanlerError<ProductResult[]>('getProducts', []))
    );
  }

  //* OBTIENE UN PRODUCTO EN ESPECIFICO
  getProduct(id: number): Observable<ProductResult> {
    return this.http.get<ProductResponse>(`${this.url}/products/${id}`).pipe(
      map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        short_description: product.short_description,
        sku: product.sku,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        categories: product.categories,
        images: product.images,
        stock_quantity: product.stock_quantity,
      })),
      catchError(this.hanlerError<any>('getProduct', {}))
    );
  }

  //* OBTIENE TODAS LAS CATEGORIAS CREADAS
  getCategorias(): Observable<ProductCategoryResponse[]> {
    return this.http
      .get<ProductCategoryResponse[]>(`${this.url}/categories`)
      .pipe(
        catchError(
          this.hanlerError<ProductCategoryResponse[]>('getCategorias', [])
        )
      );
  }

  //*OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(
    status: 'pending' | 'processing' | 'completed' | 'cancelled',
    totalItemsByPage?: number,
    page?: number
  ): Observable<OrderResult[]> {
    // const params = new HttpParams()
    //       .set('per_page', totalItemsByPage)
    //       .set('page', page)

    return this.http
      .get<OrderResponse[]>(`${this.url}/orders?status=${status}`)
      .pipe(
        map((resp) => {
          return resp.map((order) => {
            return new Orden(
              order.id,
              order.billing.first_name,
              order.billing.last_name,
              order.status,
              order.date_created,
              order.date_modified,
              order.total,
              order.line_items.map((product: ProductOrderResult) => ({
                name: product.name,
                quantity: product.quantity,
                total: product.total,
                sku: product.sku,
                image: product.image,
              }))
            );
          });
        }),
        catchError(this.hanlerError<OrderResult[]>('getOrderByStatus', []))
      );
  }

  //* OBTIENE LA CANTIDAD DE ORDENES
  getOrdersCount(
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
  ): Observable<{ totalCount: number }> {
    return this.http.get<any>(`${this.url}/orders?status=${status}`).pipe(
      map((resp) => {
        return { totalCount: resp.length };
      }),
      catchError(this.hanlerError<any>('getOrderCount', []))
    );
  }

  //* CREAR UN NUEVO PRODUCTO
  createProduct(producto: WooProducto): Observable<WooProducto> {
    const productData = {
      ...producto,
    };

    return this.http
      .post<WooProducto>(
        // this.queryParam('products'),
        // productData
        `${this.url}/products`,
        productData
      )
      .pipe(catchError(this.hanlerError<any>('createProduct', {})));
  }

  //* ACTUALIZA UN PRODUCTO ESPECIFICO
  setProduct(
    idProduct: number,
    producto: WooProducto
  ): Observable<WooProducto> {
    const product = {
      ...producto,
    };

    return this.http
      .post<WooProducto>(`${this.url}/products/${idProduct}`, product)
      .pipe(catchError(this.hanlerError<any>('setProduct', {})));
  }

  //*ACTUALIZA UN CAMPO ESPECIFICO
  setFielUpdate(idProduct: any, field: string): Observable<WooProducto> {
    return this.http
      .put<WooProducto>(`${this.url}/products/${idProduct}`, field)
      .pipe(catchError(this.hanlerError<any>('setFieldUpdate', {})));
  }

  //*ELIMINA UN PRODUCTO DEL INVENTARIO
  deleteProduct(idProduct: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/products/${idProduct}`)
      .pipe(catchError(this.hanlerError<any>('deleteProduct', {})));
  }

  private hanlerError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} fallo`);
      console.warn(`Mensaje de la falla: ${error.message}`);
      return of(result as T);
    };
  }
}
