import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WooOrdersFailedComponent } from './woo-orders-failed.component';

describe('PedidosCanceladosComponent', () => {
  let component: WooOrdersFailedComponent;
  let fixture: ComponentFixture<WooOrdersFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooOrdersFailedComponent]
    });
    fixture = TestBed.createComponent(WooOrdersFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
