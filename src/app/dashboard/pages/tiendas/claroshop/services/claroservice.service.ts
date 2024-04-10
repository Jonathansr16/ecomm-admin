import { map,  } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  ProductsOptionResponse } from '@claroshop/interfaces/claroshop-products.interface';
import { ProductInventory } from '@components/interfaces/product.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { ProductSearchResponse } from '@claroshop/interfaces/claroshop-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaroService {

  http = inject(HttpClient);

  //* OBTIENE LA LISTA DE PRODUCTOS
  getProducts(page: number, per_page: number): Observable<ProductInventory[]> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('productosporpagina', per_page.toString());

    return this.http.get<ProductsOptionResponse>('producto', { params }).pipe(
      map((resp) => this.transformDataProducts(resp))
    );
  }

  //*OBTIENE LOS PRODUCTOS QUE COINCIDAN CON EL TIPO DE BUSQUEDA
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

  //* OBTIENE UN PRODUCTO ESPECIFICO 
  getProduct(idProduct: number) : Observable<ProductInventory>{


    return this.http.get<ProductSearchResponse>(`producto/${idProduct}`).pipe(
     
    map( (resp) => {
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
        imagesProduct: producto.fotos.map( (img) => ({
          alt: img.idfoto,
          src: img.url,
        })
      )
      
      }

    })

      
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
      status: product.estatus === 'activo' ? 'active' : 'inactive',
      isDropdownInformation: true
    }));

  }

  //* OBTIENE LAS ORDERNES ESPECIFICAS SEGUN EL STATUS


  getOrderByStatus( status: 'pendientes' | 'entregados' | 'embarcados',page: number, per_page: number): Observable< {orders: Orders[]} > {
    
    const params = new HttpParams() 
          .append('action', status)
          .append('page', page.toString())
          .append('limit', per_page)
   
          return this.http.get<any>('pedidos', { params }).pipe(
            map((resp) => {
         
              if(status === 'pendientes') {
                return {
                  orders: this.transformOrder(resp['listapendientes'])
                }
              } else if(status === 'embarcados') {
                return {
                  orders: this.transformOrder(resp['listaguiasautomaticas'])
                }
              } else if (status === 'entregados') {
                return {
                  orders: 
                  this.transformOrder(resp['listaentregados'])
                }
              } else {
                return { orders: [] };
              }

            })
          );
  }


  private transformOrder(orderResponse: any[]): Orders[] {
    return orderResponse.map((order) => {

      let status: 'Pendiente' | 'En Proceso' | 'Concretado' = 'Concretado';

      if(order.estatus === 'Pendiente') {
         status = 'Pendiente'
      } else if(order.estatus === 'Embarcado') {
        status = 'En Proceso'
      } else {
        status = 'Concretado'
      }

      return {
          id: order.nopedido,
          noOrder: order.nopedido.toString(),
          status: status,
          date_created: order.fechaautorizacion,
          shipment_date:  order.fechaautorizacion,
          fulfillment: order.fulfillment,
          total_order: parseFloat(order.totalpedido), // Convertir a número
          products: [{
              product: order.articulo,
              sku: order.sku,
              total_product: parseFloat(order.totalpedido), // Convertir a número
              channel: order.channel
          } ]
      }
  });
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




