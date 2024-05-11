import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { Orders } from 'src/app/core/interface/orders.interface';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registra el idioma español
registerLocaleData(localeEs);

@Component({
  selector: 'app-card-order',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    MenuModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Configura el idioma por defecto como español
  ],
  templateUrl: './card-order.component.html',
  styleUrl: './card-order.component.scss',
})
export class CardOrderComponent {
  order = input.required<Orders>();
  menuOrder = input.required<MenuItem[]>();
  isSelectedOrder = input.required<boolean>();
  isCollapsing: boolean = false;
  onChangeValue = output<Orders>();

  emitId = output<any>();
}
