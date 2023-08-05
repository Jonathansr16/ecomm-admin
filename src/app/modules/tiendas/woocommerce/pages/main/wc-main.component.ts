import { Component, OnInit} from '@angular/core';
import { WcommerceService } from '@tiendas/woocommerce/services/wcommerce.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-wc-main',
  templateUrl: './wc-main.component.html',
  styleUrls: ['./wc-main.component.scss']
})
export class WcMainComponent implements OnInit{

 
  items: MenuItem[] | undefined;

  constructor(private wcService: WcommerceService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Productos', icon: 'pi pi-fw pi-database', routerLink: '/dashboard/woocommerce/productos'},
      { label: 'Pedidos', icon: 'pi pi-fw pi-book', routerLink: '/dashboard/woocommerce/pedidos'},
      { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: '/dashboard/woocommerce/clientes'},
 
    ];
  }


  
}
