import { inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WooProducto } from '@woocommerce/models/wc-new-product.model';
import { environment } from 'src/environments/environment.development';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { Orders } from 'src/app/core/interface/orders.interface';

import * as CryptoJS from 'crypto-js';
import {
  WooProduct,
  WooProductCategory,
  WooProductImage,
  WooProductResult,
} from '@woocommerce/interface/woo-producto.interface';
import { WooOrders } from '@woocommerce/interface/woo-order.interface';

export class WooService {
  private readonly url = environment.wcommerce.apiBase;
  // private cachedDataPage: { [key: string]: any[] } = {};
  totalItems: number = 0;
  totalOrders: number = 0;

  private readonly http = inject(HttpClient);

  //* OBTIENE TODOS LOS PRODUCTOS
  // getProducts(page: number, per_page: number): Observable<{ products: ProductInventory[], totalRecords: number }> {
  //   const cacheKey = `${page}-${per_page}`;
  //   const cachedData = this.cachedDataPage[cacheKey];

  //   let params = new HttpParams()
  //     .append('page', page.toString())
  //     .append('per_page', per_page.toString());

  //   if (cachedData) {
  //     return of(
  //       {
  //         products: cachedData,
  //         totalRecords: this.totalItems
  //       }

  //       );

  //   } else {
  //     return this.http.get<ProductResponse[]>(`${this.url}/products`, { params, observe: 'response' })
  //       .pipe(
  //         map((response: HttpResponse<ProductResponse[]>) => {
  //           const products = response.body; // Datos de los productos
  //           const totalRecords = response.headers.get('X-WP-Total'); // Cantidad de registros
  //           this.totalItems = totalRecords ? +totalRecords : 0;
  //           return {
  //             products: products ? this.transformDataProduct(products) : [],
  //             totalRecords: this.totalItems
  //           };

  //         }),
  //         tap(data => {
  //           this.cachedDataPage[cacheKey] = data.products;

  //           // Limpiar caché si se excede un límite de almacenamiento, por ejemplo, 100 páginas
  //           if (Object.keys(this.cachedDataPage).length > 20) {
  //             delete this.cachedDataPage[Object.keys(this.cachedDataPage)[0]];
  //           }
  //         }),
  //         catchError(error => {
  //           console.error('Error al obtener productos', error);
  //           return of({ products: [], totalRecords: 0 }); // Manejar el error devolviendo un objeto vacío
  //         })
  //       );
  //   }
  // }
//* OBTIENE LOS PRODUCTOS
  getProducts(page: number, per_page: number): 
  Observable<{ products: ProductInventory[]; totalProducts: number }> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('per_page', per_page.toString());

    return this.http.get<WooProduct[]>(`${this.url}/products`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<WooProduct[]>) => {
          const products = response.body; // Datos de los productos
          const totalRecords = response.headers.get('X-WP-Total'); // Cantidad de registros
          this.totalItems = totalRecords ? +totalRecords : 0;
          return {
            products: products ? products.map( (item) => this.transformDataProduct(item)) : [],
            totalProducts: this.totalItems,
          };
        }),

        catchError((error) => {
          console.error('Error al obtener productos', error);
          return of({ products: [], totalProducts: 0 }); // Manejar el error devolviendo un objeto vacío
        })
      );
  }

  transformDataProduct(producto: WooProduct): ProductInventory {

    return {
      id: producto.id,
      title: producto.name,
      description: producto.description,
      short_description: producto.short_description,
      sku: producto.sku,
      store: 'woocommerce',
      regular_price: parseFloat(producto.price),
      sale_price: parseFloat(producto.regular_price),
      units: producto.stock_quantity,
      category: producto.categories,
      imagesProduct: producto.images,
      status:
        producto.stock_quantity > 0 || producto.stock_status === 'instock'
          ? 'active'
          : 'inactive',
      isDropdownInformation: false,
      channel: 'woocommerce',
    }
  }

  //* OBTIENE PRODUCTOS RELACIONADOS CON LA BUSQUEDA
  getProductsBySearch(
    searchedValue: string,
    page: number,
    itemsPerPage: number,
    typeSearch: 'todo' | 'id' | 'title' | 'sku'
  ): Observable<{ products: ProductInventory[]; totalProducts: number }> {
    const query = `?page=${page}&per_page=${itemsPerPage}`;
    return this.http
      .get<WooProduct[]>(`${this.url}/products${query}`, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<WooProduct[]>) => {
          const products = response.body ? response.body : []; // Datos de los productos
          const filteredProducts = products.filter((product) => {
            switch (typeSearch) {
              case 'todo':
                return (
                  product.id
                    .toString()
                    .includes(searchedValue.toLowerCase().trim()) ||
                  product.name
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim()) ||
                  product.sku
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim())
                );
              case 'id':
                return product.id
                  .toString()
                  .includes(searchedValue.toLowerCase().trim());
              case 'title':
                return product.name
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase().trim());
              case 'sku':
                return product.sku
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase().trim());
              default:
                return true; // Por defecto, retornar todos los productos
            }
          });
          return {
            products: filteredProducts.map( (product) => this.transformDataProduct(product)),
            totalProducts: filteredProducts.length,
          };
        })
      );
  }

  //* OBTIENE UN PRODUCTO EN ESPECIFICO
  getProduct(id: number): Observable<WooProductResult> {
    return this.http.get<WooProduct>(`${this.url}/products/${id}`).pipe(
  
      map( (product) => this.transformDataProduct(product)),

      catchError(this.hanlerError<any>('getProduct', {}))
    );
  }

  //* OBTIENE TODAS LAS CATEGORIAS CREADAS
  getCategorias(): Observable<WooProductCategory[]> {
    return this.http
      .get<WooProductCategory[]>(`${this.url}/categories`)
      .pipe(
        catchError(this.hanlerError<WooProductCategory[]>('getCategorias', []))
      );
  }

  //*OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(
    status: 'pending' | 'completed' | 'canceled' | 'failed',
    page: number,
    per_page: number
  ): Observable<{ orders: Orders[]; totalOrders: number }> {
    const params = new HttpParams()
      .append('status', status.toString())
      .append('page', page.toString())
      .append('per_page', per_page.toString());

    return this.http
      .get<WooOrders[]>(`${this.url}/orders`, { params, observe: 'response' })
      .pipe(
        map((response: HttpResponse<WooOrders[]>) => {
          const ordersResponse = response.body; //datos de las ordenes
          const totalOrders = response.headers.get('X-WP-Total');
          this.totalOrders = totalOrders ? parseInt(totalOrders) : 0;
          if (ordersResponse !== null) {
            return {
              orders: ordersResponse.map((orderResponse) =>
                this.transformOrder(orderResponse)
              ),
              totalOrders: this.totalOrders,
            };
          } else {
            this.totalOrders = 0;
            throw new Error('La respuesta del servidor es nula');
          }
        })
      );
  }

  private transformOrder(orderResponse: WooOrders): Orders {
    return {
      id: orderResponse.id.toString(),
      noOrder: orderResponse.id.toString(),
      status: orderResponse.status === 'pending' ? 'En Proceso' : 'Concretado',
      date_created: orderResponse.date_created,
      authorization_date: orderResponse.date_completed,
      fulfillment: false,
      total_order: parseFloat(orderResponse.total),
      products: orderResponse.line_items.map((productOrder) => ({
        product: productOrder.name,
        sku: productOrder.sku,
        total_product: parseFloat(productOrder.total),
        image: productOrder.image,
      })),
    };
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
