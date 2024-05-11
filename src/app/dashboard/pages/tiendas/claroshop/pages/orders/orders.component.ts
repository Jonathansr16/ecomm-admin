import { Component, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Params,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { MenuItem } from 'primeng/api';
import { Orders } from 'src/app/core/interface/orders.interface';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { CardStatComponent } from '@components/card-stat/card-stat.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    BreadcrumbComponent,
    CardStatComponent,
    OrderListComponent,
    ButtonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
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

  dataOrders: dataStat[] = [
    {
      label: 'Ordenes Pendientes',
      quantity: 230,
      urlImage: '/assets/img/order_pending.png',
      // iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      // backgroundIconClass: 'bg-green-100'
      command: () => this.getOrderstByStatus('pendientes'),
    },

    {
      label: 'Ordenes En transito',
      quantity: 35,
      urlImage: '/assets/img/order_proccesing.png',
      command: () => this.getOrderstByStatus('embarcados'),
    },

    {
      label: 'Ordenes Concretadas',
      quantity: 40,
      urlImage: '/assets/img/order_completed.png',
      command: () => this.getOrderstByStatus('entregados'),
    },
  ];

  //* Status para la data obtenida de la api
  //* Cantidad de pedidos
  pendingOrdersCount = signal(0);
  shippedOrdersCount = signal(0);
  completedOrdersCount = signal(0);
  orders: Orders[] = [];
  // Índice de acordeon abierto, inicialmente cerrado
  selectedIndex: number = -1;
  idx: string = '304';
  //* Status de la cada orden
  statusData: StatusData = { status: 'loading' };
  // estatusByOrderList: 'pendientes' | 'entregados' | 'embarcados' = 'pendientes';
  //* parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
    type: 'pendientes',
  };

  totalOrders: number = 0;

  menuOrder: MenuItem[] = [
    {
      label: 'Opciones:',

      items: [
        {
          id: this.idx,
          label: 'Ver Detalles',

          command: (c) =>
            this.router.navigate([
              '/dashboard/claroshop/ordenes/order-details',
              this.idx,
            ]),
        },

        {
          label: 'Agregar Nota',
        },

        {
          label: 'Adjuntar factura',
        },
      ],
    },
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
    failed: true,
  };

  claroService = inject(ClaroService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor() {}

  //* Obtiene la cantidad de ordenes pendientes
  getNumberPendingOrders() {
    this.claroService.getOrdersCountByStatus('pendientes').subscribe({
      next: (resp) => {
        this.statusOfData.pending = false;
        this.pendingOrdersCount.set(resp.totalOrders);
      },
      error: (errorMessage) => {
        this.statusOfData.pending = false;
      },
    });
  }

  //* Obtiene la cantidad de ordenes embarcados
  getNumberShippedOrders() {
    this.claroService.getOrdersCountByStatus('embarcados').subscribe({
      next: (resp) => {
        this.statusOfData.shipped = false;
        this.shippedOrdersCount.set(resp.totalOrders);
      },

      error: (errorMessage) => {
        this.statusOfData.shipped = false;
      },
    });
  }

  //* Obtiene la cantidad de ordenes Entregados
  getNumberCompletedOrders() {
    this.claroService.getOrdersCountByStatus('entregados').subscribe({
      next: (resp) => {
        this.statusOfData.completed = false;
        this.completedOrdersCount.set(resp.totalOrders);
      },
      error: (errorMessage) => {
        this.statusOfData.completed = false;
        console.log(errorMessage);
      },
    });
  }

  //* navegar a los detalles de un pedido
  goToOrder(idx: number) {
    this.router.navigateByUrl(`order/order-details/${idx}`);
  }

  ngOnInit(): void {
    this.getNumberPendingOrders();
    this.getNumberShippedOrders();
    this.getNumberCompletedOrders();

    this.activedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const type = params.get('action');
      const page = params.get('page');
      const limit = params.get('limit');
      this.paginationParams.type =
        type !== null ? type : this.paginationParams.type;
      this.paginationParams.page = page !== null ? +page : 0;
      // Verificar si limitParam es null o undefined antes de convertirlo a un número
      this.paginationParams.rows = limit !== null ? +limit : 10;

      this.getOrderstByStatus(this.paginationParams.type);
    });
  }

  getOrderstByStatus(status: 'pendientes' | 'embarcados' | 'entregados') {
    this.paginationParams.type = status;

    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        action: status,
        page: this.paginationParams.page,
        limit: this.paginationParams.rows,
      },
      queryParamsHandling: 'merge',
    });
    // Llamar al servicio después de la navegación
    this.getOrders(status);
  }

  getOrders(status: 'pendientes' | 'embarcados' | 'entregados') {
    this.statusData.status = 'loading';
    this.claroService
      .getOrderByStatus(
        status,
        this.paginationParams.page = 1,
        this.paginationParams.rows
      )
      .subscribe({
        next: (resp) => {
          this.orders = resp.orders;
          this.totalOrders = resp.totalOrders;
          this.statusData.status = resp.orders.length ? 'success' : 'empty';
        },
        error: (err) => {
          this.statusData.status = 'error';
          this.totalOrders = 0;
          console.log(err);
        },
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

  getId(value: any) {
    this.idx = value;
  }

  paginationChanged(event: any) {
    this.paginationParams.page = event.page +1;
    this.paginationParams.rows = event.rows;

    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        action: this.paginationParams.type,
        page: this.paginationParams.page,
        limit: this.paginationParams.rows,
      },
      queryParamsHandling: 'merge',
    });
  }
}


/*
{
    "totalpaginas": 1,
    "totalpendientes": 1,
    "totalregistros": "1",
    "listapendientes": [
        {
            "nopedido": "83539216",
            "estatus": "Pendiente",
            "fechacolocacion": "2024-04-07",
            "fechaautorizacion": "2024-04-07",
            "sku": "GBAPKMSP",
            "articulo": "Pok&eacute;mon Sapphire Gba Juego F&iacute;sico En Caja Con Protecci&oacute;n",
            "claroid": "2828788",
            "idpedidorelacion": "12035596",
            "fulfillment": false,
            "sla": "En tiempo de embarque",
            "comision": "69.86",
            "totalproducto": "499",
            "totalpedido": "499",
            "skuhijo": "GBAPKMSP",
            "channel": "SR",
            "transactionid": null
        }
    ],
    "versionConfig": "2.0.17112023-1.0",
    "versionAPP": "2.0.17112023-1.0",
    "tagManagerID": "GTM-5Q7VB6N",
    "tagManagerIDCS": "",
    "visibleMenuCV": true
}
*/

/* 
--> ordenes pendientes
- fecha de recibido
- fecha de autorización

--> ordenes en proceso
- fecha de recibido
- fecha de despacho

--> ordenes concretadas
- fecha de autorización
- fecha de despacho
*/
