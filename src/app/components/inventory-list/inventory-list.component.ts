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
  isOpen: boolean[] = [];
  totalRecords = input.required<number>();

  //multiple
  @Input() statusProductsExtraInfo: StatusData[] = [];
  @Input() productsExtraInfo: ProductInventory[] = [];

  menuSearch = input<SearchMenuFilter[]>();
  // totalRecords = input.required<number>();
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 1,
  };
  menuProduct = input.required<MenuItem[]>();

  searchValue = output<string>();
  changeLabelValue = output<'todo' | 'title' | 'id' | 'sku'>();
  changedPagination = output<PaginationParams>();
  emitProduct = output<any>();

  perPageOptions: number[] = [10, 20, 30, 50];

  menu: MenuItem[] = [];
  handlerOptionBtn: StatusBtn = {
    pause: false,
    modify: false,
    eliminate: false,
    massiveModification: false,
  };

  isBtnActive: StatusBtn = {
    pause: false,
    modify: false,
    eliminate: false,
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
    } else {
      // Si se deselecciona la opción masiva, limpiar la lista de productos seleccionados
      this.selectedProduct = [];
      this.isSelectedEveryProduct = this.products().map(() => false);
      this.isBtnActive.massiveModification = false;
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

  toggleAccordeon(index: number, idProduct: number) {
    // this.isOpen[index] = !this.isOpen[index];

    if (!this.productsExtraInfo![index]) {
      this.emitProduct.emit({ index, idProduct });
    }
  }

  // emitProducto(i: number, id: any) {
  //   if(this.productsExtraInfo[i] !== this.products()[i]) {
  //     this.productsExtraInfo[i] = this.pro
  //   } else {
  //     this.emitProduct.emit(id);
  //     this.statusProductsExtraInfo[i].status = 'loading'
  //   }
  // }
}

interface EmitDetailProduct {
  idProduct: number;
  index: number;
}
