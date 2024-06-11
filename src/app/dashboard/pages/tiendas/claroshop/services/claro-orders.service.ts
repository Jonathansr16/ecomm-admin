import { catchError, map } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Orders } from 'src/app/core/interface/orders.interface';
import { ClaroshopOrderByID } from '@claroshop/interfaces/claroshop-order-by-Id.interface';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaroOrdersService {
  private readonly http = inject(HttpClient);

  //* OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(
    status: 'pendientes' | 'entregados' | 'embarcados',
    page: number,
    per_page: number
  ): Observable<{ orders: Orders[]; totalOrders: number }> {
    const params = new HttpParams()
      .append('action', status)
      .append('page', page)
      .append('limit', per_page);

    return this.http.get<any>('pedidos', { params }).pipe(
      map((resp) => {
        if (status === 'pendientes') {
          return {
            orders: this.transformOrder(resp['listapendientes']),
            totalOrders: resp.totalregistros,
          };
        } else if (status === 'embarcados') {
          return {
            orders: this.transformOrder(resp['listaguiasautomaticas']),
            totalOrders: resp.totalembarcados,
          };
        } else if (status === 'entregados') {
          return {
            orders: this.transformOrder(resp['listaentregados']),
            totalOrders: resp.totalregistros,
          };
        } else {
          return {
            orders: [],
            totalOrders: 0,
          };
        }
      }),
      catchError(this.handlerError<any>('getOrderByStatus', {}))
    );
  }

  //* OBTIENE LA CANTIDAD DE ORDENES
  getOrdersCountByStatus(
    status: 'pendientes' | 'entregados' | 'embarcados'
  ): Observable<{ totalOrders: number }> {
    const params = new HttpParams().set('action', status);

    return this.http.get<any>('/pedidos', { params }).pipe(
      map((resp) => {
        if (status === 'pendientes') {
          return { totalOrders: resp['totalregistros'] };
        } else if (status === 'embarcados') {
          return { totalOrders: resp['totalembarcados'] };
        } else {
          return { totalOrders: resp['totalregistros'] };
        }
      })
    );
  }

  //* OBTIENE UNA ORDEN ESPECIFICA
  getOrderById(idProduct: number): Observable<OrderDetails> {
    return this.http
      .get<ClaroshopOrderByID>(
        `pedidos?action=detallepedido&nopedido=${idProduct}`
      )
      .pipe(
        map((order) => {
          let status: 'Pendiente' | 'En Proceso' | 'Concretado' = 'Concretado';

          if (order.estatuspedido.estatus === 'Pendiente') {
            status = 'Pendiente';
          } else if (order.estatuspedido.estatus === 'Embarcado') {
            status = 'En Proceso';
          } else {
            status = 'Concretado';
          }

          return {
            id: order.productos[0].claroid,
            status: status,
            shipping: {
              client: order.datosenvio.entregara,
              address: order.datosenvio.direccion,
              cp: order.datosenvio.cp,
              city: order.datosenvio.ciudad,
              country: 'MX',
            },
            products: order.productos.map((product) => ({
              title: product.producto,
              sku: product.sku,
              total: product.importe,
            })),
            date_created: order.estatuspedido.fechacolocado,
            shipment_date: order.productos[0].fechaasignacion,
            fulfillment: order.productos[0].skufullfilment ? true : false,
            tracking_guide: order.productos[0].guia,
            channel: 'mely',
            total_order: order.productos[0].importe,
            messenger_service: 'DHL',
          };
        })
      );
  }
  //* CREA UN PRODUCTO
  postProduct(product: any): Observable<any> {
    const productData = {
      ...product,
    };

    return this.http.post<any>(`/producto`, product);
  }

  private transformOrder(orderResponse: any[]): Orders[] {
    return orderResponse.map((order) => {
      let status: 'Pendiente' | 'En Proceso' | 'Concretado' = 'Concretado';
      let creation: Date;
      let authorization: Date;

      if (order.estatus === 'Pendiente') {
        status = 'Pendiente';
        creation = order.fechacolocacion;
        authorization = order.fechaautorizacion;
      } else if (order.estatus === 'Embarcado') {
        status = 'En Proceso';
        creation = order.fechacolocacion;
        authorization = order.fechaembarque;
      } else {
        status = 'Concretado';
        creation = order.fechacolocacion;
        authorization = order.fechaembarque;
      }

      return {
        id: order.nopedido,
        noOrder: order.nopedido.toString(),
        status: status,
        date_created: creation,
        authorization_date: authorization,
        isFulfillment: order.fulfillment ? true : false,
        total_order: parseFloat(order.totalpedido), // Convertir a número
        channel: 'claroshop',
        products: [
          {
            id: order.transactionid,
            product: order.articulo,
            sku: order.sku,
            total_product: parseFloat(order.totalproducto), // Convertir a número
            channel: order.channel,
          },
        ],
      };
    });
  }

  private handlerError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} se produjo un error`);
      console.warn(`Mensaje de la falla: ${error.message}`);
      return of(result as T);
    };
  }
}
