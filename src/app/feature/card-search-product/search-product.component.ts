import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-card-search-product',
  standalone: true,
  imports: [CommonModule, CheckboxModule],
  templateUrl: './card-search-product.component.html',
  styleUrls: ['./card-search-product.component.scss']
})
export class CardSearchProductComponent {}
