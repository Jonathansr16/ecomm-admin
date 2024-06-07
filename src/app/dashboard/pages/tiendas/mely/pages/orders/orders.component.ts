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
import { combineLatest, concatMap } from 'rxjs';

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

  orderByStatus = [

  {
    label: 'Ordenes pendientes',
    quantity: 34,
    urlImage: '/assets/img/order_pending.png',
    typeOrders: [

    ]
  },

  {
    label: 'En proceso de entrega',
    quantity: 50,
    urlImage: '/assets/img/order_proccesing.png',
    typeOrders: [
      
      {
        label: 'En camino full',
        quantity: 15
      },

      {
        label: 'En camino',
        quantity: 20
      }
    ]
  },

  {
    label: 'Ordenes concretadas',
    quantity: 1540,
    urlImage: '/assets/img/order_completed.png',
    typeOrders: [
      
      {
        label: 'concretadas',
        quantity: 1000
      },

      {
        label: 'No concretadas',
        quantity: 120
      },

      {
        label: 'En devolución',
        quantity: 30
      }
    ]
  }

  ]
  

  isOpen: boolean[] = [];
isOpenCard: boolean[ ] = []
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

  isActive = false;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  melyService = inject(MelyService);

  melyOrders: Orders[] = [];
  statusOrders: StatusData = { status: 'loading' };
  paginationParams: PaginationParams = {
    page: 0,
    rows: 10,
    first: 0,
    totalRecords: 0
  };

  sort: string = "date_desc";
  idProducts: string[] = [];
  combine$ = combineLatest([
    this.melyService.getOrders(this.paginationParams.rows, this.paginationParams.first, this.sort),
    this.melyService.getProductByIdOrder()
  ])



  ngOnInit(): void {
  
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const limit = params.get('limit');
      const offset = params.get('offset');
      const order_type = params.get('sort');
      this.paginationParams.rows = limit !== null ? +limit : 10;
      this.paginationParams.first = offset !== null ? +offset : 0;
      this.sort = order_type !== null ? order_type : 'date_desc';
      this.getOrders();
    })
  }

  getOrders(): void {
    this.statusOrders.status = 'loading';

    this.melyService.getOrders(this.paginationParams.rows, this.paginationParams.first, this.sort).pipe(
      concatMap(response => {
        this.melyService.idProductByOrder = new Set(response.orders.results.map( item => item.order_items[0].item.id));
        this.paginationParams.totalRecords = response.totalOrders
        return combineLatest({
          orders: [response.orders.results],
          products: this.melyService.getProductByIdOrder()
        })
      })
    ).subscribe({
      next: (resp) => {
        this.melyService.productByOrder = resp.products;
        this.melyOrders = resp.orders.map(order => this.melyService.transformOrder(order));
        this.statusOrders.status = this.melyOrders.length > 0 ? 'success' : 'empty';
        
        
      }
    })
  }

  getOrdersByStatus(status: string, tags: string[]) {
    this.statusOrders.status = 'loading';
    this.melyService.getOrdersByStatus(status, this.sort, tags, this.paginationParams.rows, this.paginationParams.first)
    
    
    .subscribe({
      next: (resp) => {
        console.log(resp)
        this.melyOrders = resp.orders;
        this.paginationParams.totalRecords = resp.totalOrders;
        this.statusOrders.status = resp.orders.length > 0 ? 'success' : 'empty';
      },
      error: (err) => {
        this.statusOrders.status = 'error';
        this.paginationParams.totalRecords = 0;
        this.melyOrders = [];

      }
    })
  }




  changedPage(event: any) {
    this.paginationParams.page = event.first;
    this.paginationParams.rows = event.rows;
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
