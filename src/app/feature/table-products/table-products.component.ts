import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [TableModule, CheckboxModule, ToastModule, TagModule, FormsModule, CommonModule, SkeletonModule, ButtonModule, InputTextModule],
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TableProductsComponent {

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();
  @ViewChild('searchProduct') search!: ElementRef;
  
//*new  logica
@Input() header: ColHeader[] = [];
@Input() dataStatus?: 'success' | 'loading' | 'error' | 'empty';
@Input() data: any;
@Input() url = "";
@Input() urlNewProduct = "";

  product!: Object;
  selectedProducts: any[] = [];
  items: MenuItem[] = [];
  @ViewChild('productos') productos: Table | undefined;
  checkboxValue: boolean = false;
  hidenSearch: boolean = false;
  dialogVisible: boolean = false;

  selectedIndex: number = -1; // Índice del elemento abierto, inicialmente ninguno
  searchText: string = '';

  constructor(private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }


  toggleAccordion(index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1; // Cierra el acordeón si ya está abierto
    } else {
      this.selectedIndex = index; // Abre el acordeón haciendo clic en un elemento
    }
  }


  addNewProduct() {
    this.router.navigateByUrl(this.urlNewProduct);
  }

  isItemOpen(index: number): boolean {
    return this.selectedIndex === index;
  }

  togglButtons(): void {
    this.checkboxValue = !this.checkboxValue;
  }

  clearTable(table: Table): void {
    table.clear();
    this.search.nativeElement.value = null;
  }

  viewProduct(id: number) {
    this.router.navigate( [this.url, id])
  }
  
  newProduct() {
    this.router.navigateByUrl(this.url);
  }

  editProduct() {
    this.router.navigateByUrl(this.url);
  }
  showSearch() : boolean {
  return  this.hidenSearch = true
  }

  hiddenSearch() : boolean {
    return this.hidenSearch = false;
  }

  deletedSelectedProducts() {
   this.confirmationService.confirm({
    message: '¿Esta seguro de eliminar este producto seleccionado?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
    }

   })
  }

  deleteProduct(product: any) {
   
    
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar ' + product.name + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.onDelete.emit(product);
     
          this.data = this.data.filter( (val: any) => val.id !== product.id);
          this.product = {};
          this.selectedProducts = [];
          console.log('Operación realizada con exito:')
          this.messageService.add({ key: 'tc',severity: 'success', summary: 'Exito', detail: 'Producto Eliminado con exito', life: 3000 });
        
      }
  });
   
    
  }

getProduct() {
  console.log(this.selectedProducts)
}

  showDialog() {
    this.dialogVisible = true;    
  }


  searchFilter($event: any, value: string) {
    this.productos?.filterGlobal(($event.target as HTMLInputElement).value, value)
  } 


  
 
}


export interface Column {
  field: string;
  header: string;
}

export interface ColHeader {
  header: string;
}

export interface statusData {
  status: 'completed' | 'loading' | 'error' | 'empty';
}