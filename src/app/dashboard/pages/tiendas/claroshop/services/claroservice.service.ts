import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { OrderResponse } from '@claroshop/interfaces/claroshop-orders.interface';
import { ProductResponse, ProductsResponse } from '@claroshop/interfaces/claroshop-products.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaroService {
 
  constructor(private http: HttpClient) { }

//* OBTIENE LA LISTA DE PRODUCTOS
getProducts(): Observable<ProductsResponse> {
  return this.http.get<ProductsResponse>(`/producto`)
  // .pipe(
   
  //   map(response => {
  //     return {
  //       productos: response.productos,
  //       totalproductos: response.totalproductos,
  //       totalpaginas: response.totalpaginas,
  //       paginaactual: response.paginaactual,
  //       productosporpagina: response.productosporpagina
  //     };
  //   }
  //   )
    
  //    )

}

//*OBTIENE UN PRODUCTO ESPECIFICO
getProduct(id: string): Observable<ProductResponse> {
  return this.http.get<ProductResponse>(`/producto/${id}`).pipe( map( (product: any) => ({

    id: product.transactionid,
    name: product.nombre,
    description: product.descripcion,
    ...product


  }) ))
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




