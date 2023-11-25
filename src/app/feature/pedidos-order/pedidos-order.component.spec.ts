import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosOrderComponent } from './pedidos-order.component';

describe('PedidosOrderComponent', () => {
  let component: PedidosOrderComponent;
  let fixture: ComponentFixture<PedidosOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosOrderComponent]
    });
    fixture = TestBed.createComponent(PedidosOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
