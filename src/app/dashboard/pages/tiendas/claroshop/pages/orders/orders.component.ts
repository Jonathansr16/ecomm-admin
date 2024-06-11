import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { StateOrders } from 'src/app/core/interface/state-orders.interface';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';
import { ClaroOrdersService } from '@claroshop/services/claro-orders.service';
import { ErrorInfoData } from 'src/app/core/interface/status-data-info.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  idx: string = '304';

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

  selectedIndex: number = -1;

  #stateTypeOrder = signal<StateTypeOrder>({
    pendingOrders: {
      status: 'loading',
      quantity: 0,
    },

    shippedOrders: {
      status: 'loading',
      quantity: 0,
    },

    completedOrders: {
      status: 'loading',
      quantity: 0,
    },
  });

  #stateClaroOrders = signal<StateOrders>({
    status: 'loading',
    orders: [],
  });

  #stateClaroPagOrder = signal<PaginationParams>({
    page: 1,
    rows: 10,
    first: 0,
    type: 'pendientes',
    totalRecords: 0,
  });

  errorOrdersInfo: ErrorInfoData = {
    titleError: '',
    summaryError: '',
  };

  public claroTypeOrder = computed(() => this.#stateTypeOrder());
  public claroOrders = computed(() => this.#stateClaroOrders());
  public claroPagOrder = computed(() => this.#stateClaroPagOrder());

  private readonly claroOrdersService = inject(ClaroOrdersService);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {}

  //* Obtiene la cantidad de ordenes pendientes
  getNumberPendingOrders() {
    this.claroOrdersService.getOrdersCountByStatus('pendientes').subscribe({
      next: (resp) => {
        this.#stateTypeOrder().pendingOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp ? resp.totalOrders : 0,
        };
      },
      error: (errorMessage) => {
        this.#stateTypeOrder().pendingOrders = {
          status: 'error',
          quantity: 0,
        };
      },
    });
  }

  //* Obtiene la cantidad de ordenes embarcados
  getNumberShippedOrders() {
    this.claroOrdersService.getOrdersCountByStatus('embarcados').subscribe({
      next: (resp) => {
        this.#stateTypeOrder().shippedOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp ? resp.totalOrders : 0,
        };
      },

      error: (errorMessage) => {
        this.#stateTypeOrder().shippedOrders = {
          status: 'error',
          quantity: 0,
        };
      },
    });
  }

  //* Obtiene la cantidad de ordenes Entregados
  getNumberCompletedOrders() {
    this.claroOrdersService.getOrdersCountByStatus('entregados').subscribe({
      next: (resp) => {
        this.#stateTypeOrder().completedOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp ? resp.totalOrders : 0,
        };
      },
      error: (errorMessage) => {
        this.#stateTypeOrder().completedOrders = {
          status: 'error',
          quantity: 0,
        };
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
      this.#stateClaroPagOrder().type =
        type !== null ? type : this.#stateClaroPagOrder().type;
      this.#stateClaroPagOrder().page = page !== null ? +page : 0;
      // Verificar si limitParam es null o undefined antes de convertirlo a un número
      this.#stateClaroPagOrder().rows = limit !== null ? +limit : 10;

      this.getOrderstByStatus(this.#stateClaroPagOrder().type);
    });

    this.claroTypeOrder(), this.claroOrders();
    this.claroPagOrder();
  }

  getOrderstByStatus(status: 'pendientes' | 'embarcados' | 'entregados') {
    this.#stateClaroPagOrder().type = status;

    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        action: status,
        page: this.#stateClaroPagOrder().page,
        limit: this.#stateClaroPagOrder().rows,
      },
      queryParamsHandling: 'merge',
    });
    // Llamar al servicio después de la navegación
    this.getOrders(status);
  }

  getOrders(status: 'pendientes' | 'embarcados' | 'entregados') {
    this.claroOrdersService
      .getOrderByStatus(
        status,
        (this.#stateClaroPagOrder().page = 1),
        this.#stateClaroPagOrder().rows
      )
      .subscribe({
        next: (resp) => {
          this.#stateClaroOrders.set({
            status: resp.orders ? 'success' : 'error',
            orders: resp.orders ? resp.orders : [],
          });

          this.#stateClaroPagOrder().totalRecords = resp.totalOrders;
        },
        error: (err) => {
          this.errorOrdersInfo = {
            titleError: 'Error',
            summaryError: err,
          };

          this.#stateClaroOrders.set({
            status: 'error',
            orders: [],
          });
          this.#stateClaroPagOrder().totalRecords = 0;
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
    this.#stateClaroPagOrder().page = event.page + 1;
    this.#stateClaroPagOrder().rows = event.rows;

    //Actualizar parámetros de la URL
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: {
        action: this.#stateClaroPagOrder().type,
        page: this.#stateClaroPagOrder().page,
        limit: this.#stateClaroPagOrder().rows,
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
