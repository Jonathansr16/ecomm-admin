import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, inject } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from 'src/app/core/interface/breadcrumb.interface';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { MassiveEditorComponent } from '@components/inventory-list/massive-editor/massive-editor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WooProductService } from '@woocommerce/services/woo-product-service.service';

@Component({
  selector: 'app-woo-massive-edition',
  standalone: true,
  imports: [
    CommonModule,
    MassiveEditorComponent,
    BreadcrumbComponent,
    BreadcrumbModule,
  ],
  templateUrl: './woo-massive-editor.component.html',
  styleUrl: './woo-massive-editor.component.scss',
    providers: [WooProductService]
})
export default class WooMassiveEditionComponent { 

  products: ProductInventory[] = [];
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  wooProductService = inject(WooProductService);
  breadcrumHome: BreadcrumbItem = {
    icon: 'list_alt',
    label: 'Editor masivo',
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
      separator: true,
    },

    {
      icon: 'store',
      label: 'Inventario',
      separator: true,
    },

    {
      icon: 'list_alt',
      label: 'Editor masivo',
    },
  ];

  home: MenuItem = { icon: 'pipi-home'}
  items: MenuItem[] = [
    {
      label: 'Dashboard'
    }, 

    {
      label: 'Woocommerce'
    },

    {
      label: 'Inventario'
    },

    {
      label: 'Editor masivo'
    }
  ]

  constructor() {

  }

  ngOnInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation && navigation.extras.state) {
    //   this.products = navigation.extras.state['data'];
    // }
    this.products= this.wooProductService.loadData()

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.wooProductService.deleteData()
  }

}
