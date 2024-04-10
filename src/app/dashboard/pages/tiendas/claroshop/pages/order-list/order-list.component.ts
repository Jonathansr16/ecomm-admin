import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClaroService } from '@claroshop/services/claroservice.service';
import { CardOrderListComponent } from '@components/card-order-list/card-order-list.component';
import { CardStatsComponent } from '@components/card-stats/card-stats.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { MenuItem } from 'primeng/api';
import { Orders } from 'src/app/core/interface/order.interface';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [ 
    CardStatsComponent,
    CardOrderListComponent, 
    RouterLink, 
    RouterOutlet],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export default class OrderListComponent {

  //* Status para la data obtenida de la api
  //* Cantidad de pedidos 
  pendingOrdersCount = signal(0);
  shippedOrdersCount = signal(0);
  completedOrdersCount = signal(0);
  orders: Orders[] = [];
  porOrden: string = '';
      // Índice de acordeon abierto, inicialmente cerrado
      selectedIndex: number = -1; 

  //* Status de la cada orden
 
  statusData: 'loading' | 'success' | 'error' | 'empty' = 'loading';
  // estatusByOrderList: 'pendientes' | 'entregados' | 'embarcados' = 'pendientes';
  //* parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  MenuProduct: MenuItem[] = [

    {
      label: 'Opciones:',
      items: [
        {
          label: 'Editar',
        },

        {
          label: 'Pausar',
        },

        {
          label: 'Eliminar'
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
    const actionParam = params['action'];
    const parsedAction = actionParam ? (isNaN(Number(actionParam)) ? actionParam : 'pendientes') : 'pendientes';
    this.paginationParams.page =+params['page'] ? +params['page'] : 1;
    this.paginationParams.rows = +params['limit'] ? params['limit'] : 10;

    // this.getOrderstByStatus('pendientes')
    this.getOrderstByStatus(parsedAction)
  })
  }

getOrderstByStatus(status: 'pendientes' | 'embarcados' | 'entregados' = 'pendientes') {
  
  this.router.navigate([], {
    relativeTo: this.activedRouter,
    queryParams: {
      action: status,
      page: this.paginationParams.page,
      limit: this.paginationParams.rows
    },
    queryParamsHandling: 'merge'
  })


    this.claroService.getOrderByStatus(status, this.paginationParams.page, this.paginationParams.rows)
    .subscribe( {
      next: (resp) => {
        this.orders = resp.orders;
        console.log(resp.orders)
      }
    }

      
    )
  }


  getProduct(idx: number) {
    this.claroService.getProduct(idx).subscribe( {
      next: (resp) => {

      }
    })
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



