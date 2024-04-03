import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CardStatComponent } from '@components/card-stat/card-stat.component';
import { CardStatsComponent } from '@components/card-stats/card-stats.component';
import { InputTextModule } from 'primeng/inputtext';
import { homeAyuda } from 'src/app/core/interface/ayuda.model';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { dataStat } from 'src/app/core/interface/stats.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    FormsModule, 
    InputTextModule,
    BreadcrumbComponent, 
    CardStatsComponent,
    CardStatComponent,
    
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  dataAuth: any = {}
  ayuda: homeAyuda[] = [];
  visible: boolean = false;

  breadcrumbHome: BreadcrumbItem = {
    icon: 'space_dashboard',
    label: 'Dashboard',
    separator: true
  }

  breadcrumbItems: BreadcrumbItem[] = [

    {
      icon: 'home',
      label: 'Home',
      separator: false,
      url: '/dashboard/home'
      
    }

  ];

  dataSalesForChannel: dataStat[] = [
    {
      label: 'Mercado Libre',
      title: 'Total de ventas',
      quantity: 100,
      urlImage: '/assets/img/mely_logo.webp'
    },

    {
      label: 'Amazon',
      title: 'Total de Ventas',
      quantity: 200,
      urlImage: '/assets/img/amazon_logo.webp'
    },

    {
      label: 'Claroshop',
      title: 'Total de ventas',
      quantity: 140,
      urlImage: '/assets/img/claroshop_logo.webp'
    }, 
    {
      label: 'Woocommerce',
      title: 'Total de ventas',
      quantity: 100,
      urlImage: '/assets/img/woocommerce_logo.webp'
    }
  ];


  dataOrders: dataStat[] = [
    {
      label: 'Ordenes Pendientes',
      quantity: 34,
      icon: 'inventory_2',
      iconClass: ['material-icons', 'text-orange-700', 'text-lg'],
      backgroundIconClass: 'bg-orange-100',
    },

    {
      label: 'Ordenes en Camino',
      quantity: 102,
      icon: 'conveyor_belt',
      iconClass: ['material-icons', 'text-amber-700', 'text-lg'],
      backgroundIconClass: 'bg-amber-100'
    },

    {
      label: 'Ordenes Concretadas',
      quantity: 3450,
      icon: 'where_to_vote',
      iconClass: ['material-icons', 'text-green-700', 'text-lg'],
      backgroundIconClass: 'bg-green-100'
    },


    {
      label: 'Ordenes no Concretadas',
      quantity: 32,
      icon: 'cancel_presentation',
      iconClass:  ['material-icons', 'text-red-700', 'text-lg'],
      backgroundIconClass: 'bg-red-100'
    }


  ];

  datamyInventory: dataStat[] = [
    {
      label: 'Productos en almacen',
      quantity: 230,
      iconClass: ['pi', 'pi-box', 'text-lg', 'text-green-700'],
      backgroundIconClass: 'bg-green-100'
    },

    {
      label: 'En transito',
      quantity: 35,
      icon: 'conveyor_belt',
      iconClass: ['material-icons', 'text-lg', 'text-orange-700'],
      backgroundIconClass: 'bg-orange-100'
    },

    {
      label: 'Productos inactivos',
      quantity: 40,
      icon: 'checked_bag_question',
      iconClass: ['material-icons', 'text-lg', 'text-amber-700'],
      backgroundIconClass: 'bg-amber-100'

    }, 

   
  ];

  dataTable: any = [
    {
      store: 'mely',
      quantity: 20
    },

    {
      store: 'amazon',
      quantity: 15
    },

    {
      store: 'claroshop',
      quantity: 9
    },

    {
      store: 'woocommerce',
      quantity: 6
    }
  ]
  
  //Charts
  // view: number[] = [700, 500];
  // colorScheme = {
  //   domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  // };

  // configChart: ConfigChartInterface = {
  //   colorSheme: ['#FFFF00', '#FFB74D', '#F44336', '#673AB7 '],
  //   schemeType: 'linear',
  //   legend: true,
  //   result: [
  //     {
  //       "name": "Mercado Libre",
  //       "series": [
  //         {
  //           "name": "2010",
  //           "value": 7300000
  //         }
        
  //       ]
  //     },

  //     {
  //       "name": "USA",
  //       "series": [
  //         {
  //           "name": "2010",
  //           "value": 7870000
  //         },
  //         {
  //           "name": "2011",
  //           "value": 8270000
  //         }
  //       ]
  //     }
  //   ]
  // }
  data: any;

  options: any;
  constructor() {

  
  }

  ngOnInit(): void {
   
  }

  showDialog() {
    this.visible = true;
  }


}


interface ConfigChartInterface {
  view?: number[];
  colorSheme: { [klass: string]: any};
  schemeType: string;
  result: Object;
  legend: boolean;


}