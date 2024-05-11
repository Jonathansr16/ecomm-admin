import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '@shared/sidebar/sidebar.service';
import { AuthService } from '@auth/services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarMenuComponent } from '@components/sidebar-menu/sidebar-menu.component';
import { SidebarMenu } from 'src/app/dashboard/interfaces/menuBar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    StyleClassModule,
    RouterModule,
    SidebarMenuComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService],
})
export class SidebarComponent implements OnDestroy {
  // @ViewChild('menu') menu?: ElementRef;
  @ViewChild('arrow') arrow?: ElementRef;

  // activeMenu = -1;
  // activeSubMenu = -1;
  isOpenMenu = false;
  isOpenSubMenu = false;
  // private unlistener!: () => void;


  //? MENU SECTION MAIN
  menuDataMain: SidebarMenu[] = [
    {
      iconLeft: 'home',
      label: 'Home',
      type: 'link',
      routerLink: '/dashboard/home'
    },

    {
      iconLeft: 'store',
      label: 'Tiendas',
      iconRight: 'navigate_next',
      type: 'button',
      items: [
        {
          iconLeft: 'storefront',
          label: 'Mely',
          iconRight: 'navigate_next',
          type: 'button',
          items: [
            {
              iconLeft: 'inventory_2',
              label: 'Inventario',
              type: 'link',
              routerLink: '/dashboard/mely/inventario',
              queryParams: {
                orders: 'total_sold_quantity_desc',
                offset: '0',
                limit: '10',
              }
            }, 

            {
              iconLeft: 'local_mall',
              label: 'Pedidos',
              type: 'link',
              routerLink: '/dashboard/mely/ordenes'
            }, 

            {
              iconLeft: 'contact_support',
              type: 'link',
              label: 'Preguntas'
            },

          ]
        },

        { 
          iconLeft: 'storefront',
          label: 'Amazon',
          iconRight: 'navigate_next',
          type: 'button',
          items: [
            {
              iconLeft: 'inventory_2',
              type: 'link',
              label: 'Inventario'
            },

            {
              iconLeft: 'storefront',
              type: 'link',
              label: 'Pedidos'
            }
          ]
        },

        {
          iconLeft: 'storefront',
          label: 'Claroshop',
          iconRight: 'navigate_next',
          type: 'button',
          items: [
            {
              iconLeft: 'inventory_2',
              label: 'Inventario',
              type: 'link',
              routerLink: '/dashboard/claroshop/inventario',
              queryParams: {
             
                page: '1',
             
              }
            },
            {
              iconLeft: 'local_mall',
              label: 'Ordenes',
              type: 'link',
              routerLink: '/dashboard/claroshop/ordenes',
              queryParams: {
                action: 'pendientes',
                page: 1,
                limit: '10'
              }

            }
          ]
        },

        {
          iconLeft: 'storefront',
          label: 'Woocommerce',
          iconRight: 'navigate_next',
          type: 'button',
          items: [
            {
              iconLeft: 'inventory_2',
              label: 'Inventario',
              type: 'link',
              routerLink: '/dashboard/woocommerce/inventario',
              queryParams: {
                page: '1',
                per_page: '10'
              }
            },

            {
              iconLeft: 'local_mall',
              label: 'Ordenes',
              type: 'link',
              routerLink: '/dashboard/woocommerce/ordenes',
              queryParams: {
                page: '1',
                per_page: '10',
                status: 'pending'
              }
            },

            {
              iconLeft: 'group',
              label: 'Clientes',
              type: 'link',
              routerLink: ''
            }
          ]
        }
      ]
    },

    {
      iconLeft: 'list_alt',
      label: 'Mi Inventario',
      type: 'link',
      routerLink: ''
    },

    {
      iconLeft: 'description',
      label: 'Ordenes',
      type: 'link',
      routerLink: ''
    },

    {
      iconLeft: 'receipt_long',
      label: 'Reportes',
      type: 'link',
      routerLink: ''
    },

    {
      iconLeft: 'receipt_long',
      label: 'Facturación',
      type: 'link',
      routerLink: ''
    },

    {
      iconLeft: 'local_shipping',
      label: 'Mis envios',
      type: 'link',
      routerLink: ''
    },

    {
      iconLeft: 'dashboard_customize',
      label: 'Integraciones',
      type: 'link'
    }

  ];

  //? MENU SECTION AYUDA
  menuDataHelp: SidebarMenu[] = [
    {
      iconLeft: 'help',
      label: 'Ayuda',
      type: 'link'
    }, 
    
    {
      iconLeft: 'support_agent',
      label: 'Soporte',
      type: 'link'
    },

    {
      iconLeft: 'build',
      label: 'Configuración',
      type: 'link'
    },

    {
      iconLeft: 'logout',
      label: 'Cerra Sesión',
      type: 'link'
    },
  ];

  // isSidebarCollapsed = false;

  // handlerSidebar$ = this.hanlderSidebarService.sidebarVisibility$;

  renderer2 = inject(Renderer2);
  authService  = inject(AuthService);
  router = inject(Router);
  sidebarService = inject(SidebarService);
  sidebarCollapse = this.sidebarService.sidebarCollapse;

  constructor() {}





  // toggleMenu(index: number) {
  //   if(this.activeMenu === index) {
  //     this.activeMenu = -1;
  //     this.activeSubMenu = -1;
  //   } else {
  //     this.activeMenu = index;
  //   }
  // }

  // toggleSubMenu(index: number) {
  //   if(this.activeSubMenu === index) {
  //     this.activeSubMenu = -1;
  //   } else {
  //     this.activeSubMenu = index;
  //   }
  // }

  toggleSidebar() {
    // this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarService.toggleSidebar();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  // ngAfterViewInit(): void {
  //   this.closeOutMenu();
  // }

  ngOnDestroy(): void {
    // this.unlistener;
  }

 
}

