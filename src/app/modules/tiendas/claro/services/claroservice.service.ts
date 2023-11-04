import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SHA256 } from 'crypto-js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClaroshopOptionsResponse, ClaroshopProductResponse, ClaroshopProductsResponse } from '@claro/interfaces/claroshop.interface';
import { ClaroshopPendingOrders } from '@claro/interfaces/claroshop-pedidos-pendientes.interface';
import { ClaroshopCompleteOrders } from '@claro/interfaces/claroshop-pedidos-completados.interface';


@Injectable({
  providedIn: 'root'
})
export class ClaroService {

  formattedDate: string | undefined;
  private public_key = environment.claro.public_key;
  private apiKey = environment.claro.private_key;

  private dataSign: string | undefined;
  private signature: any;
  private url: string | undefined;


  constructor(private http: HttpClient) {

    this.formattedDate = '';
    const today = new Date();
    const dd = this.formatWithLeadingZero(today.getDate());
    const mm = this.formatWithLeadingZero(today.getMonth() + 1); // Enero es 0
    const yyyy = today.getFullYear();
    const h = this.formatWithLeadingZero(today.getHours() );
    const m = this.formatWithLeadingZero(today.getMinutes());
    const s = this.formatWithLeadingZero(today.getSeconds());


    this.formattedDate = `${yyyy}-${mm}-${dd}T${h}:${m}:${s}`;

    this.dataSign = this.public_key + this.formattedDate + this.apiKey;

    this.signature = SHA256(this.dataSign).toString();

    this.url = `https://selfservice.claroshop.com/apicm/v1/${this.public_key}/${this.signature}/${this.formattedDate}`;

   }

   //OBTIENE LA HORA SIN CEROS
   private formatWithLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


//* OBTIENE LA LISTA DE PRODUCTOS
getProducts(): Observable<ClaroshopOptionsResponse> {
  return this.http.get<ClaroshopProductsResponse>(`${this.url}/producto`).pipe(
    map( (product : any) =>  product.productos.map( (data: any) => ({
      id: data.claroid,
      nombre: data.nombre,
      precio: data.precio,
      sku: data.skupadre
    }))) )

}

//*OBTIENE UN PRODUCTO ESPECIFICO
getProduct(id: string): Observable<ClaroshopProductResponse> {
  return this.http.get<ClaroshopProductResponse>(`${this.url}/producto ${id}`).pipe( map( (product: ClaroshopProductResponse) => ({

    id: product.transactionid,
    name: product.nombre,
    description: product.descripcion,
    ...product


  }) ))
}


//*OBTIENE LOS PEDIDOS PENDIENTES
getOrderPending() : Observable<ClaroshopPendingOrders> {

  return this.http.get<ClaroshopPendingOrders>(`${this.url}/pedidos?action=pendientes`)
}


//* OBTIENE LOS PEDIDOS COMPLETADOS 
getOrderCompleted(limit: number) : Observable<ClaroshopCompleteOrders> {
  return this.http.get<ClaroshopCompleteOrders>(`${this.url}/pedidos?action=entregados&limit=${limit}`).pipe(
    map( (response : any) => response.listaentregados)
  )
}

//* CREA UN PRODUCTO
postProduct(product: any): Observable<ClaroshopProductResponse> {

  const productData = {
    ...product
  }

  return this.http.post<ClaroshopProductResponse>(`${this.url}/producto`, product)
}

}


