import { Component, ViewChild } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InventarioComponent {

  products: any[] = [];
  selectedProducts: any[] = [];
  statusData: boolean = true;
  dialogVisible: boolean = false;

  searchText: string = '';

  @ViewChild('productos') productos: Table | undefined;

  constructor(private claroService: ClaroService, private confirmationService: ConfirmationService) { }

  getProducts() {
    this.claroService.getProducts().subscribe({
      next: (data) => {
        this.products = data.productos;
        console.log(data);
        this.statusData = false;
      },
      error: (msgErorr) => {
        console.log(msgErorr);
        this.statusData = false;
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProducts();
  }

  clearTable(table: Table): void {
    table.clear();
  }

  searchFilter($event: any, value: string) {
    this.productos?.filterGlobal(($event.target as HTMLInputElement).value, value)
  } 
  
}
