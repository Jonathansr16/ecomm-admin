import { Component, OnInit } from '@angular/core';
import { breadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{

  breadcrumb: breadcrumbItem[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.breadcrumb = this.breadcrumbService.getBreadcrumbs();
  }
}
