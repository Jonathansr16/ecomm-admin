import { Component, inject } from '@angular/core';


import { ThemeService } from '../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { RouterModule} from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarService } from '@shared/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, SidebarComponent, NavbarComponent, ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  

})
export default class DashboardComponent  {

  isSubMenuOpen: boolean = false;
  handlerSidebarTheme: boolean = false;
  show: boolean = false;

  //Sidebar toggle show hide function

  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  sidebarVisible = this.sidebarService.sidebarCollapse;
  handlerOverlay = this.sidebarService.sidebarCollapse;
  

  constructor( ) {}

changeTheme(theme: string) {
  this.themeService.switchTheme(theme);
}

  ngOnDestroy(): void {
  
  }
}

