import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { HandlerHeaderService } from 'src/app/core/services/handlerHeader/handler-header.service';
import { AuthService } from '@auth/services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent implements AfterViewInit {

  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('arrow') arrow?: ElementRef;

  activeSubmenu: number = -1;
  isOpenMenu: boolean = false;


  private unlistener!: () => void;

  handlerSidebar$ = this.hanlderSidebarService.sidebarVisibility$;
  constructor(
    private renderer2: Renderer2,  
    private authService: AuthService,
    private router: Router,
    private hanlderSidebarService: HandlerHeaderService
    ) {}

  // handlerSidebar() {


    // if (this.toggleSidebar) {
    //   this.renderer2.addClass(this.arrow?.nativeElement, 'animateArrow');
    // } else {
    //   this.renderer2.removeClass(this.arrow?.nativeElement, 'animateArrow');
    // }


  // }

  toggleMenu() {
    this.isOpenMenu= !this.isOpenMenu;
  }

  toggleSubMenu(index: number) {
    if (this.activeSubmenu === index) {
          this.activeSubmenu = -1;
     
         
        } else {
          this.activeSubmenu = index;
         
        }
  }

  closeOutMenu() {
  
    const option =  this.menu?.nativeElement;
       
        const parent = this.renderer2.parentNode(option);
  
        this.unlistener = this.renderer2.listen('document', 'click', (event) => {
          
          if (!parent.contains(event.target)) {
           this.isOpenMenu = false;
            this.activeSubmenu = -1;
          }
  
          
        });
    
    }
  
    // hiddenSidebar() {
    //   this.toggleSidebar = false;
    //   this.handlerOverlay = false;
    
    
    // }

    toggleSidebar() {
      this.hanlderSidebarService.toggleSidebar();
    }
   
    cerrarSesion(): void {
      this.authService.logout();
      this.router.navigateByUrl('/auth');
    }

    
    ngAfterViewInit(): void {
      this.closeOutMenu();
    }

}
