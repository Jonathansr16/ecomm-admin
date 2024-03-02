import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULES OF NGPRIME
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MessageUser } from 'src/app/core/interface/message-user.model';
// import { menu } from '@main/main.component';
// import { MessageUserService } from '@main/services/message-user.service';
import { HandlerHeaderService } from 'src/app/core/services/handlerHeader/handler-header.service';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { MessageUserService } from 'src/app/dashboard/services/message-user.service';
import { menu } from 'src/app/dashboard/interfaces/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, SidebarModule, BadgeModule, DividerModule, ButtonModule, AvatarModule, TooltipModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('btnNotf') btnNotf?: ElementRef;
  @ViewChild('notfContainer') notfContainer?: ElementRef;


  @Input() handlerOverlay: boolean | undefined;


  messageUser: MessageUser[] = [];
  menuProfile: menu[] = [];
  date = new Date();
  notificationShow: boolean = false;
  showNotf: boolean = false;



  private unlistener!: () => void;




  constructor(
    private _messageUserService: MessageUserService,
    private renderer2: Renderer2,
    private handlerHeaderService: HandlerHeaderService) {

  }


  toggleSidebar() {
    this.handlerHeaderService.toggleSidebar()
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

ngOnDestroy(): void {
    this.unlistener;
}


}

