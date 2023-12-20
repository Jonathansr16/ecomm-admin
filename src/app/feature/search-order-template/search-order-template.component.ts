import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-order-template',
  templateUrl: './search-order-template.component.html',
  styleUrls: ['./search-order-template.component.scss']
})
export class SearchOrderTemplateComponent {

  @Input() searchTerm:   string        | undefined;
  hidenSearch: boolean = false;


  
  showSearch() : boolean {
    return  this.hidenSearch = true
    }

    hiddenSearch() : boolean {
      return this.hidenSearch = false;
    }
  
}
