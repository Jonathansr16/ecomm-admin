import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '../interface/breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

 private breadcrumbs: BreadcrumbItem[] = [];

  getBreadcrumbs(): BreadcrumbItem[] {
    return this.breadcrumbs;
  }

  setBreadcrumbs(items: BreadcrumbItem[]): void {
    this.breadcrumbs = items;
  }


  // addBreadcrumbs(items: BreadcrumbItem[]): void {
  //   this.breadcrumbs = items;
  // }

  constructor() { }
}




