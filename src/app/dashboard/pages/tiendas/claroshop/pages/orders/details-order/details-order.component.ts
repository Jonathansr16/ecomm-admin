import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { OrderDetailsComponent } from '@components/order-details/order-details.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { OrderDetails } from 'src/app/core/interface/order-details.interface';
import { StatusData } from '../../../../../../../core/interface/status-data.interface';

@Component({
  selector: 'app-details-order',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonModule,
    OrderDetailsComponent
  ],
  templateUrl: './details-order.component.html',
  styleUrl: './details-order.component.scss',
})
export default class DetailsOrderComponent {

  @Input('id') productId!: number;
  claroService = inject(ClaroService);
  statusOrder : StatusData = {status: 'loading'}
  order!: OrderDetails;

  BreadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Detalles de la orden',
    separator: true,
  };

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'storefront',
      label: 'Tiendas',
      separator: true,
    },

    {
      icon: 'store',
      label: 'ClaroShop',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'detalles de la orden',
    },
  ];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrder();
  }

  getOrder() {
    this.statusOrder.status = 'loading';
    this.claroService.getOrderById(this.productId).subscribe({
      next: (resp) => {
        console.log(resp)
       this.order = resp;
       this.statusOrder.status = resp ? 'success' : 'empty';
      }, error: (err) => {
        console.log(err)
        this.statusOrder.status = 'error';
      }
    })
  }
 }

 /*
 
 */