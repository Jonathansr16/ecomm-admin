import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { WooService } from '@woocommerce/services/woo.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { StatusData } from '@components/interfaces/status-data.interface';
import { Orders } from 'src/app/core/interface/order.interface';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    CardStatComponent,
    BreadcrumbComponent,
    OrderListComponent, 

    ButtonModule,
    TabViewModule,
  ],
  styleUrl: './orders.component.scss',
  providers: [MessageService],
})
export default class OrdersComponent implements OnInit {
  filteredOrders: any[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
  options: MenuItem[] = [];
  titleError: string = '';
  detailsError: string = '';
  statusOrders: StatusData = {status: 'loading'};
  dataOrders: Orders[] = [];


  BreadcrumbHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Ordenes',
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
      label: 'Ordenes',
    },
  ];

  dataCards: dataStat[] = [
    {
      label: 'Ordenes Pendientes',
      quantity: 230,
      urlImage: '/assets/img/order_pending.png',
      command: ()=> this.getOrderstByStatus('pending')
      // iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      // backgroundIconClass: 'bg-green-100'
    },

    {
      label: 'Ordenes En transito',
      quantity: 35,
      urlImage: '/assets/img/order_proccesing.png',
      command: ()=> this.getOrderstByStatus('completed')

    },

    {
      label: 'Ordenes Concretadas',
      quantity: 40,
      urlImage: '/assets/img/order_completed.png',
      command: ()=> this.getOrderstByStatus('failed')

    }, 

   
  ];

  menuOrder: MenuItem[] = [

    {
      label: 'Opciones:',
      items: [
        {
          label: 'Ver Detalles',
        },

        {
          label: 'Agregar Nota',
        },

        {
          label: 'Adjuntar factura'
        }
      ]
    }
  ];

    //* parametros iniciales para la paginación
    paginationParams: PaginationParams = {
      page: 1,
      rows: 10,
      first: 1,
      type: 'pending',
    };

    
  totalOrders!: number;

  //* Status para la data obtenida de la api

  //* Cantidad de pedidos
  pendingOrdersCount: number = 0;
  processingOrdersCount: number = 0;
  completedOrdersCount: number = 0;
  cancelledOrdersCount: number = 0;

  //* Status de la cada orden
  status: {
    pending: boolean;
    shipped: boolean;
    completed: boolean;
    failed: boolean;
  } = {
    pending: true,
    shipped: true,
    completed: true,
    failed: true,
  };

  wooService = inject(WooService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);

  getNumberPendingOrders() {
    this.wooService.getOrdersCount('processing').subscribe({
      next: (resp) => {
        this.pendingOrdersCount = resp.totalCount;
        this.status.pending = false;
        console.log(
          `Cantidad De Ordenes en pendientes de pago: ${this.pendingOrdersCount}`
        );
      },
      error: (resp) => {
        this.status.pending = false;
      },
    });
  }

  getNumberProcessOrders() {
    this.wooService.getOrdersCount('processing').subscribe({
      next: (resp) => {
        this.processingOrdersCount = resp.totalCount;
        this.status.shipped = false;
        console.log(
          `Cantidad De Ordenes en proceso: ${this.processingOrdersCount}`
        );
      },
      error: (errorMessage) => {
        this.status.shipped = false;
      },
    });
  }

  getNumberCompletedOrders() {
    this.wooService.getOrdersCount('completed').subscribe({
      next: (resp) => {
        this.completedOrdersCount = resp.totalCount;
        this.status.completed = false;
        console.log(
          `Cantidad De Ordenes completadas: ${this.completedOrdersCount}`
        );
      },
      error: (errorMessage) => {
        this.status.completed = false;
      },
    });
  }

  getNumberCancelledOrders() {
    this.wooService.getOrdersCount('cancelled').subscribe({
      next: (resp) => {
        this.cancelledOrdersCount = resp.totalCount;
        this.status.failed = false;
      },
      error: (errorMessage) => {
        this.status.failed = false;
      },
    });
  }

  ngOnInit(): void {
    //  this.getOrders();
    this.getNumberPendingOrders();
    this.getNumberProcessOrders();
    this.getNumberCompletedOrders();
    this.getNumberCancelledOrders();

    this.activedRouter.queryParamMap.subscribe( (params: ParamMap) => {


      const type = params.get('status');
      const page = params.get('page');
      const per_page = params.get('per_page');
   this.paginationParams.type = type !== null ? type : this.paginationParams.type
      this.paginationParams.page = page !== null ? +page : 1;
      // Verificar si per_pageParam es null o undefined antes de convertirlo a un número
      this.paginationParams.rows = per_page !== null ? +per_page: 10;
   
        this.getOrderstByStatus(this.paginationParams.type)
     })
  }

  getOrderstByStatus(status: 'pending' | 'completed' | 'canceled' | 'failed',) {
  

    this.paginationParams.type = status;
  
    this.router.navigate([], {
      relativeTo: this.activedRouter,
      queryParams: {
        status: status,
        page: this.paginationParams.page,
        per_page: this.paginationParams.rows
      },
      queryParamsHandling: 'merge'
    });
    // Llamar al servicio después de la navegación
     this.getOrders(this.paginationParams.type)
    }
  
    getOrders(status: 'pending' | 'completed' | 'canceled' | 'failed') {
     this.statusOrders.status = 'loading';
      this.wooService.getOrderByStatus(status, this.paginationParams.page, this.paginationParams.rows)
      .subscribe({
        next: (resp) => {
          this.dataOrders = resp.orders;
          this.totalOrders= resp.orders.length;
          this.statusOrders.status = resp.orders.length ? 'success' : 'empty';
          this.totalOrders = resp.totalOrders;
        console.log(resp)
        }, 
        error: (err) => {
          this.statusOrders.status = 'error';
          this.totalOrders = 0;
        }
      });
    }

    changedPage(event: any) {
      this.paginationParams.page = event.first +1;
      this.paginationParams.rows = event.rows;
      
      this.router.navigate([], {
        relativeTo: this.activedRouter,
        queryParams: {
          status: this.paginationParams.type,
          page: this.paginationParams.page,
          per_page: this.paginationParams.rows,
        },
  
        queryParamsHandling: 'merge',
      });
    }

}
