import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SidebarMenu } from 'src/app/dashboard/interfaces/menuBar';
import { SidebarService } from '@shared/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {

  @Input() menuData: SidebarMenu[] = [];
  @Input() titleSection!: string;
  activeMenu = -1;
  activeSubMenu = -1;

  sidebarService = inject(SidebarService);
  hiddenMenu = this.sidebarService.sidebarCollapse;

  constructor() {}

  toggleMenu(index: number) {
    if(this.activeMenu === index) {
      this.activeMenu = -1;
      this.activeSubMenu = -1;
    } else {
      this.activeMenu = index;
    }
  }

  toggleSubMenu(index: number) {
    if(this.activeSubMenu === index) {
      this.activeSubMenu = -1;
    } else {
      this.activeSubMenu = index;
    }
  }


}

