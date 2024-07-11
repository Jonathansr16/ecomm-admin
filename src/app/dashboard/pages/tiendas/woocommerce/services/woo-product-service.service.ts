import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { UpdateStatusProduct } from '@woocommerce/interface/update-product-status.interface';
import { WooCategory, WooCategoryResult } from '@woocommerce/interface/woo-category-product.interface';
import { WooProductAttibutesResul, WooProductAttributes } from '@woocommerce/interface/woo-product-attributes.interface';
import { WooProductVar, WooProductVariation } from '@woocommerce/interface/woo-product-variation.interface';
import {
  WooProduct,
 
} from '@woocommerce/interface/woo-producto.interface';
import { WooProducto } from '@woocommerce/models/wc-new-product.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Inventory } from 'src/app/core/interface/product.interface';
import { AttributesVariants, VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { FileItem } from 'src/app/core/models/file-item.models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WooProductService {
  totalItems: number = 0;
  private productsSignal: WritableSignal<Inventory[]> = signal([]);
  private readonly url = environment.wcommerce.apiBase;
  private readonly http = inject(HttpClient);

  #stateproduct = signal<StatusSignalProducts>({
    status: 'loading',
    products: []
  })

  // private cachedDataPage: { [key: string]: any[] } = {};

  //* OBTIENE TODAS LAS CATEGORIAS CREADAS
  getCategories(): Observable<WooCategoryResult[]> {
    return this.http.get<WooCategory[]>(`${this.url}/products/categories`).pipe(

      map((resp) => resp.map((category) => this.transformCategoryProduct(category))),

      catchError(this.hanlerError<WooCategoryResult[]>('getCategorias', []))
    );
  }

  //* OBTIENE LOS PRODUCTOS
  getProducts( page: number, per_page: number ): Observable<{ products: Inventory[]; totalProducts: number }> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('per_page', per_page.toString());

    return this.http.get<WooProduct[]>(`${this.url}/products`, { params, observe: 'response'})
      .pipe(
        map((response: HttpResponse<WooProduct[]>) => {
          const products = response.body; // Datos de los productos
          const totalRecords = response.headers.get('X-WP-Total'); // Cantidad de registros
          this.totalItems = totalRecords ? +totalRecords : 0;
          return {
            products: products
              ? products.map((item) => this.transformInventory(item))
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
  ): Observable<{ products: Inventory[]; totalProducts: number }> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('per_page', itemsPerPage.toString());

    const searchLower = searchedValue.toLowerCase().trim(); // Convertir la búsqueda una vez a minúsculas

    return this.http.get<WooProduct[]>(`${this.url}/products?search=${searchLower}`, { observe: 'response', params }).pipe(
      map((response: HttpResponse<WooProduct[]>) => {
        const products = response.body || []; // Usar operador de cortocircuito para evitar productos undefined
        const filteredProducts = products.filter(product => {
          switch (typeSearch) {
            case 'todo':
              return (
                product.id.toString().includes(searchLower) ||
                product.name.toLowerCase().includes(searchLower) ||
                product.sku.toLowerCase().includes(searchLower)
              );
            case 'id':
              return product.id.toString().includes(searchLower);
            case 'title':
              return product.name.toLowerCase().includes(searchLower);
            case 'sku':
              return product.sku.toLowerCase().includes(searchLower);
            default:
              return true; // Por defecto, retornar todos los productos
          }
        });

        const transformedProducts = filteredProducts.map(product => this.transformInventory(product));

        return {
          products: transformedProducts,
          totalProducts: filteredProducts.length
        };
      })
    );
  }

  //* OBTIENE UN PRODUCTO EN ESPECIFICO
  getProduct(id: number): Observable<WooProducto> {
    return this.http.get<WooProduct>(`${this.url}/products/${id}`).pipe(
      map((product) => this.transformProduct(product)),

      catchError(this.hanlerError<any>('getProduct', {}))
    );
  }

  //* OBTIENE LAS VARIACIONES DEL PRODUCTO PARA MOSTRAR EN EL INVENTARIO
  getProductVariations(idProduct: number): Observable<VariantProduct[]> {
    return this.http
      .get<WooProductVariation[]>(
        `${this.url}/products/${idProduct}/variations`
      )
      .pipe(
        map((resp) => resp.map((item) => this.transformVariants(item)))
      );
  }


  getProductVariation(idProduct: number): Observable<WooProductVar[]> {
    return this.http
      .get<WooProductVariation[]>(
        `${this.url}/products/${idProduct}/variations`
      )
      .pipe(
        map((resp) => resp.map((item) => this.transformVariant(item)))
      );
  }

  //* OBTIENE LOS ATRIBUTOS DE LOS PRODUCTOS
  getAttributes(): Observable<WooProductAttibutesResul[]> {
   return this.http.get<WooProductAttributes[]>(`${this.url}/products/attributes`).pipe(
     map( ( resp ) =>  resp.map( (item) => this.transformProductAttributes(item) ))
    )
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
  saveData(data: Inventory[]) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  loadData():  Inventory[] {
    const data = localStorage.getItem('data');
    const products = data ? JSON.parse(data) : [];
    this.productsSignal.set(products);
    return products;
  }

  setMassiveProducts( products:  Inventory[] ) {
    this.productsSignal.set(products);

  }

  getMassiveProducts(): WritableSignal< Inventory[] > {
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

  // getProducto(id: number): Observable<WooProducto> {

  //   return this.http.get<WooProduct>(`${this.url}/products/${id}`).pipe(

  //     map((producto) => {
  //       const images = producto.images.map(img => {
  //         const fileItem = new FileItem(new File([], img.name, { type: 'image/*' }));
  //         fileItem.objectURL = img.src; // Set objectURL to src
  //         return fileItem;
  //       });

  //       return {
  //         id: producto.id,
  //         name: producto.name,
  //         description: producto.description,
  //         short_description: producto.short_description,
  //         regular_price: producto.price,
  //         sale_price: producto.regular_price,
  //         sku: producto.sku,
  //         categories: producto.categories.map((category) => {
  //           return {
  //             id: category.id
  //           }
  //         }),
  //         stock_quantity: producto.stock_quantity,
  //         status: producto.status,
  //         stock_status: producto.stock_status,
  //         images: images,
  //         variations: producto.variations
  //       };

  //     }),

  //   )

  // }

  //* ELIMINA POR LOTE DE PRODUCTOS
  deleteProductsByBranch(products: number[]): Observable<WooProduct[]> {
    const data = {
      delete: products,
    };
    return this.http.post<WooProduct[]>(`${this.url}/products/batch`, data);
  }

  //* <-- TRANSFORM DATA -->

  //* TRANSFORMA LA DATA DEL INVENTARIO
  private transformInventory(product: WooProduct): Inventory {
   
    const fileItems: FileItem[] = [];
      product.images.forEach( (item, index) => {
        const file = new File([], item.alt, { type: 'image/*' });
        const fileItem = new FileItem(file);
        fileItem.objectURL = item.src;
        fileItems[index] = fileItem;
      })
  
    return {
       id: product.id,
       title: product.name,
       description: product.description,
       short_description: product.short_description,
       sku: product.sku,
       store: 'woocommerce',
       regular_price: parseInt( product.regular_price ),
       sale_price: parseInt( product.sale_price ),
       stock: product.stock_quantity,
       status: product.status === 'publish' ? 'active' : 'inactive',
       stock_status: product.stock_status === 'instock' ? 'instock' : 'outofstock',
       total_sales: product.total_sales,
       category: product.categories,
       images: fileItems,
       isFulfillment: false,
       isDropdownInformation: product.variations && product.variations.length > 0 ? true : false,
       variations: product.variations
      }
  }

  private transformProduct(product: WooProduct): WooProducto {

    const fileItems: FileItem[] = [];

    product.images.forEach( (item, index) => {
      const file = new File([], item.name, { type: 'image/*' });
      const fileItem = new FileItem(file);
      fileItem.objectURL = item.src;
      fileItems[index] = fileItem;
    })

    return {
     id: product.id,
     name: product.name,
     description: product.description,
     short_description: product.short_description,
     regular_price: product.regular_price,
     sale_price: product.sale_price,
     sku: product.sku,
     categories: product.categories,
     stock_quantity: product.stock_quantity,
     status: product.status,
     stock_status: product.stock_status,
     images: fileItems,
     variations: product.variations,
     total_sales: product.total_sales
    }
  }
  //* TRANSFORMA LA DATA DE LAS VARIANTES DE TODOS PRODUCTOS
  private transformVariants(product: WooProductVariation): VariantProduct {

    const file = new File([], product.image.name, { type: 'image/*' });
    const fileItem = new FileItem(file);
    fileItem.objectURL = product.image.src;
    const attribute: AttributesVariants[] = [];

    product.attributes.forEach( (attr, index) => {
      attribute[index] = {
        id: attr.id,
        attribute: attr.name,
        value: attr.option
      }
    })

    return {
      id: product.id,
      sku: product.sku,
      stock: product.stock_quantity || 0,
      regular_price: parseFloat(product.regular_price),
      sale_price: parseFloat(product.sale_price),
      images: [fileItem],
      status: product.status === 'publish' ? 'active' : 'inactive',
      attributes: attribute
  }

}

//* TRANSFORMA LA DATA DE LAS VARIANTES DE UN PRODUCTO ESPECIFICO
private transformVariant(product: WooProductVariation): WooProductVar {

  const file = new File([], product.image.name, { type: 'image/*' });
  const fileItem = new FileItem(file);
  fileItem.objectURL = product.image.src;
  const attribute: AttributesVariants[] = [];

  product.attributes.forEach( (attr, index) => {
    attribute[index] = {
      id: attr.id,
      attribute: attr.name,
      value: attr.option
    }
  })

  return {
    id: product.id,
    sku: product.sku,
    stock_quantity: product.stock_quantity || 0,
    description: product.description,
    regular_price: product.regular_price,
    sale_price: product.sale_price,
    images: [fileItem],
    status: product.status,
    stock_status: product.stock_status,
    attributes: attribute
}

}

  //* TRANSFORMA LA DATA DE LAS CATEGORIAS DEL PRODUCTO
  private transformCategoryProduct(category: WooCategory): WooCategoryResult {

    return {
      id: category.id,
      name: category.name,
      parent: category.parent,
      items: category.count
    }

  }




  //* TRANSFORMA LA DATA DE LOS ATRIBUTOS DE LOS PRODUCTOS
  private transformProductAttributes(attr: WooProductAttributes): WooProductAttibutesResul {

    return {
      id: attr.id,
      name: attr.name,
      type: attr.type
    }
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
  products: Inventory[]
}