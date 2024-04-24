import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { CardStatsComponent } from '@components/card-stats/card-stats.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { StatusData } from '@components/interfaces/status-data.interface';
import { MenuItem } from 'primeng/api';
import { Orders } from 'src/app/core/interface/order.interface';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ 
    RouterLink, 
    RouterOutlet,
    BreadcrumbComponent,
    CardStatsComponent,
    OrderListComponent, 
    ButtonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export default class OrdersComponent {

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
      label: 'ClaroShop',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Ordenes',
    },
  ];

  //* Status para la data obtenida de la api
  //* Cantidad de pedidos 
  pendingOrdersCount = signal(0);
  shippedOrdersCount = signal(0);
  completedOrdersCount = signal(0);
  orders: Orders[] = [];
  totalRecords: number =0;
  // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1; 

  //* Status de la cada orden
  statusData: StatusData = {status: 'loading'};
  // estatusByOrderList: 'pendientes' | 'entregados' | 'embarcados' = 'pendientes';
  //* parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
    type: 'pendientes'
  };

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

  statusOfData: {
    pending: boolean;
    shipped: boolean;
    completed: boolean;
    failed: boolean;
  } = {
    pending: true,
    shipped: true,
    completed: true,
    failed: true
  }

  claroService = inject(ClaroService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  constructor() { }

  //* Obtiene la cantidad de ordenes pendientes
  getNumberPendingOrders() {
    this.claroService.getOrdersCountByStatus('pendientes').subscribe(

      {
        next: (resp) => {
          this.statusOfData.pending= false;
          this.pendingOrdersCount.set(resp.totalOrders);
        },
        error: (errorMessage) => {
          this.statusOfData.pending = false;
        }
      },
    )
  }

  //* Obtiene la cantidad de ordenes embarcados
  getNumberShippedOrders() {
    this.claroService.getOrdersCountByStatus('embarcados').subscribe(
      {
        next: (resp) => {
          this.statusOfData.shipped = false;
          this.shippedOrdersCount.set(resp.totalOrders);
        },

        error: (errorMessage) => {
          this.statusOfData.shipped = false;
        }
      },
      
    )
  }

  //* Obtiene la cantidad de ordenes Entregados 
  getNumberCompletedOrders() {
    this.claroService.getOrdersCountByStatus('entregados').subscribe(

      {
        next: (resp) => {
          this.statusOfData.completed = false;
          this.completedOrdersCount.set(resp.totalOrders);
        },
        error: (errorMessage) => {
          this.statusOfData.completed = false;
          console.log(errorMessage);
        }
      },
    )
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.getNumberPendingOrders();
  this.getNumberShippedOrders();
  this.getNumberCompletedOrders();

  this.activedRouter.queryParamMap.subscribe( (params: Params) => {
    // const actionParam = params['action'];
    // const parsedAction = actionParam ? (isNaN(Number(actionParam)) ? actionParam : 'pendientes') : 'pendientes';

    this.paginationParams.type =  params['action'] ? params['action'] : this.paginationParams.type;
    this.paginationParams.page = params['page'] ? params['page'] : 1;
    this.paginationParams.rows =  params['limit'] ? params['limit'] : 10;


     this.getOrderstByStatus(this.paginationParams.type)
  })
  }

getOrderstByStatus(status: 'pendientes' | 'embarcados' | 'entregados') {
  

  this.paginationParams.type = status;

  this.router.navigate([], {
    relativeTo: this.activedRouter,
    queryParams: {
      action: this.paginationParams.type,
      page: this.paginationParams.page,
      limit: this.paginationParams.rows
    },
    queryParamsHandling: 'merge'
  });
  // Llamar al servicio después de la navegación
   this.getOrders(status)
  }

  getOrders(status: 'pendientes' | 'embarcados' | 'entregados') {
   this.statusData.status = 'loading';
    this.claroService.getOrderByStatus(status, this.paginationParams.page, this.paginationParams.rows)
    .subscribe({
      next: (resp) => {
        this.orders = resp.orders;
        this.totalRecords= resp.orders.length;
        this.statusData.status = resp.orders.length ? 'success' : 'empty';
      console.log(resp)
      }, 
      error: (err) => {
        this.statusData.status = 'error';
      }
    });
  }



  collapseContent(index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1; // Cierra el acordeón si ya está abierto
    } else {
      this.selectedIndex = index; // Abre el acordeón haciendo clic en un elemento
    }
  }

  isCollapsing(index: number): boolean {
    return this.selectedIndex === index;
  }

  
   

  

 }



interface PaginationParamsOrder {
  page: number;
  rows: number;
  first: number;
  typeOrder: string;
}