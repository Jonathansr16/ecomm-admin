import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { MenuItem } from 'primeng/api';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { ButtonModule } from 'primeng/button';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { combineLatest, concatMap } from 'rxjs';

import { MelyOrdersService } from '@mely/services/mely-orders.service';
import { ErrorInfoData } from 'src/app/core/interface/status-data-info.interface';
import { StateOrders } from 'src/app/core/interface/state-order.interface';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';
import { DashboardOrderComponent } from '@components/dashboard-order/dashboard-order.component';

const DEFAULT_DURATION = 0.35;

@Component({
  selector: 'app-mely-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    RouterLink,
    DashboardOrderComponent,
    OrderListComponent,
    ButtonModule,
  ],
  templateUrl: './mely-orders.component.html',
  styleUrl: './mely-orders.component.scss',
  animations: [
    trigger('isActivo', [
      state(
        'true',
        style({ height: AUTO_STYLE, visibility: 'visible', opacity: 1 })
      ),
      state(
        'false',
        style({ height: '0px', visibility: 'hidden', opacity: 0 })
      ),
      transition('false => true', animate(DEFAULT_DURATION + 's ease')),
      transition('true => false', animate(DEFAULT_DURATION + 's ease')),
    ]),
  ],
})
export default class MelyOrdersComponent {
  productId = '';

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
      label: 'Mercado libre',
      separator: false,
    },

    {
      icon: 'list_alt',
      label: 'Ordenes',
    },
  ];

  ordersOption: MenuItem[] = [
    {
      label: 'Opciones:',
      items: [
        {
          id: this.productId,
          label: 'Ver detalles',
          command: (c) => {
            this.router.navigate([
              '/dashboard/mely/ordenes/order-details',
              this.productId,
            ]);
          },
        },

        {
          label: 'Adjuntar factura',
        },

        {
          label: 'Agregar nota',
        },
      ],
    },
  ];

  #statMelyTypeOrder = signal<StateTypeOrder[]>([

    {
      label: 'Ordenes pendientes',
      value: 20,
      status: 'success',
      typeOrder: 'pendiente',
      image: {
        id: 1,
        src: '/assets/img/order_pending.png',
        alt: 'Ordenes pendientes'
      }
    },

    {
      label: 'Ordenes en proceso',
      value: 14,
      status: 'success',
      typeOrder: 'proceso_entrega',
      image: {
        id: 2,
        src: '/assets/img/order_proccesing.png',
        alt: 'en proceso de entrega'
      },
      otherOrders: [
        {
          label: 'En camino full',
          value: 30,
          status: 'success'
        },

        {
          label: 'En camino desde almacen',
          value: 20,
          status: 'success'
        }
      ]
      
    },

    {
      label: 'Ordenes concretadas',
      value: 304,
      status: 'success',
      typeOrder: 'completado',
      image: {
        id: 3,
        src: '/assets/img/order_completed.png',
        alt: 'Ordenes completadas'
      },
      otherOrders: [
        {
          label: 'concretadas',
          value: 560,
          status: 'success'
        },

        {
          label: 'No concretadas',
          value: 130,
          status: 'success'
        },

        {
          label: 'En devolucion',
          value: 12,
          status: 'success'
        },

      
      ]
    }
  ]);

  melyTypeOrder = computed( () => this.#statMelyTypeOrder());


  isOpen: boolean[] = [];
  isOpenCard: boolean[] = [];
  tags1 = ['not_delivered', 'not_paid'];

  //* Cantidad de pedidos


  #stateMelyOrders = signal<StateOrders>({
    status: 'loading',
    orders: [],
  });

  #stateMelyPagOrder = signal<PaginationParams>({
    page: 0,
    rows: 10,
    first: 0,
    totalRecords: 0,
  });

  isActive = false;

  errorOrdersInfo: ErrorInfoData = {titleError: '', summaryError: ''};

  // public melyTypeOrder = computed( () => this.#stateMelyTypeOrder());
  public melyOrders = computed(() => this.#stateMelyOrders());
  public melyPagOrders = computed(() => this.#stateMelyPagOrder());

  sort: string = 'date_desc';
  idProducts: string[] = [];

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly melyOrdersService = inject(MelyOrdersService);

  combine$ = combineLatest([
    this.melyOrdersService.getOrders(
      this.#stateMelyPagOrder().rows,
      this.#stateMelyPagOrder().first,
      this.sort
    ),
    this.melyOrdersService.getProductByIdOrder(),
  ]);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const limit = params.get('limit');
      const offset = params.get('offset');
      const order_type = params.get('sort');
      this.#stateMelyPagOrder().rows = limit !== null ? +limit : 10;
      this.#stateMelyPagOrder().first = offset !== null ? +offset : 0;
      this.sort = order_type !== null ? order_type : 'date_desc';
      this.getOrders();
    });

    // this.melyTypeOrder();
    this.melyOrders();
    this.melyPagOrders();
  }

  getOrders(): void {
    this.melyOrdersService
      .getOrders(
        this.#stateMelyPagOrder().rows,
        this.#stateMelyPagOrder().first,
        this.sort
      )
      .pipe(
        concatMap((response) => {
          this.melyOrdersService.idProductByOrder = new Set(
            response.orders.results.map((item) => item.order_items[0].item.id)
          );
          this.#stateMelyPagOrder().totalRecords = response.totalOrders;
          return combineLatest({
            orders: [response.orders.results],
            products: this.melyOrdersService.getProductByIdOrder(),
          });
        })
      )
      .subscribe({
        next: (resp) => {
          this.melyOrdersService.productByOrder = resp.products;
          this.#stateMelyOrders.set({
            status: resp.orders && resp.products ? 'success' : 'empty',
            orders: resp.orders.map((order) =>
              this.melyOrdersService.transformOrder(order),
            ),
          });

           console.log(this.#stateMelyOrders().orders)
        },

        error: (msgErr) => {
          this.errorOrdersInfo = {
            titleError: 'Error',
            summaryError: msgErr
          };

          this.#stateMelyOrders.set({
            status: 'error',
            orders: []
          });

          this.#stateMelyPagOrder().totalRecords = 0;
        }
      });
  }

  getOrdersByStatus(status: string, tags: string[]) {
    this.#stateMelyOrders().status = 'loading';
    this.melyOrdersService
      .getOrdersByStatus(
        status,
        this.sort,
        tags,
        this.#stateMelyPagOrder().rows,
        this.#stateMelyPagOrder().first
      )

      .subscribe({
        next: (resp) => {
          this.#stateMelyOrders.set({
            status: resp.orders.length > 0 ? 'success' : 'empty',
            orders: resp.orders,
          });

          this.#stateMelyPagOrder().totalRecords = resp.totalOrders;
        },
        error: (err) => {
          this.#stateMelyOrders.set({
            status: 'error',
            orders: [],
          });

          this.#stateMelyPagOrder().totalRecords = 0;
        },
      });
  }

  changedPage(event: any) {
    this.#stateMelyPagOrder().page = event.first;
    this.#stateMelyPagOrder().rows = event.rows;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        limit: event.rows,
        offset: event.first,
      },

      queryParamsHandling: 'merge',
    });
  }

  // handlerWrapper() {
  //   this.handlerOrders = !this.handlerOrders;
  //   const wrapper= this.actionsWrapper()?.nativeElement;

  //   if(!this.handlerOrders && wrapper.classList.contains('show-wrapper')) {
  //     this.renderer2.removeClass(wrapper, 'show-wrapper');
  //     this.renderer2.setStyle(wrapper, 'height', `0px`)
  //   } else {
  //     this.renderer2.addClass(wrapper, 'show-wrapper');
  //     this.renderer2.setStyle(wrapper, 'height', `${wrapper.scrollHeight}px`);

  //   }
  // }

  getProductId(value: any) {
    this.productId = value;
  }
}

