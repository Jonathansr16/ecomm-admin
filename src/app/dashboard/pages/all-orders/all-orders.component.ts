import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonModule,
    TableModule,
    ToastModule,
  TagModule,
  ],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export default class AllOrdersComponent { 

  breadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Todas las ordenes',
    separator: true,
  };

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'storefront',
      label: 'Dashboard',
      separator: true,
    },

  

    {
      icon: 'list_alt',
      label: 'Todas las ordenes',
    },
  ];

  orders: any[] = [];
  selectedProducts!: any[] | null;


  getMelyOrdersByStatus() {

  }

  getClaroOrdersByStatus() {

  }

  getWooOrdersByStatus() {

  }

  getWalmartOrdersByStatus() {

  }

  getAmazonOrdersByStatus() {
    
  }

  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';

        default :
        return 'si'

        
    }
}
}
