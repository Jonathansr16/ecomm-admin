import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
})
export class TableProductsComponent {
  @Input() data: any;
  @Input() addProductLink: string | undefined;
  
  @Input() isLoading: boolean | undefined;
  @Input() url: string = "";

  @Output() productSelected: EventEmitter<number>;

  @ViewChild('searchProduct') search!: ElementRef;

  selectedProduct: ProductosTable[] | undefined;
  checkboxValue: boolean = false;
  items: MenuItem[] = [];

  

  constructor(private router: Router) {
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

    this.productSelected = new EventEmitter();
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
}
