import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcPedidosComponent } from './wc-pedidos.component';

describe('PedidosComponent', () => {
  let component: WcPedidosComponent;
  let fixture: ComponentFixture<WcPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WcPedidosComponent]
    });
    fixture = TestBed.createComponent(WcPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
