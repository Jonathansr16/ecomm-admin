import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.scss'],
})
export class PanelLeftComponent implements OnInit {
  @Output() showSidebar?: EventEmitter<boolean>;
  @Input() show?: boolean;
  sidebarVisible: boolean = false;
  menu: MenuItem[] | undefined;
  constructor() {
    this.showSidebar = new EventEmitter();
  }

  ngOnInit(): void {
    this.menu = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard/home'],
      },

      {
        label: 'Mis tiendas',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Mercado libre',
            icon: 'pi pi-fw pi-plus',
          },
          {
            label: 'Amazon',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'ClaroShop',
            icon: 'pi pi-fw pi-external-link',
          },

          {
            label: 'WooCommerce',
            icon: 'pi pi-fw pi-external-link',
            routerLink: ['/dashboard/tiendas/woocommerce']
          },
        ],
      },

      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Pedidos pendientes',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Pedidos entregados',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Devoluciones',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Preguntas',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },

      {
        label: 'Inventario',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Registrar producto',
            icon: 'pi pi-fw pi-align-right',
          },

          {
            label: 'Administrar todo el inventario',
            icon: '',
          },

          {
            label: 'Buscar producto',
            icon: '',
          },
        ],
      },

      {
        label: 'Reportes',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Ventas',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-user-minus',
          },
        ],
      },

      {
        label: 'Mis envios',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: '  Crear envio',
            icon: 'pi pi-fw pi-pencil',
          },
          {
            label: 'Cotizador',
            icon: 'pi pi-fw pi-calendar-times',
          },

          {
            label: 'Historial de envios',
            icon: 'pi pi-fw pi-calendar-times',
          },
        ],
      },

      {
        label: 'Facturación',
        icon: 'pi pi-fw pi-calculator',
      },

      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
  showSide(): void {
    this.showSidebar?.emit(this.show);
  }
}
