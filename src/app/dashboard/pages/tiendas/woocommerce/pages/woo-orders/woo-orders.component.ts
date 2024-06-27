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
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { WooOrdersService } from '@woocommerce/services/woo-orders.service';
import { StateOrders } from 'src/app/core/interface/state-order.interface';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';
import { DashboardOrderComponent } from '@components/dashboard-order/dashboard-order.component';

@Component({
  selector: 'woo-app-orders',
  templateUrl: './woo-orders.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    BreadcrumbComponent,
    DashboardOrderComponent,
    OrderListComponent,
    ButtonModule,
    TabViewModule,
  ],
  styleUrl: './woo-orders.component.scss',
  providers: [MessageService],
})
export default class WooOrdersComponent implements OnInit {

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

  #stateWooTypeOrder = signal<StateTypeOrder[]>([
      {
      label: 'Ordenes pendientes',
        value: 0,
        status: 'loading',
        typeOrder: 'pendiente',
        image: {
          id: 1,
          src:  '/assets/img/order_pending.png',
          alt: 'Ordenes pendientes'
        },
       command: () => this.getOrdersByStatus('pending'),
  
      }, 

      {
       label: 'Ordenes en proceso',
        value: 0,
        status: 'loading',
        typeOrder: 'proceso_entrega',
        image: {
          id: 2,
          src: '/assets/img/order_proccesing.png',
          alt: 'Ordenes en proceso'
        },
        command: () => this.getOrdersByStatus('processing'),
        otherOrders: [
          {
            label: 'En espera',
            value: 12,
            status: 'success'
          },

          {
            label: 'En proceso',
            value: 7,
            status: 'success'
          }
        ]
      },

      {
        label: 'Ordenes completadas',
          value: 0,
          status: 'loading',
          typeOrder: 'completado',
          image: {
            id: 3,
            src:  '/assets/img/order_completed.png',
            alt: 'Ordenes completadas'
          },
          command: () => this.getOrdersByStatus('completed'),
          otherOrders: [
            {
              label: 'completadas',
              value: 300,
              status: 'success'
            },

            {
              label: 'Canceladas',
              value: 13,
              status: 'success'
            },

            {
              label: 'No concretados',
              value: 4,
              status: 'success'
            }
          ]
      }
]);

  public wooOrders    = computed( () => this.#stateWooOrders() );
  public wooPagOrders = computed( () => this.#stateWooPagOrders() );
  public wooTypeOrder    = computed( () => this.#stateWooTypeOrder() )


  private readonly wooOrderService = inject(WooOrdersService);
  private readonly activedRouter = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private getNumberOrdersByStatus(status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed', typeOrder: StateTypeOrder['typeOrder']): void{
    

    const stateOrder = this.#stateWooTypeOrder().find(order => order.label === typeOrder);
    if (stateOrder) {
        stateOrder.status = 'loading';
        this.wooOrderService.getOrdersCount(status).subscribe({
            next: (resp) => {
                stateOrder.status = resp.totalCount ? 'success' : 'empty';
                stateOrder.value = resp.totalCount;
            },
            error: () => {
                stateOrder.status = 'error';
                stateOrder.value = 0;
            }
        });
    }

   
  }


  ngOnInit(): void {
    this.getNumberOrdersByStatus('cancelled', 'pendiente'),
    this.getNumberOrdersByStatus('processing', 'proceso_entrega'),
    this.getNumberOrdersByStatus('completed', 'cancelado'),

    this.activedRouter.queryParamMap.subscribe((params: ParamMap) => {
      const type = params.get('status');
      const page = params.get('page');
      const per_page = params.get('per_page');
      this.#stateWooPagOrders().type =
        type !== null ? type : this.#stateWooPagOrders().type;
      this.#stateWooPagOrders().page = page !== null ? +page : 1;
      // Verificar si per_pageParam es null o undefined antes de convertirlo a un número
      this.#stateWooPagOrders().rows = per_page !== null ? +per_page : 10;

      this.getOrdersByStatus(this.#stateWooPagOrders().type);
    });

    this.wooTypeOrder();
    this.wooOrders();
    this.wooPagOrders();
  }


  getOrdersByStatus(status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' ) {

    this.router.navigate([], {
      relativeTo: this.activedRouter,
      queryParams: {
        status: status,
        page: this.#stateWooPagOrders().page,
        per_page: this.#stateWooPagOrders().rows
      },
      queryParamsHandling: 'merge'
    });

    this.#stateWooPagOrders().type = status;
    this.#stateWooOrders().status = 'loading'


    this.wooOrderService
      .getOrderByStatus(
        status,
        this.#stateWooPagOrders().page,
        this.#stateWooPagOrders().rows
      )
      .subscribe({
        next: (resp) => {


          this.#stateWooOrders.set({
            status: resp.orders.length > 0 ? 'success' : 'empty',
            orders: resp.orders.length > 0 ? resp.orders : []
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
