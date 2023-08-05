import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MessageUser } from '../core/interface/message-user.model';
import { MessageUserService } from './services/message-user.service';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,AfterViewInit{

  @ViewChildren('menu') menu?: QueryList<ElementRef>
  @ViewChild('btnNotf') notf?: ElementRef;
  @ViewChild('notList') notfList?: ElementRef;
  constructor( private _messageUserService: MessageUserService ,private renderer2: Renderer2) { }

  sidebarVisible: boolean = false;
  activeBtn: boolean = false;
  show: boolean= false;
    //Sidebar toggle show hide function
  status = false;
  messageUser: MessageUser[] = [];
  date= new Date();
  items: MenuItem[] | undefined;

  notificationShow: boolean = false;

addToggle()
{
  this.status = !this.status;       
}

// showSubmenu(): void {

//   this.menu?.forEach(element => {

//     const item = element.nativeElement;
//     const submenu =  this.renderer2.nextSibling(item);
   
    
//     this.renderer2.listen(item, "click", () => {
//       console.log(item)
   
//       if(submenu.classList.contains('show')) {
//         this.renderer2.removeClass(submenu, 'show');
//       } else {
//         this.renderer2.addClass(submenu, 'show');
//       }

//     })
//   })
// }

showNotification(): void {

  const btn = this.notf?.nativeElement;
  const list = this.notfList?.nativeElement;
  this.renderer2.listen(btn, "click", () => {

   if( list.classList.contains('show')) {
    this.renderer2.removeClass(list, "show");
   } else{
    this.renderer2.addClass(list, "show");

   }

  })
}


isSubMenuOpen: boolean = false;

toggleSubMenu(): void {
  this.isSubMenuOpen = !this.isSubMenuOpen;
}

closeSubMenu(): void {
  this.isSubMenuOpen = false;
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
            routerLink: '/dashboard/woocommerce/productos',
            routerLinkActiveOptions: { exact: true },
            // items: [

            //   {
            //     label: 'Pedidos',
            //     icon: 'pi',
            //     routerLink: 'tiendas/woocommerce/pedidos'
            //   },

            //   {
            //     label: 'Clientes',
            //     icon: 'pi'
            //   },

            //   {
            //     label: 'Cupones',
            //     icon: 'pi'
            //   }
            // ]
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


    ]
}

ngAfterViewInit(): void {
    // this.showSubmenu();
    // this.showNotification();
}


}
