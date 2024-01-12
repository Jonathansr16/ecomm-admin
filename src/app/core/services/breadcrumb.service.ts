import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

 private breadcrumbs: BreadcrumbItem[] = [];

  getBreadcrumbs(): BreadcrumbItem[] {
    return this.breadcrumbs;
  }

  addBreadcrumbs(item: BreadcrumbItem): void {
    this.breadcrumbs.push(item);
  }

  // addBreadcrumbs(items: BreadcrumbItem[]): void {
  //   this.breadcrumbs = items;
  // }

  constructor() { }
}

export interface BreadcrumbItem {
  titleMain: string;
  breadCrumbLink: BreadCrumbLink[];
}

export interface BreadCrumbLink {
  iconClass: string;
  titleLink: string;
  separatorClass?: string;
}