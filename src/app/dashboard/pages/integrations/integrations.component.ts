import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IntegrationData } from './interfaces/integration-data.interface';

@Component({
  selector: 'app-my-integrations',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss',
})
export default class IntegrationsComponent { 

  channelData: IntegrationData[] = [

    {
      id: 1,
      label: 'Mercado Libre',
      img: {
        url: 'assets/img/mely_logo.webp',
        alt: 'mercado libre'
      }
    },

    {
      id: 2,
      label: 'Amazon',
      img: {
        url: 'assets/img/amazon_logo.webp',
        alt: 'Amazon'
      }
    },

    {
      id: 3,
      label: 'ClaroShop',
      img: {
        url: 'assets/img/claroshop_logo.webp',
        alt: 'ClaroShop'
      }
    },

    {
      id: 4,
      label: 'Woocommerce',
      img: {
        url: 'assets/img/woocommerce__logo.png',
        alt: 'Woocommerce'
      }
    },

    {
      id: 4,
      label: 'Walmart',
      img: {
        url: 'assets/img/walmart_logo.png',
        alt: 'Walmart'
      }
    },

    
  ]

}
