import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsOptionsResonse, ProductsResul } from '@claro/interfaces/claroshop-productos.interface';
import { ProductOptionsResponse, ProductResult } from '@claro/interfaces/claroshop-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaroService {
 
  constructor(private http: HttpClient) { }

//* OBTIENE LA LISTA DE PRODUCTOS
getProducts(): Observable<ProductsResul> {
  return this.http.get<ProductsOptionsResonse>(`/producto`).pipe(
   
    map(response => {
      return {
        productos: response.productos,
        totalproductos: response.totalproductos,
        totalpaginas: response.totalpaginas,
        paginaactual: response.paginaactual,
        productosporpagina: response.productosporpagina
      };
    }
    )
    
     )

}

// //*OBTIENE UN PRODUCTO ESPECIFICO
getProduct(id: string): Observable<ProductResult> {
  return this.http.get<ProductOptionsResponse>(`/producto/${id}`).pipe( map( (product: any) => ({

    id: product.transactionid,
    name: product.nombre,
    description: product.descripcion,
    ...product


  }) ))
}


// //*OBTIENE LOS PEDIDOS PENDIENTES
getOrderByStatus(status: string) : Observable<any> {

  return this.http.get<any>(`/pedidos?action=${status}`  )
}



//* CREA UN PRODUCTO
postProduct(product: any): Observable<any> {

  const productData = {
    ...product
  }

  return this.http.post<any>(`/producto`, product)
}

}




