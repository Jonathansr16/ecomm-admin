import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandlerHeaderService {

  constructor() { }

  private handlerSidebar = new BehaviorSubject<boolean>(false);
  sidebarVisibility$ = this.handlerSidebar.asObservable();


  toggleSidebar() : void {
    this.handlerSidebar.next(!this.handlerSidebar.value)
  }
 

}
