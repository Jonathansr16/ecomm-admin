import { Component, EventEmitter, Output, effect, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import type { MyButtonInterface } from 'src/app/dashboard/interfaces/button.interface';
@Component({
  selector: 'app-card-search',
  standalone: true,
  imports: [MenuModule, ButtonModule, FormsModule],
  styleUrl: './card-search.component.scss',
  templateUrl: './card-search.component.html',
})
export class CardSearchComponent {
  isDisabled = input.required<boolean>();

  @Output() searchValue = new EventEmitter<any>();
  inputValue = '';
  hidenSearch = false;
  showIcon = false;

  isOptionActive = input.required<StatusBtn>();
  


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

  
}
