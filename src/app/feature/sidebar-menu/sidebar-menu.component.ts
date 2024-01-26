import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HandlerHeaderService } from 'src/app/core/services/handlerHeader/handler-header.service';

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
  hiddenMenu$ = this.hanlderHeader.sidebarVisibility$;
  activeMenu = -1;
  activeSubMenu = -1;

  constructor(private hanlderHeader: HandlerHeaderService) {}

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

export interface SidebarMenu {
  iconLeft?: string;
  label: string;
  iconRight?: string;
  items?: SidebarMenu[];
  type: 'button' | 'link';
  link?: string;
}
