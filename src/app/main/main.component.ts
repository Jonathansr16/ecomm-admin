import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { MessageUser } from '../core/interface/message-user.model';
import { MessageUserService } from './services/message-user.service';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('arrow') arrow?: ElementRef;
  @ViewChild('btnNotf') btnNotf?: ElementRef;
  @ViewChild('notfContainer') notfContainer?: ElementRef;
  @ViewChild('menu') menu?: ElementRef;

  isSubMenuOpen: boolean = false;
  sidebarVisible: boolean = false;
  sidebarVisible2: boolean = false;
  showNotf: boolean = false;
  show: boolean = false;
  isOpenMenu: boolean = false;
  //Sidebar toggle show hide function
  toggleSidebar = false;
  messageUser: MessageUser[] = [];
  menuProfile: menu[] = [];
  date = new Date();
  notificationShow: boolean = false;
  activeSubmenu: number = -1;
  

  private unlistener!: () => void;

  constructor(
    private _messageUserService: MessageUserService,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private renderer2: Renderer2,
  ) {}

  addToggle() {
    this.toggleSidebar = !this.toggleSidebar;

    if (this.toggleSidebar) {
      this.renderer2.addClass(this.arrow?.nativeElement, 'animateArrow');
    } else {
      this.renderer2.removeClass(this.arrow?.nativeElement, 'animateArrow');
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

  

  toggleNotf(): void {
    const notfBox = this.notfContainer?.nativeElement;

    this.showNotf = !this.showNotf;

    if (this.showNotf) {
      this.renderer2.addClass(notfBox, 'show');
    } else {
      this.renderer2.removeClass(notfBox, 'show');
    }
  }

  closeNotf(): void {
    const notfContent = this.notfContainer?.nativeElement;

    this.unlistener = this.renderer2.listen(notfContent, 'click', (event) => {
      if (!notfContent.contains(event.target)) {
        this.renderer2.removeClass(notfContent, 'show');
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
}





  ngOnInit(): void {
    this.messageUser = this._messageUserService.getMessageUser();

    this.menuProfile = [
      {
        label: 'Perfil',
        link: '/perfil',
        icon: 'badge',
      },

      {
        label: 'Configuraciones',
        link: '/perfil',
        icon: 'settings',
      },

      {
        label: 'Cerrar sesión',
        link: '/auth/login',
        icon: 'logout',
      },
    ];
  }

  ngAfterViewInit(): void {
    
    this.closeOutMenu();
  }

  ngOnDestroy(): void {
    this.unlistener();
  }
}

export interface menu {
  label: string;
  link: string;
  icon: string;
  img?: string;
}
