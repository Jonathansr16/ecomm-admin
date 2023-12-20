import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WooOrdersPendingComponent } from './woo-orders-pending.component';

describe('PedidosPendientesComponent', () => {
  let component: WooOrdersPendingComponent;
  let fixture: ComponentFixture<WooOrdersPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooOrdersPendingComponent]
    });
    fixture = TestBed.createComponent(WooOrdersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
