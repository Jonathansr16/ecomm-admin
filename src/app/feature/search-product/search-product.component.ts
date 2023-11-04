import { Component } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  hidenSearch: boolean = false;

  text: string = "indique el numero de pedido"
  showSearch() : boolean {
    return  this.hidenSearch = true
    }
  
    hiddenSearch() : boolean {
      return this.hidenSearch = false;
    }
}
