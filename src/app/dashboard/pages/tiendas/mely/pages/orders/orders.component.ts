import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { OrderListComponent } from '@components/order-list/order-list.component';
import { MelyService } from '@mely/mely.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { Orders } from 'src/app/core/interface/orders.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { ButtonModule } from 'primeng/button';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { combineLatest } from 'rxjs';

const DEFAULT_DURATION = 0.35;

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    CardStatComponent,
    BreadcrumbComponent,
    RouterLink,
    OrderListComponent,
    CardStatComponent,
    ButtonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
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
export default class OrderComponent {

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
          id: this.productId,
          label: 'Ver detalles',
          command: (c) => {
            this.router.navigate([
              '/dashboard/mely/ordenes/order-details', this.productId
            ])
          }
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

  dataMelyOptions: dataStat[] = [
    {
      label: 'Ordenes pendientes',
      quantity: 20,
      urlImage: '/assets/img/order_pending.png',

    },

    {
      label: 'En proceso de entrega',
      quantity: 30,
      urlImage: '/assets/img/order_proccesing.png',

    },

    {
      label: 'Concretadas',
      quantity: 65,
      urlImage: '/assets/img/order_completed.png',

    }
  ];

  tags1 = ['not_delivered', 'not_paid'];

  //* Cantidad de pedidos
  pendingOrdersCount = signal(0);
  shippedOrdersCount = signal(0);
  completedOrdersCount = signal(0);
  unsoldOrdersCount = signal(0);
  returnOrdersCount = signal(0);

  //* Status de los pedidos
  statusEveryOrder: {
    pending: boolean;
    shipped: boolean;
    completed: boolean;
    unsold: boolean;
    return: boolean;
  } = {
      pending: true,
      shipped: true,
      completed: true,
      unsold: true,
      return: true
    };

  dataActionsOrder = [
    {
      label: 'Concretadas',
      units: 1030,
      command: () => this.getOrdersByStatus('cancelled')
    },

    {
      label: 'No Concretadas',
      units: 30,
      command: () => this.getOrdersByStatus('paid')
    }
  ]

  isActive = false;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  melyService = inject(MelyService);

  melyOrders: Orders[] = [];
  statusOrders: StatusData = { status: 'loading' };
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  totalOrders: number = 0;
  sort: string = "date_desc";
  idProducts: string[] = [];
  combine$= combineLatest([
    this.melyService.getOrders(this.paginationParams.rows, this.paginationParams.first, this.sort),
    this.melyService.getProductByIdOrder()
  ]) 



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const limit = params.get('limit');
      const offset = params.get('offset');
      const order_type = params.get('sort');
      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.page = offset !== null ? +offset : 0
      this.sort = order_type !== null ? order_type : 'date_desc';
      this.getOrders();
      
    })
  }

  getOrders(): void {
    this.statusOrders.status = 'loading';
    this.melyService.getOrders(this.paginationParams.rows, this.paginationParams.page, this.sort).subscribe({
      next: (resp) => {
        this.melyOrders = resp.orders;
        this.totalOrders = resp.totalOrders;
        this.statusOrders.status = resp.orders.length > 0 ? 'success' : 'empty';
      this.getProductById()
        // resp.orders.forEach( item => {
        //   this.productId = item.id
        // })
      },

      error: (err) => {
        this.melyOrders = [];
        this.totalOrders = 0;
        this.statusOrders.status = 'error';
        console.log(err)
      }
    })
  }

  getOrdersByStatus(status: string) {
    this.statusOrders.status = 'loading';
    this.melyService.getOrdersByStatus(status, this.sort, this.tags1, this.paginationParams.rows, this.paginationParams.first).subscribe({
      next: (resp) => {
        console.log(resp)
        this.melyOrders = resp.orders;
        this.totalOrders = resp.totalOrders;
        this.statusOrders.status = resp.orders.length > 0 ? 'success' : 'empty';
      },
      error: (err) => {
        this.statusOrders.status = 'error';
        this.totalOrders = 0;
        this.melyOrders = [];

      }
    })
  }

  getProductById() {
    this.melyService.getProductByIdOrder().subscribe(
      {
        next: (resp) => {
          //  console.log(resp)
        },

        error: (err) => {
          console.log(err)
        }
      }

    )
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
