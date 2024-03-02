import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { BreadcrumbItem } from '../../../../../../core/interface/breadcrumb.interface';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { CardProductComponent } from '@components/card-product/card-product.component';
import { ProductResponse } from '@claroshop/interfaces/claroshop-products.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ButtonModule, ToastModule, CheckboxModule, FormsModule, CardProductComponent],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export default class InventarioComponent {

  products: ProductResponse[] = [];
  isActiveProduct: boolean[] = [];
  //Selecciona y Deselecciona cada checkbox del arreglo
  isSelectedEveryProduct: boolean[] = [];
  //selecciona y deselecciona todos los checkbox del arreglo
  isSelectAllProduct = false;
  //data seleccionada
  selectedProduct: ProductResponse[] = [];
  statusData: 'success' | 'loading' | 'error' | 'empty' = 'loading';
  dialogVisible: boolean = false;

  searchText: string = '';

  BreadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Inventario',
    separator: true,
  }

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'storefront',
      label: 'Tiendas',
      separator: true,
    },

    {
      icon: 'store',
      label: 'ClaroShop',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Inventario',
    },
  ];


//parametros iniciales para la paginación
rows = 10;
first = 0;
page = 1;
totalRecords = 0;
suscriptions$: Subscription[] = [];

  constructor(private claroService: ClaroService, private confirmationService: ConfirmationService) { }

 getProducts() {
  this.suscriptions$.push(  this.claroService.getProducts().subscribe({
      next: (data) => {
        this.products = data.productos;
        console.log(data);
        this.statusData = 'success';
      },
      error: (msgErorr) => {
        console.log(msgErorr);
        this.statusData = 'error';
      }
    })
  )
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProducts();
  }

  toggleSelectAllProducts() {
    // Si se selecciona la opción masiva, seleccionar todos los productos
    if (this.isSelectAllProduct) {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      this.selectedProduct = this.products?.slice();
      this.isSelectedEveryProduct = this.products?.map(() => true) || [];
    } else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProduct = [];
      this.isSelectedEveryProduct = [];
    }
  }

  toggleEveryProduct(product: ProductResponse) {
    // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
    const index = this.selectedProduct.findIndex(
      (selectedItem: ProductResponse) => selectedItem.claroid === product.claroid
    );

    if (index === -1) {
      this.selectedProduct.push(product);
    } else {
      this.selectedProduct.splice(index, 1);
    }

    // Verificar si todos los elementos de la parte inferior están seleccionados
    const allSelected = this.products.every((order) =>
      this.selectedProduct.some(
        (selectedOrder) => selectedOrder.claroid === order.claroid
      )
    );
    // Actualizar el estado de selección masiva
    this.isSelectAllProduct = allSelected;

    // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
    if (!this.isSelectAllProduct) {
      this.isSelectAllProduct = false;
    }
  }


  // searchFilter($event: any, value: string) {
  //   this.productos?.filterGlobal(($event.target as HTMLInputElement).value, value)
  // } 

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.suscriptions$.forEach( suscription => suscription.unsubscribe())
}

}