import { ProductInventory } from '@components/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardSearchComponent } from '@components/card-search/card-search.component';
import { ButtonModule } from 'primeng/button';
import { SearchMenuFilter } from '@components/interfaces/search-menu-filter.interface';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { StatusData } from '@components/interfaces/status-data.interface';
import { CardProductComponent } from './card-product/card-product.component';

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
    CardProductComponent
  ],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent {
  statusProducts = input.required<StatusData>();
  
  products = input.required<ProductInventory[]>();
  @Input() statusProductsExtraInfo: StatusData[] = [];
  @Input() productsExtraInfo: ProductInventory[] = [];

  menuSearch = input<SearchMenuFilter[]>();
  totalRecords = input.required<number>();
  paginationParams = input.required<PaginationParams>();
  menuProduct = input.required<MenuItem[]>();

  
   searchValue = output<string>();
   changeLabelValue = output<'todo' | 'title' | 'id' | 'sku'>();
  // changeValueLabel = output<'todo' | 'title' | 'id' | 'sku'>();
  changedPagination = output<PaginationParams>();
  emitProduct = output<EmitDetailProduct>();

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

  isOpen: boolean[] = [];
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
  // productsExtraInfo: ProductInventory[] = [];
  // statusProductsExtraInfo: StatusData[] = [];


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

  // toggleEveryProduct(product: ProductInventory): void {
  //   // Verificar si el producto está seleccionado y agregarlo o eliminarlo según sea necesario
  //   const index = this.selectedProduct.findIndex(
  //     (selectedItem: ProductInventory) => selectedItem.id === product.id
  //   );

  //   if (index === -1) {
  //     this.selectedProduct = [product];
  //   } else {
  //     this.selectedProduct.splice(index, 1);
  //   }

  //   // Verificar si todos los elementos de la parte inferior están seleccionados
  //   const allSelected = this.products().every((product) =>
  //     this.selectedProduct.some(
  //       (selectedOrder) => selectedOrder.id === product.id
  //     )
  //   );

  //   this.handlerOptionBtn.pause = this.selectedProduct.every(
  //     (option) => option.status === 'active'
  //   );
  //   this.handlerOptionBtn.modify = this.selectedProduct.length === 1;
  //   this.handlerOptionBtn.massiveModification =
  //     this.selectedProduct.length >= 2;
  //   this.handlerOptionBtn.eliminate = this.selectedProduct.length >= 1;

  //   // Actualizar el estado de selección masiva
  //   this.isSelectAllProduct = allSelected;

  //   // Si se deselecciona un elemento de la parte superior, quitar el check de la opción masiva
  //   if (!this.isSelectAllProduct) {
  //     this.isSelectAllProduct = false;
  //   }
  // }


 
  toggleEveryProduct(product: ProductInventory, i: number): void {
    const index = this.selectedProduct.findIndex((selected) => selected.id === product.id);
  
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
    // this.searchedData.emit()
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
    this.paginationParams().page = event.page + 1;
    this.paginationParams().rows = event.rows;
    this.paginationParams().first = event.first;

    this.changedPagination.emit(this.paginationParams());
  }

  //  collapseContent(index: number, idProduct: number) {
  //    if (this.selectedIndex === index) {
  //      this.selectedIndex = -1; // Cierra el acordeón si ya está abierto
  //   } else {
  //     this.selectedIndex = index;
  //     if(!this.productsExtraInfo![index]) {
  //      this.emitProduct.emit({index, idProduct});
    
  //     } 
  //   }
  //  }

  // isCollapsing(index: number): boolean {
  //   return this.selectedIndex === index;
  // }

  toggleAccordeon(index: number, idProduct: number) { 

    this.isOpen[index] = !this.isOpen[index];

    if( this.isOpen[index] && !this.productsExtraInfo![index]) {
      this.emitProduct.emit({index, idProduct});
    } 
  }

}



interface EmitDetailProduct {
  idProduct: number;
  index: number;
}
