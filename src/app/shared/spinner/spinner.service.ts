import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

 private visibility$ = new BehaviorSubject<boolean>(false);

  show(): void {
    this.visibility$.next(true);
  }

  hide(): void {
    this.visibility$.next(false)
  }

  getSpinnerState() {
    return this.visibility$.asObservable();
  }

 
}
