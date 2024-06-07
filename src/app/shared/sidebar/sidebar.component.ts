import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
  viewChild,
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
import { BadgeModule } from 'primeng/badge';
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
    SidebarMenuComponent,
    BadgeModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService],
})
export class SidebarComponent implements OnDestroy {
  // @ViewChild('menu') menu?: ElementRef;
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
      routerLink: '/dashboard/home',
      isBadge: false,
    },

    {
      iconLeft: 'store',
      label: 'Tiendas',
      iconRight: 'navigate_next',
      type: 'button',
      isBadge: true,
      badgeClass: 'bg-red-500 text-white',
      badegeCount: 30,
      items: [
        {
          iconLeft: 'storefront',
          label: 'Mely',
          iconRight: 'navigate_next',
          type: 'button',
          isBadge: true,
          badgeClass: 'bg-yellow-300 text-black',
          badegeCount: 10,
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
              },
              isBadge: false
            }, 

            {
              iconLeft: 'local_mall',
              label: 'Ordenes',
              type: 'link',
              routerLink: '/dashboard/mely/ordenes',
              queryParams: {
                limit: '10',
                offset: '0',
                sort: 'date_desc',
              },
              isBadge: true,
              badgeClass: 'bg-yellow-300 text-black',
              badegeCount: 3,
            }, 

            {
              iconLeft: 'contact_support',
              type: 'link',
              label: 'Preguntas',
              isBadge: true,
              badgeClass: 'bg-yellow-300 text-black',
              badegeCount: 2,
              routerLink: '/dashboard/mely/preguntas',
              queryParams: {
                sort_fields: 'date_created',
                sort_types: 'DESC',
                limit: 10,
                offset: 0
              }
            },

          ]
        },

        { 
          iconLeft: 'storefront',
          label: 'Amazon',
          iconRight: 'navigate_next',
          type: 'button',
          isBadge: true,
          badgeClass: 'bg-orange-500 text-white',
          badegeCount: 6,
          items: [
            {
              iconLeft: 'inventory_2',
              type: 'link',
              label: 'Inventario',
              isBadge: false
            },

            {
              iconLeft: 'storefront',
              type: 'link',
              label: 'Ordenes',
              isBadge: true,
              badgeClass: ''
            }
          ]
        },

        {
          iconLeft: 'storefront',
          label: 'Claroshop',
          iconRight: 'navigate_next',
          type: 'button',
          isBadge: true,
          badgeClass: 'bg-red-500 text-white',
          badegeCount: 9,
          items: [
            {
              iconLeft: 'inventory_2',
              label: 'Inventario',
              type: 'link',
              routerLink: '/dashboard/claroshop/inventario',
              queryParams: {
                page: '1',
              },
              isBadge: false
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
              },
              isBadge: true,
              badgeClass: ''
            }
          ]
        },

        {
          iconLeft: 'storefront',
          label: 'Woocommerce',
          iconRight: 'navigate_next',
          type: 'button',
          isBadge: true,
          badgeClass: 'bg-purple-500 text-white',
          badegeCount: 5,
          items: [
            {
              iconLeft: 'inventory_2',
              label: 'Inventario',
              type: 'link',
              routerLink: '/dashboard/woocommerce/inventario',
              queryParams: {
                page: '1',
                per_page: '10'
              },
              isBadge: false,
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
              },
              isBadge: true,
              badgeClass: ''
            },

            {
              iconLeft: 'group',
              label: 'Clientes',
              type: 'link',
              routerLink: '',
              isBadge: false
            },
            
          ]
        }
      ]
    },

    {
      iconLeft: 'list_alt',
      label: 'Mi Inventario',
      type: 'link',
      routerLink: '/dashboard/mi-inventario',
      isBadge: false
    },

    {
      iconLeft: 'description',
      label: 'Ordenes',
      type: 'link',
      routerLink: '/dashboard/all-orders',
      isBadge: true,
      badgeClass: '',
      badegeCount: 20
    },

    {
      iconLeft: 'receipt_long',
      label: 'Reportes',
      type: 'link',
      routerLink: '',
      isBadge: false
    },

    {
      iconLeft: 'receipt_long',
      label: 'Facturación',
      type: 'link',
      routerLink: '',
      isBadge: true,
      badgeClass: '',
      badegeCount: 7
    },

    {
      iconLeft: 'local_shipping',
      label: 'Mis envios',
      type: 'link',
      routerLink: '',
      isBadge: false
    },

    {
      iconLeft: 'dashboard_customize',
      label: 'Integraciones',
      type: 'link',
      routerLink: '/dashboard/integraciones/mi-integraciones',
      isBadge: false
    }

  ];

  //? MENU SECTION AYUDA
  menuDataHelp: SidebarMenu[] = [
    {
      iconLeft: 'help',
      label: 'Ayuda',
      type: 'link',
      routerLink: '/dashboard/ayuda/ayuda',
      isBadge: false
    }, 
    
    {
      iconLeft: 'support_agent',
      label: 'Soporte',
      type: 'link',
      isBadge: false
    },

    {
      iconLeft: 'build',
      label: 'Configuración',
      type: 'link',
      isBadge: false,
    },

    {
      iconLeft: 'logout',
      label: 'Cerra Sesión',
      type: 'link',
      isBadge: false
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

    this.renderer2
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

