import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilter } from 'src/app/core/interface/search-filter.interface';
import { SearchMenuFilter } from 'src/app/core/interface/search-menu-filter.interface';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
@Component({
  selector: 'app-card-search',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule, FormsModule, ToastModule, MenuModule],
  styleUrl: './card-search.component.scss',
  templateUrl: './card-search.component.html',
})
export class CardSearchComponent {
  isDisabled = input.required<boolean>();
  @Output() searchValue = new EventEmitter<any>();
  changePlaceholderInput :SearchFilter = {
    value: 1,
    label: '',
    placeholder: 'Titulo, sku o #:'
  };

  changeLabelBtn = 'Todo';
  @Input() menuSearch :SearchMenuFilter[] = [];
  

  inputValue = '';
  hidenSearch = false;
  showIcon = false;
  showMenuSearch: boolean = false;
  isOptionActive = input.required<StatusBtn>();
  
  // menuFilter: any[] = [
  //   {
  //     label: 'Buscar por:',
  //     items: [

  //       {
  //         value: 0,
  //         label: 'Todo',
  //         placeholder: 'Buscar por titulo o sku'
  //       },

  //       {
  //         value: 1,
  //         label: 'Titulo',
  //       },
  //       {
  //         value: 2,
  //         label: 'Sku'
  //       },
  //       {
  //         value: 3,
  //         label: 'Codigo'
  //       }
  //     ]
  //   }
  // ];


  // inputPropertySearch: SearchFilter[] = [

  //   {
  //     label: 'Titulo',
  //     value: 1,
  //     placeholder: 'Buscar por Titulo'
  //   },

  //   {
  //       label: 'Sku',
  //       value: 2,
  //       placeholder: 'Buscar por Sku'
  //   },

  //   {
  //     label: 'Codigo',
  //     value: 3,
  //     placeholder: 'Busar por Codigo'
  //   }


  // ];



  constructor() {
    
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

  clearInput(): void {
    this.inputValue = '';
    this.showIcon = false;
  }

  searchRecord(value: any) {
    this.searchValue.emit(value);
  }


  toggleMenuSearch() {
    this.showMenuSearch = !this.showMenuSearch;
  }

  changeSearch(data: SearchMenuFilter): void {
    this.changePlaceholderInput.placeholder = data.placeholder;
    this.changeLabelBtn = data.label;
  
  }

  
}

