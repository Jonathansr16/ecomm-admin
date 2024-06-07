import { ProductInventory } from 'src/app/core/interface/product.interface';
import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardSearchComponent } from '@components/card-search/card-search.component';
import { ButtonModule } from 'primeng/button';
import { SearchMenuFilter } from 'src/app/core/interface/search-menu-filter.interface';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { CardProductComponent } from './card-product/card-product.component';
import { StatusInfoData } from 'src/app/core/interface/status-data-info.interface';
import { CardDropdownProductComponent } from './card-dropdown-product/card-dropdown-product.component';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { PositionVariante } from 'src/app/core/interface/position-variante.interface';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    CheckboxModule,
    FormsModule,
    InputSwitchModule,
    CardSearchComponent,
    ToastModule,
    PaginatorModule,
    SkeletonModule,
    CardProductComponent,
    CardDropdownProductComponent,
  ],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent {
  statusProducts = input.required<StatusData>();
  statusInfoProducts = input<StatusInfoData>();
  products = input.required<ProductInventory[]>();
  totalRecords = input.required<number>();

  //multiple
  statusProductVars = input<StatusData>();
  productsVar = input<VariantProduct[]>();
  menuSearch = input<SearchMenuFilter[]>();
  // totalRecords = input.required<number>();
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 1,
    totalRecords: 0
  };
  menuProduct = input.required<MenuItem[]>();

  emitProduct = output<PositionVariante>();
  searchValue = output<string>();
  changeLabelValue = output<'todo' | 'title' | 'id' | 'sku'>();
  changedPagination = output<PaginationParams>();

  pauseProductsByBatch = output<any>();
  reactivateProductsByBatch = output<any>();
  modifyProductsByBatch = output<any>();
  deleteProductsByBatch = output<any>();


  perPageOptions: number[] = [10, 20, 30, 50];

  menu: MenuItem[] = [];


  isBtnActive: StatusBtn = {
    pause: false,
    eliminate: false,
    reactivate: false,
    massiveModification: false,
  };

  menuToolbar: MenuItem[] = [
    {
      label: 'Buscar por:',

      items: [
        {
          label: 'Todo',
          command: (event) => {
            this.changePlaceHolder = 'Titulo, código o sku';
            this.changeLabelBtn = 'Todo';
            this.changeLabelValue.emit('todo');
          },
        },

        {
          label: 'Id del Producto',
          command: (event) => {
            this.changePlaceHolder = event.item?.label || 'Id del Producto';
            this.changeLabelBtn = 'Id';
            this.changeLabelValue.emit('id');
          },
        },

        {
          label: 'Titulo del Producto',
          command: (event) => {
            this.changePlaceHolder = event.item?.label || 'Titulo del Producto';
            this.changeLabelBtn = 'Titulo';
            this.changeLabelValue.emit('title');
          },
        },

        {
          label: 'sku del producto',
          command: (event) => {
            this.changePlaceHolder = event.item?.label || 'sku del Producto';
            this.changeLabelBtn = 'Sku';
            this.changeLabelValue.emit('sku');
          },
        },
      ],
    },
  ];

  //Selecciona y Deselecciona cada checkbox del arreglo
  isSelectedEveryProduct: boolean[] = [];
  //data seleccionada
  selectedProduct: ProductInventory[] = [];
  //selecciona y deselecciona todos los checkbox del arreglo
  isSelectAllProduct = false;

  focusInput = false;
  changePlaceHolder: string = 'Buscar por #, Sku o titulo';
  changeLabelBtn = 'Todo';
  inputValue = '';
  showMenuSearch = false;
  hidenSearch = false;
  showIcon = false;
  // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1;

  
  updateProductByBranch: string | number[] = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  toggleSelectAllProducts(): void {
    // Si se selecciona la opción masiva, seleccionar todos los productos
    if (this.isSelectAllProduct) {
      // Si se selecciona la opción masiva, seleccionar todos los productos
      this.selectedProduct = this.products().slice();
      this.isSelectedEveryProduct = this.products().map(() => true);

      this.isBtnActive.massiveModification = true;
      this.isBtnActive.pause = this.selectedProduct.every(value => value.status !== 'inactive');
      this.isBtnActive.reactivate = this.selectedProduct.every(value => value.status === 'inactive' && value.units )
      this.isBtnActive.eliminate = true;
    } else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProduct = [];
    this.isBtnActive = {
      pause: false,
      reactivate: false,
      eliminate: false,
      massiveModification: false,
    }
      this.isSelectedEveryProduct = this.products().map(() => false);
    }
  }

  toggleEveryProduct(product: ProductInventory, i: number): void {

  

    const index = this.selectedProduct.findIndex(
      (selected) => selected.id === product.id
    );

    if (index === -1) {
      // Si el producto no está seleccionado, lo agregamos
      this.selectedProduct.push(product);
      this.isSelectedEveryProduct[i] = true;

    } else {
      // Si el producto está seleccionado, lo eliminamos
      this.selectedProduct.splice(index, 1);
      this.isSelectedEveryProduct[i] = false;
    }

    // Verificamos si todos los productos están seleccionados
    const allSelected = this.products().every((prod) =>
      this.selectedProduct.some((selected) => selected.id === prod.id)
    );

    // Actualizamos el estado de selección masiva
    this.isSelectAllProduct = allSelected;

    // Si se deselecciona un producto del hijo y el padre está seleccionado, deseleccionar el padre
    if (!this.isSelectedEveryProduct[i] && this.isSelectAllProduct) {
      this.isSelectAllProduct = false;
    }

    this.isBtnActive.massiveModification = this.selectedProduct.length > 1 ? true : false;
    this.isBtnActive.eliminate = this.selectedProduct.length > 0;
    this.isBtnActive.pause= this.selectedProduct.every(value => value.status !== 'inactive') && this.selectedProduct.length > 0;
    this.isBtnActive.reactivate = this.selectedProduct.every(value => 
      value.status === 'inactive' &&
      (
        (value.units && value.units > 0) || 
        (value.stock_status === 'instock')
      )
    ) && this.selectedProduct.length > 0;
    
    this.isBtnActive.modify = this.selectedProduct.length === 1 ? true : false;
    

  }


  PauseProduct() {

  }

  DeleteProduct() {

  }

  ModifyProduct() {

  }

  toggleMenuSearch() {
    this.showMenuSearch = !this.showMenuSearch;
  }

  showSearch(): boolean {
    return (this.hidenSearch = true);
  }

  hiddenSearch(): boolean {
    return (this.hidenSearch = false);
  }

  onInputChange(): void {
    this.showIcon = this.inputValue.trim().length > 0;
  }

  searchRecord(value: any) {
    this.searchValue.emit(value);
  }

  onItemChange(event: any) {
    console.log('Item seleccionado: ', event.value);
    // Aquí puedes realizar cualquier acción con el item seleccionado
  }

  clearInput(): void {
    this.inputValue = '';
    this.showIcon = false;
  }

  onPageChange(event: any) {
    this.paginationParams.page = event.page;
    this.paginationParams.rows = event.rows;
    this.paginationParams.first = event.first;

    this.changedPagination.emit(event);
  }

  toggleAccordeon(index: number, idProduct: string) {
    this.emitProduct.emit({ index, idProduct });

  }


}

interface EmitDetailProduct {
  idProduct: number;
  index: number;
}
