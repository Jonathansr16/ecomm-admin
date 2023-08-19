import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductosTable } from 'src/app/core/interface/productos-table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: any;
  @Input() addProductLink: any;
  @Output() product: EventEmitter<any> | undefined;
  selectedProduct: ProductosTable[] | undefined;
  checkboxValue: boolean= false;


  constructor() {

 
 
  }


  togglButtons(): void {
    this.checkboxValue= !this.checkboxValue;
  }

}
