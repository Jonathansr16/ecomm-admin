import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

@ViewChildren('menu') submenu?: QueryList<ElementRef>;

  profile: MenuItem[] | undefined;
  activeBtn: boolean = false;

  show: boolean= false;
  
  //Sidebar toggle show hide function
status = false;

constructor(private renderer2: Renderer2) {}



addToggle()
{
  this.status = !this.status;       
}


  ngOnInit(): void {
   

  }

  ngAfterViewInit(): void {
      this.showSubmenu()
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

  showSubmenu():void {

    this.submenu?.forEach(element => {
      const item = element.nativeElement;

      this.renderer2.listen(item, "click", () => {
        console.log('holi')
      })
    })
  }
}
