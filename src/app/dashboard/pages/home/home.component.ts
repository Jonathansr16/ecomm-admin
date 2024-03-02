import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatsComponent } from '@components/card-stats/card-stats.component';
import { InputTextModule } from 'primeng/inputtext';
import { homeAyuda } from 'src/app/core/interface/ayuda.model';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbComponent, CardStatsComponent, FormsModule, InputTextModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  dataAuth: any = {}
  ayuda: homeAyuda[] = [];
  visible: boolean = false;

  breadcrumbHome: BreadcrumbItem = {
    icon: 'space_dashboard',
    label: 'Dashboard',
    separator: true
  }

  breadcrumbItems: BreadcrumbItem[] = [

    {
      icon: 'home',
      label: 'Home',
      separator: false,
      url: '/dashboard/home'
      
    }

  ];

  constructor() {

  
  }

  ngOnInit(): void {
   
  }

  showDialog() {
    this.visible = true;
  }


}
