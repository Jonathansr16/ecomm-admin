import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ClaroshopProductSearch } from '@claroshop/interfaces/claroshop-product.interface';
import {
  ClaroshopProduct,
  ClaroshopProductsOption,
} from '@claroshop/interfaces/claroshop-products-options.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductInventory } from 'src/app/core/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaroProductsService {
  private readonly http = inject(HttpClient);

  constructor() {}

  //* OBTIENE LA LISTA DE PRODUCTOS
  getProducts(
    page: number
  ): Observable<{ products: ProductInventory[]; totalItems: number }> {
    let params = new HttpParams().append('page', page.toString());

    return this.http.get<ClaroshopProductsOption>('producto', { params }).pipe(
      map((resp) => {
        return {
          products: this.transformDataProducts(resp),
          totalItems: resp.totalproductos,
        };
      }),
      catchError(this.handlerError<any>('getProducts', {}))
    );
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
          imageProduct: {
            url: producto.fotos[0].url,
          },
        };
      })
    );
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
      channel: 'claroshop',
    };
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
      channel: 'claroshop',
    }));
  }

  //* CREA UN PRODUCTO
  postProduct(product: any): Observable<any> {
    const productData = {
      ...product,
    };

    return this.http.post<any>(`/producto`, product);
  }

  private handlerError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} fallo`);
      console.warn(`Mensaje de la falla: ${error.message}`);
      return of(result as T);
    };
  }
}