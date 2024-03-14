import { map, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import {  ProductSearchResponse, ProductSearchResult, } from '@claroshop/interfaces/claroshop-product.interface';
import { ProductResponse, ProductsOptionResponse } from '@claroshop/interfaces/claroshop-products.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaroService {
 
  http = inject(HttpClient);

//* OBTIENE LA LISTA DE PRODUCTOS
getProducts(page:number, per_page: number): Observable<ProductsOptionResponse> {

  let params = new HttpParams()
  .append('page', page.toString())
  .append('productosporpagina', per_page.toString())

  return this.http.get<ProductsOptionResponse>(`producto`, {params})
}

 //*OBTIENE UN PRODUCTO ESPECIFICO
 getProductsBySearch(id: string): Observable<ProductSearchResult> {
  return this.http.get<ProductSearchResponse>(`/producto/${id}`)
    .pipe(
      map((resp: ProductSearchResponse) => {
        const producto = resp.producto;
        const productResponse: ProductResponse = {
          transactionid: producto.transactionid,
          nombre: producto.nombre,
          precio: producto.preciopublicobase,
          estatus: producto.estatus,
          ean: producto.ean,
          claroid: producto.transactionid,
          skupadre: producto.skupadre,
          fulfillment: producto.fulfillment
        };

        const result: ProductSearchResult = {
          estatus: resp.estatus,
          mensaje: resp.mensaje,
          productos: [productResponse],
          versionConfig: resp.versionConfig,
          versionAPP: resp.versionAPP,
          tagManagerID: resp.tagManagerID,
          tagManagerIDCS: resp.tagManagerIDCS,
          visibleMenuCV: resp.visibleMenuCV
        };

        return result;
      }),
      
    );
}

//* OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
getOrderByStatus(status: 'pendientes' | 'entregados' | 'embarcados') : Observable<OrderResponse> {
  return this.http.get<OrderResponse>(`/pedidos?action=${status}`)
}

//* OBTIENE LA CANTIDAD DE ORDENES
getOrdersCountByStatus( status: 'pendientes' | 'entregados' | 'embarcados'): Observable<{ totalOrders: number }> {

  const params = new HttpParams()
  .set('action', status);

  return this.http.get<any>('/pedidos', {params}).pipe(
    map((resp) => {

      return { totalOrders: resp['totalregistros'] };
    }),
  );
}

//* OBTIENE LA CANTIDAD DE ORDENES EMBARCADAS
getOrdersCountByShipped( ): Observable<{ totalOrders: number }> {


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




