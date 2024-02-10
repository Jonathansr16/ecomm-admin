import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import {
  OrderResponse,
  OrderResult,
  ProductOrderResult,
} from '@wcommerce/interface/woo-order.interface';
import { Orden } from '@wcommerce/models/wc-order.model';
import {
  ProductCategoryResponse,
  ProductImageResponse,
  ProductImageResult,
  ProductResponse,
} from '@wcommerce/interface/woo-producto.interface';
import { WooProducto } from '@wcommerce/models/wc-new-product.model';
import { ProductResult } from '@wcommerce/interface/woo-producto.interface';

@Injectable()
export class WcommerceService {

  private url = 'https://servitae.mx/wp-json/wc/v3';
  statusData: 'loading' | 'success' | 'error' | undefined;


  private cache: { [key: string]: ProductResult[] } = {};

  constructor(private http: HttpClient) { }

  //* OBTIENE TODOS LOS PRODUCTOS
  getProducts(per_page: number, page: number, offset: number): Observable<ProductResult[]> {
    const cacheKey = `${per_page}-${page}-${offset}`;
    const cachedData = this.cache[cacheKey];
    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get<ProductResponse[]>(`${this.url}/products?per_page=${per_page}&page=${page}&offset=${offset}`)
        .pipe(
          map(this.transformDataProduct),
          tap({
            next: ((data) => this.cache[cacheKey] = data),

          }),

          catchError(this.hanlerError<ProductResult[]>(`getProducts`, []))
        );
    }
  }

  transformDataProduct(resp: ProductResponse[]): ProductResult[] {
    return resp.map((producto: ProductResult) => ({
      id: producto.id,
      name: producto.name,
      description: producto.description,
      short_description: producto.short_description,
      sku: producto.sku,
      regular_price: producto.regular_price,
      sale_price: producto.sale_price,
      categories: producto.categories,
      images: producto.images.map((img: ProductImageResult) => ({
        ...img
      })),
      stock_quantity: producto.stock_quantity,
      stock_status: producto.stock_status,
      status: producto.status,
      total_sales: producto.total_sales
    }))
  }


  getTotalProduct(): Observable<{ totalRecords: number }> {
    return this.http.get<ProductResponse[]>(`${this.url}`).pipe(
      map((resp) => { return { totalRecords: resp.length } }),
      tap((resp) => console.log(resp))
    )
  }

  // //* OBTIENE LA CANTIDAD DE ORDENES
  // getOrdersCount(
  //   status: 'pending' | 'processing' | 'completed' | 'cancelled'
  // ): Observable<{ totalCount: number }> {
  //   return this.http.get<any>(`${this.url}/orders?status=${status}`).pipe(
  //     map((resp) => {
  //       return { totalCount: resp.length };
  //     }),
  //     catchError(this.hanlerError<any>('getOrderCount', []))
  //   );
  // }

  //* OBTIENE PRODUCTOS RELACIONADOS CON LA BUSQUEDA
  getProductsBySearch(searchValue: string, page: number, itemsPerPage: number): Observable<ProductResult[]> {
    const query = `?page=${page}&per_page=${itemsPerPage}`;
    return this.http.get<ProductResponse[]>(`${this.url}/products${query}`).pipe(
      map(products => this.filterProducts(products, searchValue)),

    );
  }

  private filterProducts(products: ProductResponse[], searchValue: string): ProductResult[] {
    return products.filter(product => {
      // Filtrar por id, nombre o SKU
      return (
        product.id.toString().includes(searchValue.toLocaleLowerCase()) || // Búsqueda por id
        product.name.toLowerCase().includes(searchValue.toLowerCase()) || // Búsqueda por nombre (case-insensitive)
        product.sku.toLowerCase().includes(searchValue.toLowerCase()) // Búsqueda por SKU (case-insensitive)
      );
    }).map(this.transformDataProduc);
  }

  private transformDataProduc(producto: ProductResponse): ProductResult {
    // Aquí puedes realizar cualquier transformación necesaria de los datos del producto
    // Por ejemplo, mapear los datos a una interfaz diferente si es necesario
    return {
      id: producto.id,
      name: producto.name,
      description: producto.description,
      short_description: producto.short_description,
      sku: producto.sku,
      regular_price: producto.regular_price,
      sale_price: producto.sale_price,
      categories: producto.categories,
      images: producto.images.map((img: ProductImageResult) => ({
        ...img
      })),
      stock_quantity: producto.stock_quantity,
      stock_status: producto.stock_status,
      status: producto.status,
      total_sales: producto.total_sales

      // Otras propiedades del producto que quieras incluir
    };
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
