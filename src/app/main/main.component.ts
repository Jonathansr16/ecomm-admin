import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { MessageUser } from '../core/interface/message-user.model';
import { MessageUserService } from './services/message-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,AfterViewInit{

  @ViewChild('sidebar') sidebar?: ElementRef;
  isSubMenuOpen: boolean = false;
  

  constructor( private _messageUserService: MessageUserService ,private renderer2: Renderer2) { }

  sidebarVisible: boolean = false;
  show: boolean= false;
    //Sidebar toggle show hide function
  status = false;
  messageUser: MessageUser[] = [];
  date= new Date();
  notificationShow: boolean = false;
  activeSubMenuIndex: number = -1;


addToggle()
{
  this.status = !this.status;       
}


toggleSubMenu(): void {
  this.isSubMenuOpen = !this.isSubMenuOpen;
}

@HostListener('document:click', ['$event'])
closeSubMenu(event: any) {
 
  if(!this.sidebar?.nativeElement.contains(event.target)){
    
   this.activeSubMenuIndex = -1;

  } 
  
}



toggleSubmenu(index: number) {

  if (this.activeSubMenuIndex === index) {
    this.activeSubMenuIndex = -1;
  } else {
    this.activeSubMenuIndex = index;
  }
}

ngOnInit(): void {
    this.messageUser = this._messageUserService.getMessageUser();

    
}

ngAfterViewInit(): void {

}







}

export interface menu {
  label: string;
  link: string;
  icon: string;
  img?: string;
}
