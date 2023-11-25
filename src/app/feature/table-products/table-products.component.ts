import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TableProductsComponent {
  @Input() data: any;
  
  @Input() url = "";
  @Input() urlNewProduct = "";
  @Input() statusData: boolean | undefined;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();
  @ViewChild('searchProduct') search!: ElementRef;
  
  statusOperation : 'loading'| 'success' | 'error' | undefined;

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

