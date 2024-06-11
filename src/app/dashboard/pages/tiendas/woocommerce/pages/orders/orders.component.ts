import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { WooOrdersService } from '@woocommerce/services/woo-orders.service';
import { StateOrders } from 'src/app/core/interface/state-orders.interface';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      command: () => this.getOrderstByStatus('pending'),
      // iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      // backgroundIconClass: 'bg-green-100'
    },

    {
      label: 'Ordenes En transito',
      quantity: 35,
      urlImage: '/assets/img/order_proccesing.png',
      command: () => this.getOrderstByStatus('completed'),
    },

    {
      label: 'Ordenes Concretadas',
      quantity: 40,
      urlImage: '/assets/img/order_completed.png',
      command: () => this.getOrderstByStatus('failed'),
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
          label: 'Adjuntar factura',
        },
      ],
    },
  ];

  #stateWooTypeOrder = signal<StateTypeOrder>({
    pendingOrders: {
      status: 'loading',
      quantity: 0,
    },

    completedOrders: {
      status: 'loading',
      quantity: 0,
    },

    unsoldOrders: {
      status: 'loading',
      quantity: 0,
    },
  });

  #stateWooOrders = signal<StateOrders>({
    status: 'loading',
    orders: [],
  });

  #stateWooPagOrders = signal<PaginationParams>({
    page: 1,
    rows: 10,
    first: 1,
    type: 'pending',
    totalRecords: 0,
  });

  public wooTypeOrder = computed(() => this.#stateWooTypeOrder());
  public wooOrders = computed(() => this.#stateWooOrders());
  public wooPagOrders = computed(() => this.#stateWooPagOrders());

  private readonly wooOrderService = inject(WooOrdersService);
  private readonly activedRouter = inject(ActivatedRoute);
  private readonly router = inject(Router);

  getNumberPendingOrders() {
    this.wooOrderService.getOrdersCount('processing').subscribe({
      next: (resp) => {
        this.#stateWooTypeOrder().pendingOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp.totalCount,
        };
      },
      error: (resp) => {
        this.#stateWooTypeOrder().pendingOrders = {
          status: 'error',
          quantity: 0,
        };
      },
    });
  }

  getNumberCompletedOrders() {
    this.wooOrderService.getOrdersCount('completed').subscribe({
      next: (resp) => {
        this.#stateWooTypeOrder().completedOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp.totalCount,
        };
      },
      error: (errorMessage) => {
        this.#stateWooTypeOrder().completedOrders = {
          status: 'error',
          quantity: 0,
        };
      },
    });
  }

  getNumberCancelledOrders() {
    this.wooOrderService.getOrdersCount('cancelled').subscribe({
      next: (resp) => {
        this.#stateWooTypeOrder().unsoldOrders = {
          status: resp ? 'success' : 'empty',
          quantity: resp ? resp.totalCount : 0,
        };
      },
      error: (errorMessage) => {
        this.#stateWooTypeOrder().unsoldOrders = {
          status: 'error',
          quantity: 0,
        };
      },
    });
  }

  ngOnInit(): void {
    this.getNumberPendingOrders();
    this.getNumberCompletedOrders();
    this.getNumberCancelledOrders();

    this.activedRouter.queryParamMap.subscribe((params: ParamMap) => {
      const type = params.get('status');
      const page = params.get('page');
      const per_page = params.get('per_page');
      this.#stateWooPagOrders().type =
        type !== null ? type : this.#stateWooPagOrders().type;
      this.#stateWooPagOrders().page = page !== null ? +page : 1;
      // Verificar si per_pageParam es null o undefined antes de convertirlo a un número
      this.#stateWooPagOrders().rows = per_page !== null ? +per_page : 10;

      this.getOrderstByStatus(this.#stateWooPagOrders().type);
    });

    this.wooTypeOrder();
    this.wooOrders();
    this.wooPagOrders();
  }

  getOrderstByStatus(status: 'pending' | 'completed' | 'canceled' | 'failed') {
    this.#stateWooPagOrders().type = status;

    this.router.navigate([], {
      relativeTo: this.activedRouter,
      queryParams: {
        status: status,
        page: this.#stateWooPagOrders().page,
        per_page: this.#stateWooPagOrders().rows,
      },
      queryParamsHandling: 'merge',
    });
    // Llamar al servicio después de la navegación
    this.getOrders(this.#stateWooPagOrders().type);
  }

  getOrders(status: 'pending' | 'completed' | 'canceled' | 'failed') {
    this.wooOrderService
      .getOrderByStatus(
        status,
        this.#stateWooPagOrders().page,
        this.#stateWooPagOrders().rows
      )
      .subscribe({
        next: (resp) => {
         
          this.#stateWooOrders.set({
            status: resp ? 'success' : 'empty',
            orders: resp ? resp.orders : []
          });

          this.#stateWooPagOrders().totalRecords = resp.totalOrders;
        },
        error: (err) => {
          this.#stateWooOrders.set({
            status: 'error',
            orders: []
           });

           this.#stateWooPagOrders().totalRecords = 0;
        },
      });
  }

  changedPage(event: any) {
    this.#stateWooPagOrders().page = event.first + 1;
    this.#stateWooPagOrders().rows = event.rows;

    this.router.navigate([], {
      relativeTo: this.activedRouter,
      queryParams: {
        status: this.#stateWooPagOrders().type,
        page: this.#stateWooPagOrders().page,
        per_page: this.#stateWooPagOrders().rows,
      },

      queryParamsHandling: 'merge',
    });
  }
}
