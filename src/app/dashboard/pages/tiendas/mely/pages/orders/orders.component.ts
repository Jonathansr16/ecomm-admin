import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { MelyService } from '@mely/mely.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    CardStatComponent,
    BreadcrumbComponent,
    RouterLink,
    OrderListComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export default class OrderComponent { 
  breadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Inventario',
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
      label: 'Woocommerce',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Inventario',
    },
  ];

  datamyInventory: dataStat[] = [
    {
      label: 'Ordenes Pendientes',
      quantity: 230,
      urlImage: '/assets/img/order_pending.png'
      // iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      // backgroundIconClass: 'bg-green-100'
    },

    {
      label: 'Ordenes En transito',
      quantity: 35,
      urlImage: '/assets/img/order_proccesing.png'

    },

    {
      label: 'Ordenes Concretadas',
      quantity: 40,
      urlImage: '/assets/img/order_completed.png'

    }, 

   
  ];

  ordersOption: MenuItem[] = [
    {
      label: 'Opciones:',
      items: [
        {
          label: 'Ver detalle'
        }, 

        {
          label: 'Adjuntar factura'
        },

        {
          label: 'Agregar nota'
        }
      ]
    }
  ];

  melyService = inject(MelyService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  melyOrders: Orders[] = [];
  statusOrders: StatusData = {status: 'loading'};
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10, 
    first: 0,
  };

  totalOrders: number = 0;
  sort: string = "date_desc";
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.queryParamMap.subscribe( (params: ParamMap) => {

      const limit = params.get('limit');
      const offset = params.get('offset');
      const order_type = params.get('sort');
      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.page = offset !== null ? +offset : 0
      this.sort = order_type !== null ? order_type :  'date_desc';
      this.getOrders();

  
    })
  }

  getOrders(): void {
    this.statusOrders.status = 'loading';
    this.melyService.getOrders(this.paginationParams.rows, this.paginationParams.page, this.sort).subscribe({
      next: (resp) => {
        this.melyOrders = resp.orders;
        this.totalOrders = resp.totalOrders;
        this.statusOrders.status = resp.orders.length > 0 ? 'success' : 'empty'
      },

      error: (err) => {
        this.melyOrders = [];
        this.totalOrders = 0;
        this.statusOrders.status = 'error';
        console.log(err)
      }
    })
  }


changedPage(event: any) {
    this.paginationParams.page = event.first;
    this.paginationParams.rows = event.rows;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        offset: event.first,
        limit: event.rows,
      },

      queryParamsHandling: 'merge',
    });
  }

}
