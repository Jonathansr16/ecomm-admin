import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductCardComponent {
  
  @Input() menu: MenuItem[] = [];
  @Input() outOfStock: boolean = false;

}
