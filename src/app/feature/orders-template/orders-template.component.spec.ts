import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTemplateComponent } from './orders-template.component';

describe('PedidosOrderComponent', () => {
  let component: OrdersTemplateComponent;
  let fixture: ComponentFixture<OrdersTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersTemplateComponent]
    });
    fixture = TestBed.createComponent(OrdersTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
