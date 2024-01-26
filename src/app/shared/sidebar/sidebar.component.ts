import { map } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { HandlerHeaderService } from 'src/app/core/services/handlerHeader/handler-header.service';
import { AuthService } from '@auth/services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarMenuComponent } from '@feature/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    MenuModule,
    PanelMenuModule,
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
  private unlistener!: () => void;


  //? MENU SECTION MAIN
  menuDataMain: SidebarMenu[] = [
    {
      iconLeft: 'home',
      label: 'Home',
      type: 'link',
      link: '/dashboard/home'
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
              link: ''
            }, 

            {
              iconLeft: 'local_mall',
              label: 'Pedidos',
              type: 'link',
              link: ''
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
              type: 'link'
            },
            {
              iconLeft: 'local_mall',
              label: 'Pedidos',
              type: 'link'

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
              link: '/dashboard/woocommerce/inventario'
            },

            {
              iconLeft: 'local_mall',
              label: 'Ordenes',
              type: 'link',
              link: '/dashboard/woocommerce/ordenes'
            },

            {
              iconLeft: 'group',
              label: 'Clientes',
              type: 'link',
              link: ''
            }
          ]
        }
      ]
    },

    {
      iconLeft: 'list_alt',
      label: 'Mi Inventario',
      type: 'link',
      link: ''
    },

    {
      iconLeft: 'description',
      label: 'Ordenes',
      type: 'link',
      link: ''
    },

    {
      iconLeft: 'receipt_long',
      label: 'Reportes',
      type: 'link',
      link: ''
    },

    {
      iconLeft: 'receipt_long',
      label: 'Facturación',
      type: 'link',
      link: ''
    },

    {
      iconLeft: 'local_shipping',
      label: 'Mis envios',
      type: 'link',
      link: ''
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
  ]

  handlerSidebar$ = this.hanlderSidebarService.sidebarVisibility$;

  constructor(
    private renderer2: Renderer2,
    private authService: AuthService,
    private router: Router,
    private hanlderSidebarService: HandlerHeaderService
  ) {}




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
    this.hanlderSidebarService.toggleSidebar();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  // ngAfterViewInit(): void {
  //   this.closeOutMenu();
  // }

  ngOnDestroy(): void {
    this.unlistener;
  }

 
}

export interface SidebarMenu {
  iconLeft?: string;
  label: string;
  iconRight?: string;
  items?: SidebarMenu[];
  type: 'button' | 'link';
  link?: string;
}
