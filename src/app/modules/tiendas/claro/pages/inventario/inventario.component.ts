import { Component } from '@angular/core';
import { ClaroshopProductResponse} from '@claro/interfaces/claroshop-productos.interface';
import { ClaroService } from '@claro/services/claroservice.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {


  products: any[] = [];

  constructor(private claroService: ClaroService) { 

    this.claroService.getProducts().subscribe( (data: any) => {

      this.products = data;

      console.log(data);
    }, (error) => {
      console.log(error);
    })


  }
}
