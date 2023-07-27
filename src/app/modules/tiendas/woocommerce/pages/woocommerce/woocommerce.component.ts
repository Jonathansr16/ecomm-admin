import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-woocommerce',
  templateUrl: './woocommerce.component.html',
  styleUrls: ['./woocommerce.component.scss']
})
export class WoocommerceComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit(): void {
      this.items = [
        { label: 'Pedidos', icon: 'pi pi-fw pi-database'},
        { label: 'Clientes', icon: 'pi pi-fw pi-book'},
        { label: 'Categorias', icon: 'pi pi-fw pi-users'},
        { label: 'Atributos', icon: 'pi pi-fw pi-users'},
        { label: 'Etiquetas', icon: 'pi pi-fw pi-users'},
      ]
  }


}
