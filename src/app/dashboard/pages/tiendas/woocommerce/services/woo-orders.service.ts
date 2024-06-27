import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WooOrders } from '@woocommerce/interface/woo-order.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { Orders } from 'src/app/core/interface/orders.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WooOrdersService {
  private readonly url = environment.wcommerce.apiBase;
  private readonly http = inject(HttpClient);
  totalOrders: number = 0;


  //*OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(
    status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed',
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

  //* OBTIENE LA CANTIDAD DE ORDENES
  getOrdersCount(
    status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed'
  ): Observable<{ totalCount: number }> {
    return this.http.get<any>(`${this.url}/orders?status=${status}`).pipe(
      map((resp) => {
        return { totalCount: resp.length };
      }),
      catchError(this.hanlerError<any>('getOrderCount', []))
    );
  }

  transformOrder(orderResponse: WooOrders): Orders {
    return {
      id: orderResponse.id.toString(),
      noOrder: orderResponse.id.toString(),
      status: orderResponse.status === 'pending' ? 'En Proceso' : 'Concretado',
      date_created: orderResponse.date_created,
      authorization_date: orderResponse.date_completed,
      isFulfillment: false,
      total_order: parseFloat(orderResponse.total),
      products: orderResponse.line_items.map((productOrder) => ({
        id: productOrder.id.toString(),
        product: productOrder.name,
        sku: productOrder.sku,
        total_product: parseFloat(productOrder.total),
        image: productOrder.image,
      })),
    };
  }

  private hanlerError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} fallo`);
      console.warn(`Mensaje de la falla: ${error.message}`);
      return of(result as T);
    };
  }
}
