import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { MenuItem } from 'primeng/api';
import { MessageUserService } from '@main/services/message-user.service';
import { MessageUser } from './core/interface/message-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'servitaeApp';

  items: MenuItem[] | undefined;
  messageUser: MessageUser[] = [];
  //Sidebar toggle show hide function
  status = false;
  date= new Date();
  sidebarVisible: boolean = false;
  constructor(private themeService: ThemeService, private _messageUserService: MessageUserService ) {}

  changeTheme(theme:string): void {
    this.themeService.switchTheme(theme);
  }
  addToggle()
{
  this.status = !this.status;       
}

  ngOnInit(): void {
   
    this.messageUser = this._messageUserService.getMessageUser();

   
    this.items= [
      {
        label: 'Home',
        icon: 'pi pi-home', 
        routerLink: '/dashboard/home/',
        routerLinkActiveOptions: { exact: true }
      },

      {
        label: 'Tiendas',
        icon: 'pi pi-box',
        items: [

          {
            label: 'Mercado libre',
            icon: 'pi pi-tag'
          },

           {
            label: 'Amazon',
            icon: 'pi pi-amazon'
          },

           {
            label: 'Claro Shop',
            icon: 'pi pi-tag'
          },

          {
            label: 'Woocommerce',
            icon: 'pi pi-tag',
            routerLink: 'tiendas/woocommerce/productos',
            routerLinkActiveOptions: { exact: true },
            items: [

              {
                label: 'Pedidos',
                icon: 'pi',
                routerLink: 'tiendas/woocommerce/pedidos'
              },

              {
                label: 'Clientes',
                icon: 'pi'
              },

              {
                label: 'Cupones',
                icon: 'pi'
              }
            ]
          }
        ]
      },

      {
        label: 'Ventas',
        icon: 'pi pi-percentage',
  
      },

      {
        label: 'Inventario',
        icon: 'pi pi-copy'
      },

       {
        label: 'Mensajes',
        icon: 'pi pi-comments'
      }, 

      {
        label: 'Reportes',
        icon: 'pi pi-comments'
      }, 

      {
        label: 'Facturación',
        icon: 'pi pi-comments'
      }, 

      {
        label: 'Ayuda',
        icon: 'pi pi-comments'
      }, 


      {
        label: 'Envios',
        icon: 'pi pi-truck'
      },


    ];
  }
}

