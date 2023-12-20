import { Component } from '@angular/core';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';

@Component({
  selector: 'app-woo-orders-pending',
  templateUrl: './woo-orders-pending.component.html',
  styleUrls: ['./woo-orders-pending.component.scss']
})
export class WooOrdersPendingComponent {

  titleError: string | undefined;
  messageError: string | undefined;
  pendingOrders: any[];
  statusData: 'success' | 'error' | 'loading' | 'empty'  | undefined;
  searchTerm: string = "";
  constructor(private wcService: WcommerceService) {
    this.pendingOrders = [];
    this.statusData = 'loading';
  }


  getOrders() {
    this.wcService.getOrderByStatus('pending').subscribe({

      next: (resp : any) => {
      
        if(resp.length === 0 || undefined) {
            this.statusData = 'empty';
        } else {
          this.statusData = 'success';
          this.pendingOrders = resp;

        }
      },
      error: (errorMessage : any) => {
        this.statusData = 'error';
        
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrders();
  }
}
