import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MessageUser } from '../core/interface/message-user.model';
import { MessageUserService } from './services/message-user.service';

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

  //time of message of clients
  date = new Date();
  messageUser: MessageUser[] = [];

  //SHOW NOTIFICACIONES
 showNotf: boolean= false;

  notificationShow: boolean = false;

addToggle()
{
  this.status = !this.status;       
}

showSubmenu(): void {

  this.menu?.forEach(element => {

    const item = element.nativeElement;
    const submenu =  this.renderer2.nextSibling(item);

    
    this.renderer2.listen(item, "click", () => {
    
      if(submenu.classList.contains('show')) {
        this.renderer2.removeClass(submenu, 'show');
      } else {
        this.renderer2.addClass(submenu, 'show');

      }

    })
  })
}

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

ngOnInit(): void {
    this.messageUser = this._messageUserService.getMessageUser();
}
ngAfterViewInit(): void {
    this.showSubmenu();
    this.showNotification();
}
}
