import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { homeAyuda } from 'src/app/core/interface/ayuda.model';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TopProductsWoo } from './data/top-products';
import {  TopBestSellingByChannel } from './data/products-inactive';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationParams } from 'src/app/core/interface/pagination-params.interface';
import { MetricsCardComponent } from '@components/metrics-card/metrics-card.component';
import { MelyOrdersService } from '@mely/services/mely-orders.service';
import { ClaroProductsService } from '@claroshop/services/claro-products.service';
import { WooOrdersService } from '@woocommerce/services/woo-orders.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    BreadcrumbComponent,
    OverlayPanelModule,
    TableModule,
    NgxChartsModule,
    ButtonModule,
    PaginatorModule,
    MetricsCardComponent,
    DropdownModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  dataAuth: any = {};
  ayuda: homeAyuda[] = [];
  visible: boolean = false;
  topProduct = TopProductsWoo;

  //*
  inactivePagParams: PaginationParams = {
    first: 1,
    rows: 10,
    page: 1,
    totalRecords: 10,
  };

  cities: any[] = [
    { name: 'Amazon', code: 'NY' },
    { name: 'Claroshop', code: 'RM' },
    { name: 'Mercado libre', code: 'LDN' },
    { name: 'Walmar', code: 'IST' },
    { name: 'Woocommerce', code: 'PRS' }
  ];

  selectedCity: any | undefined;
  // channels = signal<TypeChannel[]>([
  //   {
  //     channel: 'Amazon',
  //     code: 'Ama'
  //   },

  //   {
  //     channel: 'Claroshop',
  //     code: 'Cla'
  //   },

  //   {
  //     channel: 'Mercado libre',
  //     code: 'Mely'
  //   }, 

  //   {
  //     channel: 'Walmart',
  //     code: 'Wm'
  //   },

  //   {
  //     channel: 'Woocommerce',
  //     code: 'Woo'      
  //   }
  // ]);

  // selectedChannel = signal<TypeChannel | undefined>(undefined);

topProductSales = TopBestSellingByChannel;

  perPageOptions: number[] = [10, 20, 30, 50];

  @ViewChildren(OverlayPanel) overlayPanels!: QueryList<OverlayPanel>;

  dataPendingOrder = {
    pendingOrdersAmazon: signal<number>(0),
    pendingOrdersClaro: signal<number>(0),
    pendingOrdersWalmart: signal<number>(0),
    pendingOrdersWoo: signal<number>(0),
  };

  breadcrumbHome: BreadcrumbItem = {
    icon: 'space_dashboard',
    label: 'Dashboard',
    separator: true,
  };

  breadcrumbItems: BreadcrumbItem[] = [
    {
      icon: 'home',
      label: 'Home',
      separator: false,
      url: '/dashboard/home',
    },
  ];

  datamyInventory: dataStat[] = [
    {
      label: 'Productos en almacen',
      value: 230,
      iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      backgroundIconClass: 'bg-green-100',
      status: 'error'
    },

    {
      label: 'En transito',
      value: 35,
      icon: 'conveyor_belt',
      iconClass: ['material-icons', 'text-lg', 'text-orange-700'],
      backgroundIconClass: 'bg-orange-100',
      status: 'success'
    },

    {
      label: 'Productos inactivos',
      value: 40,
      icon: 'checked_bag_question',
      iconClass: ['material-icons', 'text-lg', 'text-amber-700'],
      backgroundIconClass: 'bg-amber-100',
      status: 'empty'
    },
  ];

  activeAccordeon: number = -1;
  displayDialog: boolean[] = [];

  items: OrderData[] = [
    {
      label: 'Ordenes Pendientes',
      icon: 'inventory_2',
      iconClass: ['material-icons', 'text-orange-700', 'text-lg'],
      backgroundIconClass: 'bg-orange-100',
      totalCount: 30,
      overData: [
        {
          label: 'Amazon',
          count: 10,
        },

        {
          label: 'Claroshop',
          count: 12,
        },

        {
          label: 'Mercado libre',
          count: 20,
        },

        {
          label: 'Walmart',
          count: 6,
        },

        {
          label: 'Woocommerce',
          count: 5,
        },
      ],
    },

    {
      label: 'Productos Inactivos',
      icon: 'inventory_2',
      iconClass: ['material-icons', 'text-orange-700', 'text-lg'],
      backgroundIconClass: 'bg-orange-100',
      totalCount: 10,
      overData: [
        {
          label: 'Amazon',
          count: 10,
        },

        {
          label: 'Claroshop',
          count: 12,
        },

        {
          label: 'Mercado libre',
          count: 20,
        },

        {
          label: 'Walmart',
          count: 6,
        },

        {
          label: 'Woocommerce',
          count: 5,
        },
      ],
    },

    {
      label: 'Preguntas sin constestar',
      icon: 'inventory_2',
      iconClass: ['material-icons', 'text-orange-700', 'text-lg'],
      backgroundIconClass: 'bg-orange-100',
      totalCount: 3,
      overData: [
        {
          label: 'Mercado libre',
          count: 20,
        },

        {
          label: 'Walmart',
          count: 6,
        },
      ],
    },

    {
      label: 'Nuevos Mensajes',
      icon: 'inventory_2',
      iconClass: ['material-icons', 'text-orange-700', 'text-lg'],
      backgroundIconClass: 'bg-orange-100',
      totalCount: 4,
      overData: [
        {
          label: 'Amazon',
          count: 10,
        },

        {
          label: 'Mercado libre',
          count: 20,
        },

        {
          label: 'Walmart',
          count: 6,
        },
      ],
    },

    // {
    //   label: 'Ordenes En Camino',
    //   icon: 'conveyor_belt',
    //   iconClass: ['material-icons', 'text-amber-700', 'text-lg'],
    //   backgroundIconClass: 'bg-amber-100',
    //   overData: [
    //     {
    //       label: 'Amazon',
    //       count: 3,
    //     },
    //     {
    //       label: 'Claroshop',
    //       count: 5,
    //     },
    //   ],
    // },

    // {
    //   label: 'Ordenes Concretadas',
    //   icon: 'cancel_presentation',
    //   iconClass: ['material-icons', 'text-green-700', 'text-lg'],
    //   backgroundIconClass: 'bg-green-100',
    //   overData: [
    //     {
    //       label: 'Amazon',
    //       count: 0,
    //     },

    //     {
    //       label: 'Claroshop',
    //       count: 2,
    //     },

    //     {
    //       label: 'Walmart',
    //       count: 4,
    //     },

    //     {
    //       label: 'Woocommerce',
    //       count: 2,
    //     },
    //   ],
    // },

    // {
    //   label: 'Ordenes No Concretadas',
    //   icon: 'cancel_presentation',
    //   iconClass: ['material-icons', 'text-red-700', 'text-lg'],
    //   backgroundIconClass: 'bg-red-100',
    //   overData: [
    //     {
    //       label: 'Amazon',
    //       count: 4,
    //     },

    //     {
    //       label: 'Claroshop',
    //       count: 3,
    //     },

    //     {
    //       label: 'Mercado libre',
    //       count: 50,
    //     },

    //     {
    //       label: 'Walmart',
    //       count: 3,
    //     },
    //   ],
    // },
  ];

  melyService = inject(MelyOrdersService);
  claroService = inject(ClaroProductsService);
  wooService = inject(WooOrdersService);

  togglePanel(event: Event, index: number) {
    this.overlayPanels.toArray()[index].toggle(event);
  }

  ngOnInit(): void { }

  showDialog(index: number) {
    if (this.activeAccordeon === index) {
      this.activeAccordeon = -1;
    } else {
      this.activeAccordeon = index;
    }
  }

  hideDialog(index: number) {
    this.activeAccordeon = -1;
  }
}

interface OrderData {
  label: string;
  icon: string;
  totalCount: number;
  iconClass: {
    [klass: string]: any;
  };
  backgroundIconClass: string;
  overData: channelData[];
}

interface channelData {
  label: string;
  status?: 'loading' | 'success' | 'error' | 'empty';
  count: number;
}

interface StatusOrdersByChannel {
  pendingOrders: OrdersStatus[];
  progressOrders: OrdersStatus[];
  completedOrders: OrdersStatus[];
  failedOrders: OrdersStatus[];
}

interface OrdersStatus {
  amazonStatus: typeStatusByChannel;
  claroStatus: typeStatusByChannel;
  walmartStatus: typeStatusByChannel;
  wooStatus: typeStatusByChannel;
}

interface typeStatusByChannel {
  status: 'loading' | 'pending' | 'completed' | 'empty' | 'error';
}

interface OrdersByChannel {
  pendingOrders: OrdersCountByChannel[];
  progressOrders: OrdersCountByChannel[];
  completedOrders: OrdersCountByChannel[];
  failedOrders: OrdersCountByChannel[];
}

interface OrdersCountByChannel {
  amazonCount: number;
  claroCount: number;
  melyCount: number;
  walmartCount: number;
  wooCount: number;
}


interface TypeChannel {
  channel: 'Amazon' | 'Claroshop' | 'Mercado libre' | 'Walmart' | 'Woocommerce' | 'Seleccione canal de venta',
  code: 'Ama' | 'Cla' | 'Mely' | 'Wm' | 'Woo' | 'default';
}