import { Injectable } from '@angular/core';
import { breadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

 private breadcrumbs: breadcrumbItem[] = [];

  getBreadcrumbs(): breadcrumbItem[] {
    return this.breadcrumbs;
  }

  addBreadcrumbs(item: breadcrumbItem): void {
    this.breadcrumbs.push(item);
  }

  constructor() { }
}

