import { filter, map, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import { ProductSearchResponse, ProductSearchResult, } from '@claroshop/interfaces/claroshop-product.interface';
import { ProductResponse, ProductsOptionResponse } from '@claroshop/interfaces/claroshop-products.interface';
import { ProductInventory } from '@components/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaroService {

  http = inject(HttpClient);

  //* OBTIENE LA LISTA DE PRODUCTOS
  // getProducts(page:number, per_page: number): Observable<ProductsOptionResponse> {

  //   let params = new HttpParams()
  //   .append('page', page.toString())
  //   .append('productosporpagina', per_page.toString())

  //   return this.http.get<ProductsOptionResponse>(`producto`, {params})
  // }


  getProducts(page: number, per_page: number): Observable<ProductInventory[]> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('productosporpagina', per_page.toString());

    return this.http.get<ProductsOptionResponse>('producto', { params }).pipe(
      map((resp) => this.transformDataProducts(resp))
    );
  }

  //*OBTIENE UN PRODUCTO ESPECIFICO
  getProductsBySearch(searchedValue: string, typeSearch: 'todo' | 'id' | 'title' | 'sku', page: number): Observable<ProductInventory[]> {

    let params = new HttpParams()
      .append('page', page.toString());

    return this.http.get<ProductsOptionResponse>(`producto`, { params })

      .pipe(
        map((resp) => this.transformDataProducts(resp)),
        map ( (products) => products.filter( product => {

          switch(typeSearch) {
            
            case 'todo': {
              return product.id.toString().includes(searchedValue.toLocaleLowerCase()) ||
                    product.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
                    product.sku.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase());     
            }

            case 'id': {
              return product.id.toString().includes(searchedValue.toLocaleLowerCase())  ; //Búsqueda por id
            }

            case 'title': {
              return product.title.toLowerCase().includes(searchedValue.toLowerCase()) ; //Búsqueda por SKU (case-insensitive)
            }

            case 'sku': {
              return product.sku.toLowerCase().includes(searchedValue.toLowerCase()); //Búsqueda por SKU (case-insensitive)

            }
          }

        }) )
      )
  }

  //* TRANSFORM DATA
  transformDataProducts(products: ProductsOptionResponse): ProductInventory[] {

    return products.productos.map((product) => ({
      id: product.transactionid,
      title: product.nombre,
      sku: product.skupadre,
      store: 'claroshop',
      regular_price: product.precio,
      sale_price: 0, // You need to set this value accordingly
      status: product.estatus === 'activo' ? 'active' : 'inactive'
    }));

  }


//* FILTER DATA


  //* OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(status: 'pendientes' | 'entregados' | 'embarcados'): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`/pedidos?action=${status}`)
  }

  //* OBTIENE LA CANTIDAD DE ORDENES
  getOrdersCountByStatus(status: 'pendientes' | 'entregados' | 'embarcados'): Observable<{ totalOrders: number }> {

    const params = new HttpParams()
      .set('action', status);

    return this.http.get<any>('/pedidos', { params }).pipe(
      map((resp) => {

        return { totalOrders: resp['totalregistros'] };
      }),
    );
  }

  //* OBTIENE LA CANTIDAD DE ORDENES EMBARCADAS
  getOrdersCountByShipped(): Observable<{ totalOrders: number }> {


    return this.http.get<any>('/pedidos?action=embarcados').pipe(
      map((resp) => {
        return { totalOrders: resp['totalembarcados'] };
      }),
    );
  }
  //* CREA UN PRODUCTO
  postProduct(product: any): Observable<any> {

    const productData = {
      ...product
    }

    return this.http.post<any>(`/producto`, product)
  }

}




