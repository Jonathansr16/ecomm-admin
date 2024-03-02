import { Component, Input, ViewEncapsulation } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MenuModule, CheckboxModule],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CardProductComponent {
  
  @Input() menu: MenuItem[] = [];
  @Input() outOfStock: boolean = false;
  @Input() product: any;




}
