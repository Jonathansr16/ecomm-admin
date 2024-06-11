import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { WritableSignal, inject, signal } from '@angular/core';
import { UpdateStatusProduct } from '@woocommerce/interface/update-product-status.interface';
import { WooProductVariation } from '@woocommerce/interface/woo-product-variation.interface';
import {
  WooProduct,
  WooProductCategory,
  WooProductResult,
} from '@woocommerce/interface/woo-producto.interface';
import { WooProducto } from '@woocommerce/models/wc-new-product.model';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { environment } from 'src/environments/environment.development';

export class WooProductService {
  totalItems: number = 0;
  private productsSignal: WritableSignal<ProductInventory[]> = signal([]);
  private readonly url = environment.wcommerce.apiBase;
  private readonly http = inject(HttpClient);

  #stateproduct = signal<StatusSignalProducts>({
    status: 'loading',
    products: []
  })

  

  // private cachedDataPage: { [key: string]: any[] } = {};

  //* OBTIENE TODAS LAS CATEGORIAS CREADAS
  getCategorias(): Observable<WooProductCategory[]> {
    return this.http
      .get<WooProductCategory[]>(`${this.url}/categories`)
      .pipe(
        catchError(this.hanlerError<WooProductCategory[]>('getCategorias', []))
      );
  }

  //* OBTIENE LOS PRODUCTOS
  getProducts(
    page: number,
    per_page: number
  ): Observable<{ products: ProductInventory[]; totalProducts: number }> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('per_page', per_page.toString());

    return this.http
      .get<WooProduct[]>(`${this.url}/products`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<WooProduct[]>) => {
          const products = response.body; // Datos de los productos
          const totalRecords = response.headers.get('X-WP-Total'); // Cantidad de registros
          this.totalItems = totalRecords ? +totalRecords : 0;
          return {
            products: products
              ? products.map((item) => this.transformDataProduct(item))
              : [],
            totalProducts: this.totalItems,
          };
        }),

        catchError((error) => {
          console.error('Error al obtener productos', error);
          return of({ products: [], totalProducts: 0 }); // Manejar el error devolviendo un objeto vacío
        })
      );
  }

  //* OBTIENE PRODUCTOS RELACIONADOS CON LA BUSQUEDA
  getProductsBySearch(
    searchedValue: string,
    page: number,
    itemsPerPage: number,
    typeSearch: 'todo' | 'id' | 'title' | 'sku'
  ): Observable<{ products: ProductInventory[]; totalProducts: number }> {
    const query = `?page=${page}&per_page=${itemsPerPage}`;
    return this.http
      .get<WooProduct[]>(`${this.url}/products${query}`, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<WooProduct[]>) => {
          const products = response.body ? response.body : []; // Datos de los productos
          const filteredProducts = products.filter((product) => {
            switch (typeSearch) {
              case 'todo':
                return (
                  product.id
                    .toString()
                    .includes(searchedValue.toLowerCase().trim()) ||
                  product.name
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim()) ||
                  product.sku
                    .toLowerCase()
                    .includes(searchedValue.toLowerCase().trim())
                );
              case 'id':
                return product.id
                  .toString()
                  .includes(searchedValue.toLowerCase().trim());
              case 'title':
                return product.name
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase().trim());
              case 'sku':
                return product.sku
                  .toLowerCase()
                  .includes(searchedValue.toLowerCase().trim());
              default:
                return true; // Por defecto, retornar todos los productos
            }
          });
          return {
            products: filteredProducts.map((product) =>
              this.transformDataProduct(product)
            ),
            totalProducts: filteredProducts.length,
          };
        })
      );
  }

  //* OBTIENE UN PRODUCTO EN ESPECIFICO
  getProduct(id: number): Observable<WooProductResult> {
    return this.http.get<WooProduct>(`${this.url}/products/${id}`).pipe(
      map((product) => this.transformDataProduct(product)),

      catchError(this.hanlerError<any>('getProduct', {}))
    );
  }

  //* OBTIENE LAS VARIACIONES DEL PRODUCTO
  getProductVariation(idProduct: string): Observable<VariantProduct[]> {
    return this.http
      .get<WooProductVariation[]>(
        `${this.url}/products/${idProduct}/variations`
      )
      .pipe(
        map((resp) => resp.map((item) => this.transformProductVariation(item)))
      );
  }

  //* CREAR UN NUEVO PRODUCTO
  createProduct(producto: WooProducto): Observable<WooProducto> {
    const productData = {
      ...producto,
    };

    return this.http
      .post<WooProducto>(
        // this.queryParam('products'),
        // productData
        `${this.url}/products`,
        productData
      )
      .pipe(catchError(this.hanlerError<any>('createProduct', {})));
  }

  //* ACTUALIZA UN PRODUCTO ESPECIFICO
  updateProduct(
    idProduct: number,
    producto: WooProducto
  ): Observable<WooProducto> {
    const product = {
      ...producto,
    };

    return this.http
      .post<WooProducto>(`${this.url}/products/${idProduct}`, product)
      .pipe(catchError(this.hanlerError<any>('setProduct', {})));
  }

  //* ACTUALIZA UN CAMPO ESPECIFICO
  updateFieldProduct(idProduct: any, field: string): Observable<WooProducto> {
    return this.http
      .put<WooProducto>(`${this.url}/products/${idProduct}`, field)
      .pipe(catchError(this.hanlerError<any>('setFieldUpdate', {})));
  }

  //* ELIMINA UN PRODUCTO DEL INVENTARIO
  deleteProduct(idProduct: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/products/${idProduct}`)
      .pipe(catchError(this.hanlerError<any>('deleteProduct', {})));
  }

  //? < ============ ACCIONES POR LOTE ============ >

  saveData(data: ProductInventory[]) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  loadData(): ProductInventory[] {
    const data = localStorage.getItem('data');
    const products = data ? JSON.parse(data) : [];
    this.productsSignal.set(products);
    return products;
  }

  setMassiveProducts(products: ProductInventory[]) {
    this.productsSignal.set(products);

  }

  getMassiveProducts(): WritableSignal<ProductInventory[]> {
    return this.productsSignal;
  }

  deleteData() {

    if (localStorage.getItem('data')) {
      localStorage.removeItem('data')
    }
  }

  //* ACTUALIZA POR LOTE DE PRODUCTOS
  updateProducts(products: WooProducto[]): Observable<WooProduct[]> {
    const data = {
      update: products,
    };

    return this.http.post<WooProduct[]>(`${this.url}/products/batch`, data);
  }

  //* ACTUALIZA POR LOTE EL ESTATUS DE LA PUBLICACIÓN
  updateProductStatus(
    products: UpdateStatusProduct[]
  ): Observable<WooProduct[]> {
    const data = {
      update: products,
    };
    return this.http.post<WooProduct[]>(`${this.url}/products/batch`, data);
  }

  //* ELIMINA POR LOTE DE PRODUCTOS
  deleteProductsByBranch(products: number[]): Observable<WooProduct[]> {
    const data = {
      delete: products,
    };
    return this.http.post<WooProduct[]>(`${this.url}/products/batch`, data);
  }

  //? <-- TRANSFORM DATA -->

  //* TRANSFORMA LA DATA DE CADA PRODUCTO
  transformDataProduct(producto: WooProduct): ProductInventory {
    image: producto.images[0];

    return {
      id: producto.id,
      title: producto.name,
      description: producto.description,
      short_description: producto.short_description,
      sku: producto.sku,
      store: 'woocommerce',
      regular_price: parseFloat(producto.price),
      sale_price: parseFloat(producto.regular_price),
      units: producto.stock_quantity,
      category: producto.categories,
      imageProduct: producto.images[0]
        ? {
          id: producto.images[0].id.toString(),
          url: producto.images[0].src,
          alt: producto.images[0].alt,
        }
        : undefined,
      status:
        producto.status === 'publish' && producto.stock_status === 'instock'
          ? 'active'
          : 'inactive',

      stock_status:
        producto.stock_status === 'instock' ? 'instock' : 'outofstock',
      isDropdownInformation: producto.variations.length > 0 ? true : false,
      channel: 'woocommerce',
    };
  }

  //* TRANSFORMA LA DATA DE LAS VARIACIONES DE UN PRODUCTO
  transformProductVariation(product: WooProductVariation): VariantProduct {
    return {
      id: product.id,
      title: product.name,
      sku: product.sku,
      units: product.stock_quantity || 0,
      regular_price: parseFloat(product.regular_price),
      sale_price: parseFloat(product.sale_price),
      imgProduct: {
        id: product.image.id.toString(),
        url: product.image.src,
        alt: product.image.alt,
      },

      status:
        product.stock_quantity || product.stock_status === 'instock'
          ? 'active'
          : 'inactive',
    };
  }

  private hanlerError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} fallo`);
      console.warn(`Mensaje de la falla: ${error.message}`);
      return of(result as T);
    };
  }

  // getProducts(page: number, per_page: number): Observable<{ products: ProductInventory[], totalRecords: number }> {
  //   const cacheKey = `${page}-${per_page}`;
  //   const cachedData = this.cachedDataPage[cacheKey];

  //   let params = new HttpParams()
  //     .append('page', page.toString())
  //     .append('per_page', per_page.toString());

  //   if (cachedData) {
  //     return of(
  //       {
  //         products: cachedData,
  //         totalRecords: this.totalItems
  //       }

  //       );

  //   } else {
  //     return this.http.get<ProductResponse[]>(`${this.url}/products`, { params, observe: 'response' })
  //       .pipe(
  //         map((response: HttpResponse<ProductResponse[]>) => {
  //           const products = response.body; // Datos de los productos
  //           const totalRecords = response.headers.get('X-WP-Total'); // Cantidad de registros
  //           this.totalItems = totalRecords ? +totalRecords : 0;
  //           return {
  //             products: products ? this.transformDataProduct(products) : [],
  //             totalRecords: this.totalItems
  //           };

  //         }),
  //         tap(data => {
  //           this.cachedDataPage[cacheKey] = data.products;

  //           // Limpiar caché si se excede un límite de almacenamiento, por ejemplo, 100 páginas
  //           if (Object.keys(this.cachedDataPage).length > 20) {
  //             delete this.cachedDataPage[Object.keys(this.cachedDataPage)[0]];
  //           }
  //         }),
  //         catchError(error => {
  //           console.error('Error al obtener productos', error);
  //           return of({ products: [], totalRecords: 0 }); // Manejar el error devolviendo un objeto vacío
  //         })
  //       );
  //   }
  // }
}


interface StatusSignalProducts {
  status: 'loading' | 'success' | 'empty' | 'error';
  products: ProductInventory[]
}