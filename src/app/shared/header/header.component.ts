import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;
  activeBtn: boolean = false;

  show: boolean= false;
  
  //Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}


  ngOnInit(): void {
      this.menu = [
      
        {
          label: 'Perfil',
          icon: 'pi pi-fw pi-user'
        },

        {
          label: 'Configuraciones',
          icon: 'pi pi-fw pi-cog'
        },

        {
          label: 'Cerrar sesion',
          icon: 'pi pi-fw pi-power-off'
        },

       
      ];

  }


  showSearch(): void {
    this.activeBtn= true;
  }

  hiddenSearch():void {
    this.activeBtn= false;
  }

  showSidebar(show:boolean) {
    show = !this.show;
  }
}
