import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@ViewChildren('menu') menu?: QueryList<ElementRef>;

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
