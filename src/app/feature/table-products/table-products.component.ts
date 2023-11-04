import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TableProductsComponent {
  @Input() data: any;
  selectedProducts!: any[] | null;
  @Input() addProductLink: string | undefined;
  @Input() isLoading: boolean | undefined;
  @Input() url: string = "";


  @ViewChild('searchProduct') search!: ElementRef;

  checkboxValue: boolean = false;
  items: MenuItem[] = [];

  hidenSearch: boolean = false;
 
  constructor(private router: Router, private messageService: MessageService, private confirmService: ConfirmationService) {
    this.items = [
      {
        label: 'Subir de manera manual',
        icon: 'pi pi-pencil',
        routerLink: '/dashboard/woocommerce/new-product',
      },

      {
        label: 'Subir de manera masivas',
        icon: 'pi pi-file-import',
      },
    ];

   

  }

  togglButtons(): void {
    this.checkboxValue = !this.checkboxValue;
  }

  clearTable(table: Table): void {
    table.clear();
    this.search.nativeElement.value = '';
  }

  viewProduct(id: number) {
    this.router.navigate( [this.url, id])
  }

  showSearch() : boolean {
  return  this.hidenSearch = true
  }

  hiddenSearch() : boolean {
    return this.hidenSearch = false;
  }

  deletedSelectedProducts() {
   this.confirmService.confirm({
    message: '¿Esta seguro de eliminar este producto seleccionado?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.data = this.data.filter((val : any) => !this.selectedProducts?.includes(val));
      this.selectedProducts = null;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

   })
  }

}
