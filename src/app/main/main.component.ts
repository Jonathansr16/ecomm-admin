import { Component } from '@angular/core';


import { ThemeService } from '../core/services/theme.service';
import { HandlerHeaderService } from '../core/services/handlerHeader/handler-header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  {

  isSubMenuOpen: boolean = false;
  handlerSidebarTheme: boolean = false;
  show: boolean = false;

  //Sidebar toggle show hide function
  handlerOverlay: boolean = false;

  constructor( 
    private themeService: ThemeService,
    private sidebarService: HandlerHeaderService) {}


  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
}


sidebarVisible$ = this.sidebarService.sidebarVisibility$;

  ngOnDestroy(): void {
  
  }
}

export interface menu {
  label: string;
  link: string;
  icon: string;
  img?: string;
}
