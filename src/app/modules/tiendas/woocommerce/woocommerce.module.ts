import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WoocommerceRoutingModule } from './woocommerce-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InventarioComponent } from '@wcommerce/pages/inventario/inventario.component';
import { FeatureModule } from '@feature/feature.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from '@wcommerce/pages/clientes/clientes.component';
import { WcNewProductComponent } from '@wcommerce/pages/new-product/wc-new-product.component';
import { ProductComponent } from '@wcommerce/pages/product/product.component';

import { KnobModule } from 'primeng/knob';
import { AccordeonComponent } from './components/accordeon/accordeon.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedNgPrimeModule } from '@shared/shared-ng-prime.module';

import { FieldsetModule } from 'primeng/fieldset';

import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';

//ORDENES COMPONENTS
import { WooOrdersComponent } from './pages/woo-orders/woo-orders.component';
import { WooOrdersPendingComponent } from './pages/woo-orders/woo-orders-pending/woo-orders-pending.component';
import { WooOrdersFailedComponent } from './pages/woo-orders/woo-orders-failed/woo-orders-failed.component';
import { WooOrdersCompletedComponent } from './pages/woo-orders/woo-orders-completed/woo-orders-completed.component';

import { KeyInterceptor } from './services/key.interceptor';

import { WcommerceService } from './services/wcommerce.service';
import { OrdersComponent } from './components/orders/orders.component';

import { CardProductComponent } from '@feature/card-product/product-card.component';
import { CardStatsComponent } from '@feature/card-stats/card-stats.component';
import { BreadcrumbComponent } from '@feature/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { SpinnerInterceptor } from '@shared/spinner/spinner.interceptor';
import { CardSearchProductComponent } from '@feature/card-search-product/search-product.component';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    InventarioComponent,
    ClientesComponent,
    WcNewProductComponent,
    ProductComponent,
    AccordeonComponent,
    FilterPipe,
    WooOrdersComponent,
    WooOrdersPendingComponent,
    WooOrdersCompletedComponent,
    WooOrdersFailedComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    WoocommerceRoutingModule,
    SharedNgPrimeModule,
    FeatureModule,
    ReactiveFormsModule,
    FormsModule,
    KnobModule,
    FieldsetModule,
    ProgressBarModule,
    ToastModule,
    BreadcrumbComponent,
    CardStatsComponent,
    CardSearchProductComponent,
    CardProductComponent,
   SpinnerComponent,
   RippleModule
   
  ],
  providers: [
    WcommerceService,
    {
      provide: HTTP_INTERCEPTORS, //Constante para definir que es un tipo de interceptopr
      useClass: KeyInterceptor, //indica cual el interceptor
      multi: true, //Para que este al pendiente de todas peticiones qeu se hagan
    },

    {
      provide: HTTP_INTERCEPTORS, //Constante para definir que es un tipo de interceptopr
      useClass: SpinnerInterceptor, //indica cual el interceptor
      multi: true, //Para que este al pendiente de todas peticiones qeu se hagan
    },

  ],
})
export class WoocommerceModule {}
