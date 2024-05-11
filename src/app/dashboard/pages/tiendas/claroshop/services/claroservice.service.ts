import { map } from 'rxjs/operators';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ProductInventory } from 'src/app/core/interface/product.interface';
import { Orders, ProductOrder } from 'src/app/core/interface/orders.interface';
import { ClaroshopProductSearch } from '@claroshop/interfaces/claroshop-product.interface';
import { ClaroshopProduct, ClaroshopProductsOption } from '@claroshop/interfaces/claroshop-products-options.interface';
import { ClaroshopOrderByID } from '@claroshop/interfaces/claroshop-order-by-Id.interface';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaroService {
  http = inject(HttpClient);

  //* OBTIENE LA LISTA DE PRODUCTOS
  getProducts(page: number): Observable<{products: ProductInventory[], totalItems: number}> {
    let params = new HttpParams()
      .append('page', page.toString())

    return this.http
      .get<ClaroshopProductsOption>('producto', { params })
      .pipe(map((resp) => {
     return {
       products: this.transformDataProducts(resp),
       totalItems: resp.totalproductos
     }  
      })
    )
  }

  //*OBTIENE LOS PRODUCTOS QUE COINCIDAN CON EL TIPO DE BUSQUEDA
  getProductsBySearch(
    searchedValue: string,
    typeSearch: 'todo' | 'id' | 'title' | 'sku',
    page: number
  ): Observable<ProductInventory[]> {
    let params = new HttpParams().append('page', page.toString());

    return this.http
      .get<ClaroshopProductsOption>(`producto`, { params })

      .pipe(
        map((products) =>
          products.productos
            .filter((product) => {
              switch (typeSearch) {
                case 'todo': {
                  return (
                    product.claroid
                      .toString()
                      .includes(searchedValue.toLowerCase().trim()) ||
                    product.nombre
                      .toLowerCase()
                      .includes(searchedValue.toLowerCase().trim()) ||
                    product.skupadre
                      .toLowerCase()
                      .includes(searchedValue.toLowerCase().trim())
                  );
                }

                case 'id': {
                  return product.claroid
                    .toString()
                    .includes(searchedValue.toLowerCase().trim()); //Búsqueda por id
                }

                case 'title': {
                  return product.nombre
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim()); //Búsqueda por SKU (case-insensitive)
                }

                case 'sku': {
                  return product.skupadre
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim()); //Búsqueda por SKU (case-insensitive)
                }
              }
            })
            .map((product) => this.transformProduct(product))
        )
      );
  }

  transformProduct(product: ClaroshopProduct): ProductInventory {
    return {
      id: product.transactionid,
      title: product.nombre,
      sku: product.skupadre,
      store: 'claroshop',
      regular_price: product.precio,
      sale_price: 0, // You need to set this value accordingly
      status: product.estatus === 'activo' ? 'active' : 'inactive',
      isDropdownInformation: true,
      channel: 'claroshop'
    };
  }
  //* OBTIENE UN PRODUCTO ESPECIFICO
  getProduct(idProduct: number): Observable<ProductInventory> {
    return this.http.get<ClaroshopProductSearch>(`producto/${idProduct}`).pipe(
      map((resp) => {
        const producto = resp.producto;

        return {
          id: producto.transactionid,
          title: producto.nombre,
          description: producto.descripcion,
          sku: producto.skupadre,
          store: 'claroshop',
          regular_price: producto.preciopublicobase,
          sale_price: producto.preciopublicooferta,
          units: producto.cantidad,
          status: producto.estatus === 'activo' ? 'active' : 'inactive',
          isDropdownInformation: true,
          channel: 'claroshop',
          imagesProduct: producto.fotos.map((img) => ({
            alt: img.idfoto,
            src: img.url,
          })),
        };
      })
    );
  }

  //* TRANSFORM DATA
  transformDataProducts(products: ClaroshopProductsOption): ProductInventory[] {
    return products.productos.map((product) => ({
      id: product.transactionid,
      title: product.nombre,
      sku: product.skupadre,
      store: 'claroshop',
      regular_price: product.precio,
      sale_price: 0, // You need to set this value accordingly
      status: product.estatus === 'activo' ? 'active' : 'inactive',
      isDropdownInformation: true,
      channel: 'claroshop'
    }));
  }

  //* OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS
  getOrderByStatus(
    status: 'pendientes' | 'entregados' | 'embarcados',
    page: number,
    per_page: number
  ): Observable<{ orders: Orders[], totalOrders: number }> {
    const params = new HttpParams()
      .append('action', status)
      .append('page', page)
      .append('limit', per_page);

    return this.http.get<any>('pedidos', { params }).pipe(
      map((resp) => {
        if (status === 'pendientes') {
          return {
            orders: this.transformOrder(resp['listapendientes']),
            totalOrders: resp.totalregistros
          };
        } else if (status === 'embarcados') {
          return {
            orders: this.transformOrder(resp['listaguiasautomaticas']),
            totalOrders: resp.totalembarcados
          };
        } else if (status === 'entregados') {
          return {
            orders: this.transformOrder(resp['listaentregados']),
            totalOrders: resp.totalregistros
          };
        } else {
          return { 
            orders: [],
            totalOrders: 0

           };
        }
      })
    );
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
        fulfillment: order.fulfillment,
        total_order: parseFloat(order.totalpedido), // Convertir a número
        channel: 'claroshop',
        products: [
          {
            product: order.articulo,
            sku: order.sku,
            total_product: parseFloat(order.totalproducto), // Convertir a número
            channel: order.channel,
          },
        ],
      };
    });
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
    return this.http.get<ClaroshopOrderByID>(`pedidos?action=detallepedido&nopedido=${idProduct}`).pipe(
      map( (order) => {
        
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
          products: order.productos.map( product => ({
            title: product.producto,
            sku: product.sku,
           total: product.importe
          })),
          date_created: order.estatuspedido.fechacolocado,
          shipment_date: order.productos[0].fechaasignacion,
          fulfillment: order.productos[0].skufullfilment ? true : false,
          tracking_guide: order.productos[0].guia,
          channel: 'mely',
          total_order: order.productos[0].importe,
          messenger_service: 'DHL'
        }

        
      })
    )
      
  }
  //* CREA UN PRODUCTO
  postProduct(product: any): Observable<any> {
    const productData = {
      ...product,
    };

    return this.http.post<any>(`/producto`, product);
  }

  //? actualiza un campo especifico

  // updateField(idProduct: number, field: ProductInventory): Observable<ProductInventory> {

  //  return this.http.put<ProductInventory>(`producto/${idProduct}`, field).pipe(
  //   map( (product) => this.transformDataProducts(product))
  //  )
  // }
}
