import { Component, inject } from '@angular/core';
import { CardOrderComponent } from '@components/card-order/card-order.component';
import { PaginationParams } from '@components/interfaces/pagination-params.interface';
import { WooService } from '@woocommerce/services/woo.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Orders } from 'src/app/core/interface/order.interface';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [
    CardOrderComponent
  ],
  template: ` 
  <app-card-order 
  [dataOrders]="testOrders"
  [paginationParams]="paginationParams"
  [OrderOption]="menuOrder"
  >
  </app-card-order>`,
})
export default class PendingOrdersComponent {
  pendingOrders: any[] = [];
  statusData: 'success' | 'error' | 'loading' | 'empty' = 'loading';
  //parametros iniciales para la paginación
  paginationParams: PaginationParams = {
    page: 1,
    rows: 10,
    first: 0,
  };

  menuOrder: MenuItem[] = [ 

    {
      label: 'Opciones:',
      items: [
        {
          label: 'Ver Orden',

        },

        {
          label: 'Adjuntar Factura'
        }, 

        {
          label: 'Agregar Nota'
        }
      ]
    }
  ];

  testOrders: Orders[] = [

    {
      id: 2304,
      noOrder: '2304',
      status: 'pending',
      date_created: new Date(),
      shipment_date: new Date(),
      fulfillment: false,
      total: 365,
      products: [

        {
          product: 'Repuesto Filtro De Aire Nuevo Dedakj Original',
          sku: 'Filter-org-1u',
          total: 365,
          quantity: 1,
          image: 
          {
            src: 'https://http2.mlstatic.com/D_NQ_NP_2X_768779-MLM47248017682_082021-F.webp'
          }
          
        },
      ]


    },

    {
      id: 2941,
      noOrder: '2941',
      status: 'pending',
      date_created: new Date('2024-03-05'),
     shipment_date: new Date('2024-03-06'),
     fulfillment: false,
     total: 899.20,
      products: [
        {
          product: 'Colección De Juegos Clásicos Nes 852 En 1 Juegos Físicos',
          sku: 'colec-852',
          total: 899.20,
          quantity: 1,
          image: 
            {
              src: '	https://http2.mlstatic.com/D_NQ_NP_2X_888113-MLM70540748659_072023-F.webp'
            }
          
        }
      ],

    },

    {
      id: 34563,
      noOrder: '34563',
      status: 'pending',
      date_created: new Date('2024-03-08'),
     shipment_date: new Date('2024-03-08'),
     fulfillment: false,
     total: 1385,
      products: [
        {
          product: 'Super Mario All-stars + Super Mario World Super Mario Standard Edition Ninten',
          sku: 'spr20',
          total: 486,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_844807-MLA54481995055_032023-O.webp'
            }
          
        },

        {
          product: 'Colección De Juegos Clásicos Nes 852 En 1 Juegos Físicos',
          sku: 'colect-852',
          total: 899,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_888113-MLM70540748659_072023-F.webp"'
            }
          
        }
      ],

    },

    {
      id: 3201,
      noOrder: '3201',
      status: 'pending',
      date_created: new Date('2024-03-15'),
     shipment_date: new Date('2024-03-16'),
     fulfillment: false,
     total: 499,
      products: [
        {
          product: 'La Leyenda De Zelda Ocarina Of Time Nintendo 64 Gold Salva',
          sku: 'zelda-ofn64',
          total: 499,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_730858-MLU69138841452_042023-F.webp'
            }
          
        }
      ],

    },

    {
      id: 2941,
      noOrder: '2941',
      status: 'pending',
      date_created: new Date('2024-03-16'),
     shipment_date: new Date('2024-03-16'),
     fulfillment: false,
     total: 989,
      products: [
        {
          product: 'Super Smash Bros Nintendo 64 Físico En Caja Con Manual',
          sku: 'super-smash',
          total: 989,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_758661-MLM51390677163_092022-F.webp'
            }
          
        }
      ],

    },

    {
      id: 3827,
      noOrder: '3827',
      status: 'pending',
      date_created: new Date('2024-03-016'),
     shipment_date: new Date('2024-03-17'),
     fulfillment: false,
     total: 1995,
      products: [
        {
          product: 'Adaptador Convertidor Hdmi Consolas Snes/n64/ngc/sfc 720p',
          sku: 'N64toHDMI',
          total: 597,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_666577-MLM70691571914_072023-F.webp'
            }
          
        },

        {
          product: 'Mario Party 2 Nintendo 64 N64',
          sku: 'MP2R',
          total: 499,
          quantity: 1,
          image: 

            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_756758-MLU73464466714_122023-F.webp'
            }
          
        },

        {
          product: 'Starcraft 64 N64 Estándar Físico Nuevo',
          sku: 'MP2R',
          total: 899,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_2X_803343-MLM54562151049_032023-F.webp'
            }
          
        }
      ],

    },

    {
      id: 2941,
      noOrder: '2941',
      status: 'pending',
      date_created: new Date('2024-03-05'),
     shipment_date: new Date('2024-03-06'),
     total: 750,
     fulfillment: false,
      products: [
        {
          product: 'Vaso Humidificador Borboteador Concentrador Dedakj De-2a',
          sku: 'DE-2A',
          total: 750,
          quantity: 1,
          image: 
            {
              src: 'https://http2.mlstatic.com/D_NQ_NP_737004-MLM48323308033_112021-O.webp'
            }
          
        }
      ],

    },


  ]

  private readonly wooService = inject(WooService);
  private readonly suscription$: Subscription[] = [];

  // getOrders() {
  //   this.suscription$.push(
  //     this.wooService.getOrderByStatus('processing', 1, 10).subscribe({
  //       next: (resp: any) => {
  //         if (resp.length === 0 || undefined) {
  //           this.statusData = 'empty';
  //         } else {
  //           this.statusData = 'success';
  //           this.pendingOrders = resp;
  //           console.log(this.pendingOrders);
  //         }
  //       },
  //       error: (errorMessage: any) => {
  //         this.statusData = 'error';
  //       },
  //     })
  //   );
  // }

  ngOnInit(): void {
    // this.getOrders();
  }

  ngOnDestroy(): void {
    this.suscription$.forEach((suscription) => suscription.unsubscribe);
  }
}
