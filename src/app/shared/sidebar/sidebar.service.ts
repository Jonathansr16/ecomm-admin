import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  // private handlerSidebar = new BehaviorSubject<boolean>(false);
  // sidebarVisibility$ = this.handlerSidebar.asObservable();
  public sidebarCollapse = signal(false);
  // toggleSidebar() : void {
  // }

  toggleSidebar() {
  //this.handlerSidebar.next(!this.handlerSidebar.value)
  // this.sidebarCollapse.set(!this.sidebarCollapse())

    this.sidebarCollapse.update( (value: boolean) => !value);
  }
 


}
