import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

  private clientKey: string= 'ck_be927b63ace011a68d5e91a25ddc98bd0390fe2b';
  private clientSecretKey: string= 'cs_e3b3656c26c181a8580d339b5aaab2f1b6e88b1f';

  constructor() { }


  integrarWoocommerce(clientKey: string, clientSecreKey: string) : void {

  }
}
